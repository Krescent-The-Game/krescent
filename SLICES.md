# Krescent — vertical slices

GitHub Game Off 2020 · moon buggy endless runner · Nuxt 2 + BabylonJS

| Slice | Status |
|-------|--------|
| Eternal Flame landing + `/docs` + SEO | ✅ |
| Vercel static landing | ✅ [krescent.vercel.app](https://krescent.vercel.app) |
| **Original game at `/play/`** | ✅ restored locally · deploy pending |
| Nuxt generate → `public/play/` | ✅ `npm run build:play` |
| Node 18 build pipeline | ✅ `scripts/build-play.mjs` |
| Vite box demo (`play/`) | 🗄️ superseded — do not deploy |
| Playability audits + test plan | ✅ `KRESCENT_*.md` |

**Play:** [/play/](https://krescent.vercel.app/play/) · **Live:** [krescent.vercel.app](https://krescent.vercel.app)

## Restoration lap (2026-06)

- Root cause: `c15124f` removed game from Vercel; `4acafc8` shipped wrong Vite demo
- Fix: rebuild `legacy/nuxt` with `router.base: /play/`
- Verified: GLTF buggy, moon terrain, HUD, score loop on local serve
