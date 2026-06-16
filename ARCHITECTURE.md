# Architecture

> Krescent technical overview

---

## Stack

| Layer | Technology |
|-------|------------|
| Framework | Nuxt 2 (SPA, `ssr: false`) |
| 3D | vue-babylonjs 1.0.0-beta.7 |
| Engine | BabylonJS 4.1 |
| UI | Ant Design Vue 1.6 |
| State | Vuex (`stats`, `enemy`, `powerUp`, `planet`) |
| Build | Webpack 4 via Nuxt |
| Deploy | Static generate → Vercel |

---

## Directory layout

```
krescent/
├── public/           # Vercel output root
│   ├── index.html    # Eternal Flame landing
│   └── play/         # Nuxt generate output (game)
├── legacy/nuxt/      # Original game source
│   ├── pages/game/   # Game + game over routes
│   ├── components/   # Buggy, Enemy, Planet, PowerUp, etc.
│   ├── store/        # Vuex modules
│   ├── utils/        # Babylon helpers
│   └── static/       # GLTF assets
├── scripts/
│   └── build-play.mjs
└── play/             # Archived Vite demo (not deployed)
```

---

## Scene graph

```
Scene (vue-babylonjs)
├── Camera (follow buggy)
├── HemisphericLight + DirectionalLight
├── Buggy (GLTF via Buggy.helper)
├── Planet (moon terrain)
├── Enemy (meteorites)
└── PowerUp (crystals)
```

---

## Vuex modules

| Module | Responsibility |
|--------|----------------|
| `stats` | Health, score, ammo |
| `enemy` | Meteorite spawn/count |
| `powerUp` | Crystal spawn/count |
| `planet` | `shouldScore` gate (ends loading screen) |

---

## Routing

| Route | Page |
|-------|------|
| `/play/` | Nuxt index (legacy home) |
| `/play/game/` | Main game |
| `/play/game/over` | Game over |

Vercel rewrites `/play` → `/play/game/index.html`.

---

## Build

`router.base: '/play/'` ensures all asset URLs resolve under `/play/`.

See `DEPLOYMENT.md` for Vercel pipeline.
