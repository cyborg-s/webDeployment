import assert from 'node:assert/strict';
import { test } from 'node:test';
import worker from './index.mjs';

const valid = { name: ' Visitor ', email: ' visitor@example.org ', message: ' Hello ' };
function request(body = JSON.stringify(valid), headers = {}) {
  return new Request('https://portfolio.example/api/contact', {
    method: 'POST', body, headers: { 'Content-Type': 'application/json', ...headers },
  });
}

test('validation and missing secret never call the mail provider', async (t) => {
  t.mock.method(globalThis, 'fetch', () => { throw new Error('Unexpected network request'); });
  const cases = [
    ['invalid media type', request('{}', { 'Content-Type': 'text/plain' }), 400],
    ['broken JSON', request('{'), 400],
    ...[null, [], {}, { ...valid, name: 123 }, { ...valid, name: ' ' },
      { ...valid, email: 'invalid' }, { ...valid, email: 'a\r\n@example.org' },
      { ...valid, message: false }, { ...valid, name: 'a'.repeat(121) },
      { ...valid, email: 'a'.repeat(243) + '@example.org' },
      { ...valid, message: 'a'.repeat(10001) },
    ].map((data) => ['invalid fields', request(JSON.stringify(data)), 400]),
    ['body limit', request(' '.repeat(65537)), 400],
    ['cross origin', request(undefined, { Origin: 'https://other.example' }), 403],
    ['missing secret', request(), 500],
  ];
  for (const [label, req, status] of cases) {
    const response = await worker.fetch(req, {});
    assert.equal(response.status, status, label);
    assert.equal(response.headers.get('Access-Control-Allow-Origin'), null);
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
  }
  assert.equal(globalThis.fetch.mock.callCount(), 0);
});

test('unsupported methods return 405 with Allow: POST', async () => {
  for (const method of ['GET', 'HEAD', 'OPTIONS', 'PUT', 'DELETE', 'PATCH']) {
    const response = await worker.fetch(new Request('https://portfolio.example/api/contact', { method }), {});
    assert.equal(response.status, 405);
    assert.equal(response.headers.get('Allow'), 'POST');
  }
});

test('all non-contact requests are delegated unchanged to ASSETS', async () => {
  for (const path of ['/', '/imprint', '/privacy', '/missing', '/api/contact/']) {
    const req = new Request(`https://portfolio.example${path}`);
    const expected = new Response('asset response', { status: 404 });
    assert.equal(await worker.fetch(req, { ASSETS: { fetch(actual) {
      assert.equal(actual, req);
      return expected;
    } } }), expected);
  }
});

test('Resend payload and provider failures (network fully mocked)', async (t) => {
  // Ephemeral test credential, never persisted or sent to a network.
  const env = { RESEND_API_KEY: crypto.randomUUID() };
  const mock = t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url, 'https://api.resend.com/emails');
    assert.equal(options.method, 'POST');
    assert.equal(options.headers.Authorization, `Bearer ${env.RESEND_API_KEY}`);
    assert.deepEqual(JSON.parse(options.body), {
      from: 'Portfolio Kontaktformular <website@sascha-nyssen.de>',
      to: ['kontakt@sascha-nyssen.de'], reply_to: 'visitor@example.org',
      subject: 'Kontaktanfrage über das Portfolio',
      text: 'Name: Visitor\nE-Mail: visitor@example.org\n\nNachricht:\nHello',
    });
    return Response.json({ id: 'accepted-message' });
  });
  assert.equal((await worker.fetch(request(), env)).status, 200);
  for (const result of [
    () => Response.json({ error: 'private provider details' }, { status: 429 }),
    () => Response.json({}),
    () => new Response('invalid JSON'),
    () => { throw new Error('private network details'); },
  ]) {
    mock.mock.mockImplementation(result);
    const response = await worker.fetch(request(), env);
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), { error: 'Message could not be sent.' });
  }
});
