<template>
  <div class="krs__game_score">
    <div>
      <label
        >Score :
        <span class="krs__game_score--hightlighted">{{ store }}</span></label
      >
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
