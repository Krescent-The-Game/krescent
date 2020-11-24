<template>
  <div class="krs__game_score">
    <div>
      <label
        >Score :
        <span class="krs__game_score--hightlighted">{{ store }}</span></label
      >
    </div>
    <div>
      <a-button @click="handleExit">Exit</a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Score",
  data() {
    return {};
  },
  computed: {
    store() {
      return this.$store.state.stats.score;
    },
  },
  mounted() {
    this.$store.watch(
      () => this.$store.state.stats.score,
      (score) => {
        this.$store.commit("enemy/setLimit", Math.floor(score / 30));
        if (score < 100) {
          this.$store.commit("enemy/setSpeed", 2);
        } else if (score > 200 && score < 300) {
          this.$store.commit("enemy/setSpeed", Math.floor(score / 50));
        } else if (score < 400) {
          this.$store.commit("enemy/setSpeed", Math.floor(score / 70));
        } else if (score < 500) {
          this.$store.commit("enemy/setSpeed", Math.floor(score / 90));
        } else if (score < 600) {
          this.$store.commit("enemy/setSpeed", Math.floor(score / 110));
        } else if (score < 800) {
          this.$store.commit("enemy/setSpeed", Math.floor(score / 130));
        }
      }
    );
  },
  methods: {
    handleExit() {
      this.$store.commit("planet/mutateShouldScore", false);
      this.$router.push("/");
    },
  },
};
</script>

<style lang="less">
.krs__game_score {
  z-index: 1;
  position: absolute;
  top: 0px;
  left: 0px;
  height: unset;

  label {
    color: white;
    font-size: 25px;
  }

  &--hightlighted {
    font-size: 30px !important;
    color: var(--primary);
  }
}
</style>
