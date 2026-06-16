# Krescent 🌙

**Moonshot endless runner** — GitHub Game Off 2020. Drive a moon buggy, dodge meteorites, shoot enemies, collect crystals, beat your score.

| | |
|---|---|
| **Play** | https://krescent.vercel.app/play/ |
| **Landing** | https://krescent.vercel.app |
| **Docs** | [/docs](https://krescent.vercel.app/docs) |
| **Repo** | [Krescent-The-Game/krescent](https://github.com/Krescent-The-Game/krescent) |

By **Kevin Moe Myint Myat** (m3yevn) and **Nelson Lee** (kaichie).

## Play

**Browser:** [krescent.vercel.app/play](https://krescent.vercel.app/play/) — original Nuxt 2 + BabylonJS 4 game.

**Local dev:**

```bash
cd legacy/nuxt
nvm use 18
npm install --legacy-peer-deps
npm run dev
# → http://localhost:3000/game
```

## Build for Vercel

```bash
npm run build:play   # Node 18 required
```

Output: `public/play/` (static Nuxt generate with `router.base: /play/`).

## Stack

- Nuxt 2 SPA · vue-babylonjs · BabylonJS 4 · Ant Design Vue · Vuex

## Documentation

| Doc | Purpose |
|-----|---------|
| [GAMEPLAY.md](GAMEPLAY.md) | Controls & mechanics |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Code structure |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Vercel pipeline |
| [KNOWN_ISSUES.md](KNOWN_ISSUES.md) | Open issues |

Ecosystem audits: `KRESCENT_*.md` at monorepo root.

## Restoration (2026)

The Eternal Flame rebirth accidentally removed browser play (`c15124f`) and shipped a simplified Vite demo (`4acafc8`) that was not the original game. Restoration rebuilds `legacy/nuxt` to `public/play/` without changing gameplay.

## License

MIT
