const MAX_BODY_BYTES = 64 * 1024;
const LIMITS = { name: 120, email: 254, message: 10000 };

function json(status, body, headers = {}) {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', ...headers },
  });
}

// Bound the actual stream, including requests without Content-Length.
async function readJson(request) {
  if (Number(request.headers.get('Content-Length')) > MAX_BODY_BYTES) {
    throw new Error('Body too large');
  }
  const reader = request.body?.getReader();
  if (!reader) throw new Error('Missing body');
  const chunks = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new Error('Body too large');
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
}

async function contact(request, env) {
  if (request.method !== 'POST') {
    return json(405, { error: 'Method not allowed.' }, { Allow: 'POST' });
  }
  const contentType = request.headers.get('Content-Type')?.split(';')[0].trim().toLowerCase();
  if (contentType !== 'application/json') {
    return json(400, { error: 'Content-Type must be application/json.' });
  }
  const origin = request.headers.get('Origin');
  if ((origin && origin !== new URL(request.url).origin) ||
      request.headers.get('Sec-Fetch-Site') === 'cross-site') {
    return json(403, { error: 'Request not allowed.' });
  }

  let fields;
  try {
    const data = await readJson(request);
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error();
    fields = {};
    for (const [key, limit] of Object.entries(LIMITS)) {
      if (typeof data[key] !== 'string') throw new Error();
      fields[key] = data[key].trim();
      if (!fields[key] || fields[key].length > limit) throw new Error();
    }
    if (/[\u0000-\u001f\u007f]/.test(fields.name) ||
        /[\u0000-\u0020\u007f]/.test(fields.email) ||
        !/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(fields.email)) throw new Error();
  } catch {
    return json(400, { error: 'Invalid contact data.' });
  }

  if (!env.RESEND_API_KEY) {
    return json(500, { error: 'Message could not be sent.' });
  }
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(10000),
      body: JSON.stringify({
        from: 'Portfolio Kontaktformular <website@sascha-nyssen.de>',
        to: ['kontakt@sascha-nyssen.de'],
        reply_to: fields.email,
        subject: 'Kontaktanfrage über das Portfolio',
        text: `Name: ${fields.name}\nE-Mail: ${fields.email}\n\nNachricht:\n${fields.message}`,
      }),
    });
    if (!response.ok) throw new Error();
    const result = await response.json();
    if (typeof result?.id !== 'string' || !result.id.trim()) throw new Error();
    return json(200, { success: true });
  } catch {
    return json(502, { error: 'Message could not be sent.' });
  }
}

export default {
  async fetch(request, env) {
    if (new URL(request.url).pathname === '/api/contact') {
      return contact(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};
