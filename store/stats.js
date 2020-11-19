export const state = () => ({
  health: 100,
  ammo: 20,
  score: 0,
});

export const mutations = {
  mutateHealth(state, number) {
    state.health = state.health + number;
  },
  mutateAmmo(state, number) {
    state.ammo = state.ammo + number;
  },
  mutateScore(state, number) {
    state.score = Math.floor((state.score + number) * 100) / 100;
  },
};
