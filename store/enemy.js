export const state = () => ({
  enemyCount: 0,
  enemyLimit: 1,
});

export const mutations = {
  reset(state) {
    state.enemyCount = 0;
    state.enemyLimit = 1;
  },
  incrementCount(state) {
    state.enemyCount++;
  },
  incrementLimit(state) {
    state.enemyLimit++;
  },
  decrementCount(state) {
    state.enemyCount--;
  },
  decrementLimit(state) {
    state.enemyLimit--;
  },
  setLimit(state, number) {
    state.enemyLimit = number;
  },
};

export const getters = {
  getCount: (state) => {
    return state.enemyCount;
  },
  getLimit: (state) => {
    return state.enemyLimit;
  },
};
