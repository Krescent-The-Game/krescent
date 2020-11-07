<template>
  <div class="krs__container krs__container--game krs__full_height">
    <Scene>
      <Property name="clearColor" :color="$color(0, 0, 0, 0.1)"></Property>
      <Camera :target="[0, 1, 3]" type="follow"></Camera>
      <HemisphericLight></HemisphericLight>
      <Planet></Planet>
    </Scene>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Planet from "../components/Planet.vue";
// import Buggy from "../components/Buggy.vue";

export default Vue.extend({
  components: {
    Planet,
    // Buggy,
  },
  data() {
    return {};
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
