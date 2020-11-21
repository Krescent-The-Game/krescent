export const state = () => ({
  enemyCount: 0,
});

export const mutations = {
  reset(state) {
    state.enemyCount = 0;
  },
  increment(state) {
    state.enemyCount++;
  },
  decrement(state) {
    state.enemyCount--;
  },
};

export const getters = {
  getCount: (state) => {
    return state.enemyCount;
  },
};
