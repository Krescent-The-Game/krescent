# Krescent — vertical slices

GitHub Game Off 2020 · moon buggy endless runner · Nuxt 2 + BabylonJS

| Slice | Status |
|-------|--------|
| Original game at `/` | ✅ Nuxt generate → `public/` |
| Vercel static | ✅ [krescent.vercel.app](https://krescent.vercel.app) |
| `/play` → `/game` rewrite | ✅ old links still launch the run |
| Node 18 generate pipeline | ✅ `scripts/build-play.mjs` + OpenSSL legacy |
| Vite box demo (`play/`) | 🗄️ superseded — do not deploy |
| Eternal Flame landing | 🗄️ dropped — game is the site |

**Play:** [krescent.vercel.app](https://krescent.vercel.app) · **Run:** [/game/](https://krescent.vercel.app/game/)

## Restore (2026-11)

- Landing + empty `extractCSS` made `/play` unplayable (black unstyled menu)
- Original Game Off 2020 Nuxt app is back at site root (`extractCSS: false`)

