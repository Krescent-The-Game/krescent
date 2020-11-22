<template>
  <div class="krs__container krs__logo">
    <h1 class="krs__title">Game Over</h1>
    <h3>Your score is {{ score }}</h3>
    <div class="krs__home_buttons">
      <a-button type="primary" @click="handleRouteToGame">Try again</a-button>
      <a-button>
        <NuxtLink to="/">Exit</NuxtLink>
      </a-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
h3 {
  color: white;
  font-size: 30px;
}
</style>

<script>
export default {
  computed: {
    score() {
      return this.$store.state.stats.score;
    },
  },
  mounted() {
    setTimeout(() => {
      const resetHealth = 100 - this.$store.state.stats.health;
      this.$store.commit("stats/mutateHealth", resetHealth);
    });
  },
  methods: {
    handleRouteToGame() {
      this.$store.commit("planet/mutateShouldScore", false);
      this.$router.push("/game");
    },
  },
  middleware({ store, redirect }) {
    // If the user is healthy
    if (store.state?.stats?.health > 0) {
      return redirect("/game");
    }
  },
};
</script>
