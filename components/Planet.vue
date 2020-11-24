<template>
  <Entity>
    <Cylinder
      v-model="planet"
      :position="[0, -3.85, -12.5]"
      :scaling="[6.8, 6.8, 6.8]"
      :rotation="axis"
      :options="options"
    >
      <Material diffuse="#808080" :roughness="5.0" :metallic="0">
        <Texture :src="require('~/assets/moon-texture.png')"></Texture>
      </Material>
    </Cylinder>
  </Entity>
</template>

<script>
import * as BABYLON from "@babylonjs/core";

export default {
  name: "Planet",
  components: {},
  data() {
    return {
      planet: null,
      rotatePlanetTimer: null,
      axis: [-Math.PI / 2, 0, 0],
      options: {
        height: 2,
        tessellation: 20,
        faceUV: [],
      },
    };
  },
  mounted() {
    this.$store.watch(
      () => this.$store.state.planet.shouldScore,
      (shouldScore) => {
        if (shouldScore && !window.scoreHasStarted) {
          window.scoreHasStarted = true;
          window.rotatePlanetTimer = setInterval(() => {
            this.scoreCount();
          }, 100);
        }
        if (shouldScore) {
          this.rotatePlanetTimer = setInterval(() => {
            this.rotatePlanet();
          }, 100);
        }
      }
    );
  },
  beforeDestroy() {
    clearInterval(window.rotatePlanetTimer);
    clearInterval(this.rotatePlanetTimer);
    window.scoreHasStarted = false;
  },
  methods: {
    rotatePlanet() {
      const speed = -this.$store.state.stats.score / 10000;
      this.planet.rotate(BABYLON.Axis.Y, speed < -0.04 ? -0.04 : speed);
    },
    scoreCount() {
      if (window.scoreHasStarted) {
        this.$store.commit("stats/mutateScore", 1);
      }
    },
  },
};
</script>
