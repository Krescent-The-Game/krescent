# Deployment

> Krescent on Vercel

---

## Production

| | |
|---|---|
| **URL** | https://krescent.vercel.app |
| **Play** | https://krescent.vercel.app/play/ |
| **Platform** | Vercel static |
| **Node** | 18.x (build only) |

---

## Build locally

```bash
# Requires Node 18 (nvm use 18)
npm run build:play
# Output: public/play/
```

Preview:

```bash
npx serve public -l 3456
# → http://localhost:3456/play/game/
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
| Build command | `npm run build:play` |
| Output directory | `public` |
| Node version | 18.x |

---

## Files

- `vercel.json` — build + `/play` rewrite
- `.vercelignore` — excludes `node_modules`, not `legacy/nuxt`
- `scripts/build-play.mjs` — Node 18 orchestration

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Build fails on Node 22 | Use Node 18 |
| `legacy/` missing on Vercel | Check `.vercelignore` |
| 404 on assets | Verify `router.base: '/play/'` |
| Wrong game (boxes) | Ensure Vite demo not in `build:play` |
