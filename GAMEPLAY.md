# Gameplay

> Krescent — GitHub Game Off 2020

---

## Objective

Drive a moon buggy across an endless lunar surface. Dodge red meteorites, collect green crystals to heal, shoot enemies, and survive as long as possible while your score increases.

---

## Controls

| Input | Action |
|-------|--------|
| Arrow keys / WASD | Drive buggy |
| Space | Shoot (uses ammo) |
| Jump | Key binding in `Buggy.vue` movement loop |

---

## HUD

- **Health** — starts at 100%; red meteorites deal damage
- **Ammo** — 20 rounds; shooting depletes ammo
- **Score** — increases over time and from actions

---

## Entities

| Entity | Color | Effect |
|--------|-------|--------|
| Meteorites | Red | Damage on collision |
| Crystals | Green | Heal on pickup |
| Buggy | GLTF model | Player vehicle |

---

## Game flow

1. Loading screen (~5 seconds) with hints
2. Fullscreen (when browser allows)
3. Endless run on procedural moon terrain
4. Health reaches 0 → game over page (`/game/over`)

---

## Tips

- Prioritize dodging red meteorites
- Collect green crystals when health is low
- Conserve ammo for clustered enemies

---

## Source

- Game page: `legacy/nuxt/pages/game/index.vue`
- Buggy logic: `legacy/nuxt/components/Buggy.vue`
- Helpers: `legacy/nuxt/utils/Buggy.helper.js`, `Bullet.helper.js`, `Rock.helper.js`
