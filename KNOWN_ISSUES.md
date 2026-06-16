# Known Issues

> Krescent · post-restoration

---

## Open

| Issue | Severity | Notes |
|-------|----------|-------|
| Production not yet redeployed | High | Push required for live fix |
| Large bundle (~5MB) | Low | Original size; lazy-load future |
| Fullscreen may fail without gesture | Low | try/catch added; original behavior |
| Desktop-first controls | Info | No touch controls in original |
| Node 18 required for build | Medium | Documented; Vercel engines set |
| 189 npm audit vulns in legacy/nuxt | Low | Game Off 2020 deps; defer upgrade |

---

## Resolved (restoration lap)

| Issue | Fix |
|-------|-----|
| Game not on Vercel | Nuxt generate → `public/play/` |
| Wrong Vite demo at `/play/` | `build:play` uses legacy Nuxt |
| `legacy/` excluded from Vercel | Updated `.vercelignore` |
| `/play/` not launching game | Rewrite to `/play/game/` |
| Nuxt crash on Node 22 | `build-play.mjs` forces Node 18 |

---

## Won't fix (preserve original)

- Ant Design Vue 1.x styling
- 5-second loading screen delay
- requestFullscreen on game start
- BabylonJS 4 (not upgrading to 7 in game code)

---

## Report issues

https://github.com/Krescent-The-Game/krescent/issues
