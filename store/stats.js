export const state = () => ({
  health: 100,
  ammo: 20,
});

export const mutations = {
  mutateHealth(state, number) {
    state.health = state.health + number;
  },
  mutateAmmo(state, number) {
    state.ammo = state.ammo + number;
  },
};
