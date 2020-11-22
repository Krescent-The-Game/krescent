<template>
  <Entity>
    <Cylinder
      v-model="planet"
      :position="[0, -3.85, -13]"
      :scaling="[6.8, 6.8, 6.8]"
      :rotation="axis"
    >
      <Material>
        <Texture :src="require('assets/moon-texture.png')"> </Texture>
      </Material>
    </Cylinder>
  </Entity>
</template>

<script>
import { Axis } from "@babylonjs/core";
import { createClusters } from "../utils/Rock.helper";

export default {
  name: "Planet",
  components: {},
  data() {
    return {
      planet: null,
      axis: [-Math.PI / 2, 0, 0],
      clusters: createClusters(),
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
      this.planet.rotate(Axis.Y, -0.01);
    },
    scoreCount() {
      if (window.scoreHasStarted) {
        this.$store.commit("stats/mutateScore", 1);
      }
    },
  },
};
</script>
