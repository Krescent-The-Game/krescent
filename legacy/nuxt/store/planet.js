export const state = () => ({
  shouldScore: false,
});

export const mutations = {
  mutateShouldScore(state, bool) {
    state.shouldScore = bool;
  },
};
