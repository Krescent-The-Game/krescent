<template>
  <div>
    <div
      v-if="gameIsNotOver"
      class="krs__container krs__container--game krs__full_height"
    >
      <Scene>
        <Property name="clearColor" :color="$color(0, 0, 0, 0.1)"></Property>
        <Camera :target="buggy" type="follow"></Camera>
        <HemisphericLight :direction="[0, 5, -1]">
          <property name="intensity" :float="1"></property>
        </HemisphericLight>
        <DirectionalLight :direction="[0, 100, 10]"></DirectionalLight>
        <Buggy v-model="buggy"></Buggy>
        <Planet></Planet>
      </Scene>
    </div>
    <Stats></Stats>
    <Score></Score>
  </div>
</template>

<script>
import Vue from "vue";
import Planet from "~/components/Planet.vue";
import Buggy from "~/components/Buggy.vue";
import Stats from "~/components/Stats.vue";
import Score from "~/components/Score.vue";

export default Vue.extend({
  components: {
    Planet,
    Buggy,
    Stats,
    Score,
  },
  data() {
    return {
      buggy: null,
    };
  },
  computed: {
    gameIsNotOver() {
      return this.$store.state.stats.health > 0;
    },
  },
  mounted() {
    const resetScore = -this.$store.state.stats.score;
    this.$store.commit("stats/mutateScore", resetScore);
  },
  middleware({ store, redirect }) {
    // If the user is healthy
    if (store.state?.stats?.health <= 0) {
      return redirect("/game");
    }
  },
});
</script>

<style lang="less">
.krs__container--game {
  background: url("~assets/game-background.png");
  background-color: black;
  background-size: cover;
}

.krs__full_height {
  * {
    height: 100%;
  }
}

.krs__card--game {
  height: 100%;
  min-height: 95vh;
  width: 100%;
  padding: 10px;
  background: transparent;

  div.ant-card-body {
    min-height: 95vh;
    padding: 0px;
    height: 100%;
  }
}
</style>
