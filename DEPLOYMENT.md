# Deployment

> Krescent on Vercel — original game at site root

---

## Production

| | |
|---|---|
| **URL** | https://krescent.vercel.app |
| **Play** | https://krescent.vercel.app/game/ |
| **Platform** | Vercel static |
| **Node** | 18.x (local generate only) |

---

## Build locally

```bash
# Requires Node 18 (nvm use 18)
npm run build:play
# Output: public/
```

Preview:

```bash
npx serve public -l 3456
# → http://localhost:3456/
```

---

## Dev (original Nuxt)

```bash
cd legacy/nuxt
nvm use 18
npm install --legacy-peer-deps
npm run dev
# → http://localhost:3000/game
```

---

## Vercel settings

| Setting | Value |
|---------|-------|
| Build command | (noop — serve committed `public/`) |
| Output directory | `public` |
| Node version | 24.x (static only) |

Generate is run locally with Node 18 + `NODE_OPTIONS=--openssl-legacy-provider` because webpack 4 cannot hash on modern OpenSSL.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `digital envelope routines::unsupported` | `NODE_OPTIONS=--openssl-legacy-provider` (already in `scripts/build-play.mjs`) |
| Black unstyled menu | Rebuild with `extractCSS: false` so Ant Design + layout CSS inject |
| 404 on assets | Game is at `/` and `/game/`, not `/play/` |
