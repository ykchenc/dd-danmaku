# AGENTS.md

## Cursor Cloud specific instructions

This is **dd-danmaku** (emby-danmaku), a client-side JavaScript userscript plugin that adds danmaku (bullet comments) overlay to Emby media server video playback. It is NOT a web application with a dev server — it's a browser-injected script.

### Key services

| Service | Description |
|---|---|
| `ede.js` | Main userscript (~5000 lines), injected into Emby's web UI |
| `cf_worker.js` | Cloudflare Worker CORS proxy for DanDanPlay API |
| `dist/ede.android*.js` | Babel-transpiled builds for older Android WebViews |

### Lint

- Prettier is the only linter: `npx prettier --check "*.js"`
- Pre-existing formatting issues exist in `ede.js` and `cf_worker.js`; the pre-commit config uses Prettier via `.pre-commit-config.yaml`

### Build

- `npm run build:android9` — transpile for Android 9+ (Chrome 73)
- `npm run build:android7` — transpile for Android 7+
- CI also uses Terser for minification: `npx terser ede.js -o public/ede.min.js --no-comments --compress --mangle`

### Tests

- No automated test suite exists (`npm test` exits with error by design)
- Validation is done by building successfully and checking Prettier formatting

### Important notes

- No dev server to run — this is a browser userscript, not a standalone web app
- End-to-end testing requires a running Emby Media Server instance with the script injected
- The `cf_worker.js` requires `APP_ID` and `APP_SECRET` environment variables for DanDanPlay API authentication
