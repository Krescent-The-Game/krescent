<template>
  <div>
    <div v-if="isLoading" class="krs__container krs__logo krs__loading_screen">
      <h2 class="krs__title">Game is loading...</h2>
      <a-progress
        class="krs__loader"
        :stroke-color="loadingColor"
        :percent="loadingProgress"
        :show-info="true"
      />
      <label class="krs__hint"
        >Avoid <span class="krs__red_text">RED</span> meteorites.<br />
        Eat <span class="krs__green_text">GREEN</span> crystals to heal.</label
      >
    </div>
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
          <Enemy></Enemy>
        </Scene>
      </div>
      <Stats></Stats>
      <Score></Score>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Planet from "~/components/Planet.vue";
import Buggy from "~/components/Buggy.vue";
import Enemy from "~/components/Enemy.vue";
import Stats from "~/components/Stats.vue";
import Score from "~/components/Score.vue";

export default Vue.extend({
  components: {
    Planet,
    Buggy,
    Enemy,
    Stats,
    Score,
  },
  data() {
    return {
      buggy: null,
      loadingColor: {
        "0%": "var(--info)",
        "100%": "var(--success)",
      },
      loadingProgress: 0,
    };
  },
  computed: {
    gameIsNotOver() {
      return this.$store.state.stats.health > 0;
    },
    isLoading() {
      return !this.$store.state.planet.shouldScore;
    },
  },
  mounted() {
    this.$store.commit("stats/resetHealth");
    this.$store.commit("stats/resetScore");
    this.$store.commit("stats/resetAmmo");

    this.loadingProgressTimer = setInterval(() => {
      this.loadingProgress += 20;
    }, 1000);

    setTimeout(() => {
      clearInterval(this.loadingProgressTimer);
      this.$store.commit("planet/mutateShouldScore", true);
    }, 5000);
  },
  beforeDestroy() {
    clearInterval(this.loadingProgressTimer);
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
.krs__hint {
  color: white;
  margin-top: 100px;

  span.krs__red_text {
    color: rgb(255, 0, 0);
  }
  span.krs__green_text {
    color: rgb(35, 224, 107);
  }
}

.krs__loading_screen {
  position: absolute;
  z-index: 2;
  height: 100vh;
  width: 100vw;
}

.krs__container--game {
  background: url("~assets/game-background.png");
  background-color: black;
  background-size: cover;
}

.krs__loader {
  width: 50%;
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
