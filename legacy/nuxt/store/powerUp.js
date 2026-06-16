export const state = () => ({
  healthPowerUpCount: 0,
  healthPowerUpLimit: 3,
  healthPowerUpSpeed: 0.5,
  healthPowerUpChance: 0,
});

export const mutations = {
  reset(state) {
    state.healthPowerUpCount = 0;
    state.healthPowerUpLimit = 3;
    state.healthPowerUpSpeed = 0.5;
    state.healthPowerUpChance = 0;
  },
  incrementHealthCount(state) {
    if (state.healthPowerUpCount < 10) {
      state.healthPowerUpCount++;
    }
  },
  incrementHealthLimit(state) {
    state.healthPowerUpLimit++;
  },
  decrementHealthCount(state) {
    state.healthPowerUpCount--;
  },
  decrementHealthLimit(state) {
    state.healthPowerUpLimit--;
  },
  setHealthLimit(state, number) {
    state.healthPowerUpLimit = number;
  },
  setHealthSpeed(state, number) {
    state.healthPowerUpSpeed = number;
  },
  setHealthChance(state, number) {
    state.healthPowerUpChance = number;
  },
};

export const getters = {
  getHealthCount: (state) => {
    return state.healthPowerUpCount;
  },
  getHealthLimit: (state) => {
    return state.healthPowerUpLimit;
  },
  getHealthSpeed: (state) => {
    return state.healthPowerUpSpeed;
  },
  getHealthChance: (state) => {
    return state.healthPowerUpChance;
  },
};
