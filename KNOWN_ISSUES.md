# Known Issues

> Krescent · original Game Off 2020 restore

---

## Open

| Issue | Severity | Notes |
|-------|----------|-------|
| Large bundle (~5MB) | Low | Original vue-babylonjs + Ant Design in JS |
| Fullscreen may fail without gesture | Low | try/catch; original behavior |
| Desktop-first controls | Info | No touch controls in original |
| Node 18 required for generate | Medium | Documented; OpenSSL legacy provider |
| 194 npm audit vulns in legacy/nuxt | Low | Game Off 2020 deps; defer upgrade |

---

## Resolved

| Issue | Fix |
|-------|-----|
| Eternal Flame landing hid the game | Landing dropped; original Nuxt at `/` |
| Unstyled `/play` (empty extractCSS) | `extractCSS: false`; styles inject from JS |
| Webpack 4 vs OpenSSL 3 | `NODE_OPTIONS=--openssl-legacy-provider` |
| `/play` 404 / wrong Vite demo | Original generate at site root; `/play` rewrites to `/game` |

---

## Won't fix (preserve original)

- Ant Design Vue 1.x styling
- 5-second loading screen delay
- requestFullscreen on game start
- BabylonJS 4 (not upgrading to 7 in game code)

---

## Report issues

https://github.com/Krescent-The-Game/krescent/issues
