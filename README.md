# Portfolio und Join

Dieses Repository enthält die beiden Webprojekte von Sascha Nyßen. Beide Anwendungen werden über Cloudflare Workers mit Static Assets ausgeliefert. Die GitHub-Actions-Pipeline prüft Änderungen, führt aber keine produktiven Deployments aus.

## Projektstruktur

```text
.
├── .github/workflows/deploy.yml       # CI-Prüfungen für beide Projekte
├── portfolio/public/                  # Angular-Portfolio und Kontakt-Worker
│   ├── src/                           # Angular-Anwendung
│   ├── worker/                        # Cloudflare Worker für /api/contact
│   └── wrangler.jsonc                 # Cloudflare-Konfiguration des Portfolios
└── join/                              # Join-Demo
    ├── public/                        # direkt auslieferbare HTML-, CSS-, JS- und Asset-Dateien
    └── wrangler.jsonc                 # Cloudflare-Konfiguration von Join
```

Jedes Projekt besitzt ein eigenes `package.json` und `package-lock.json`. npm-Befehle werden deshalb immer im jeweiligen Projektverzeichnis ausgeführt.

## Voraussetzungen

- Node.js 22 oder neuer (die CI verwendet Node.js 22)
- npm
- Für Cloudflare-Kommandos: die projektlokal installierte Wrangler-Version aus `package-lock.json`

## Portfolio

Das Portfolio ist eine Angular-17-Anwendung. Angular SSR und Prerendering sind für den Build konfiguriert; die erzeugten Browser-Assets werden von Cloudflare ausgeliefert.

Die Cloudflare-Konfiguration befindet sich in `portfolio/public/wrangler.jsonc`. Das Projekt heißt dort `portfolio-test`, liefert Assets aus `dist/portfolio/browser` aus und bedient zusätzlich `POST /api/contact` über `worker/index.mjs`. Die konfigurierten Custom Domains sind `sascha-nyssen.de` und `www.sascha-nyssen.de`.

### Installation und lokale Entwicklung

```powershell
cd portfolio/public
npm ci
npm start
```

`npm start` führt den Angular-Entwicklungsserver aus.

### Tests, Build und Cloudflare-Prüfung

```powershell
cd portfolio/public
npm ci
node --test worker/index.test.mjs
npm run build
npx --no-install wrangler deploy --dry-run
```

`npm run build` erstellt den Produktionsbuild einschließlich der konfigurierten Prerender-Ausgabe. Der Dry-Run prüft anschließend Worker- und Assets-Konfiguration, ohne ein Deployment auszuführen.

## Join

Join ist ein eingefrorenes Demo-Projekt mit direkt auslieferbaren statischen Dateien in `join/public`. Es gibt keinen Build-Schritt für die Anwendung.

Die Cloudflare-Konfiguration in `join/wrangler.jsonc` verwendet das Projekt `join-frontend`, liefert `./public` als Static Assets aus und enthält die Custom Domain `join.sascha-nyssen.de`. Join greift direkt aus dem Browser per Firebase Realtime Database REST-Endpunkten auf sein bestehendes Firebase-Backend zu.

### Installation und Cloudflare-Prüfung

```powershell
cd join
npm ci
npx --no-install wrangler deploy --dry-run
```

Der Dry-Run validiert die Static-Assets-Konfiguration und führt kein Deployment aus.

## Deployment und CI

Die produktiven Domains sind in den jeweiligen `wrangler.jsonc`-Dateien konfiguriert. Deployment-Kommandos werden bewusst nicht durch GitHub Actions ausgeführt.

`.github/workflows/deploy.yml` läuft bei Pushes auf `main` und Pull Requests gegen `main`. Sie installiert reproduzierbar die Abhängigkeiten, führt die Portfolio-Worker-Tests aus, erstellt den Portfolio-Build und validiert beide Cloudflare-Konfigurationen ausschließlich mit `wrangler deploy --dry-run`.

## Externe Dienste und Secrets

- **Cloudflare Workers und Static Assets:** Hosting für Portfolio und Join sowie der Kontakt-Worker des Portfolios.
- **Resend:** Versand von Portfolio-Kontaktanfragen. Der Kontakt-Worker benötigt das Cloudflare-Worker-Secret `RESEND_API_KEY`.
- **Firebase Realtime Database:** Bestehendes Backend für Join; die Join-Anwendung verwendet die im Browsercode vorhandenen REST-Endpunkte.

Secrets gehören nie ins Repository. Lokale Umgebungsdateien wie `.env`, `.env.*`, `.dev.vars` und `.dev.vars.*` sind ignoriert. Beispiel-Dateien mit den Endungen `.example` bleiben versionierbar. Secret-Werte dürfen weder in Dokumentation noch in Commits oder Logs aufgenommen werden.
