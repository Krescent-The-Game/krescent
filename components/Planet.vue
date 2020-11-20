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
    <RockCluster
      v-for="(cluster, index) in clusters"
      :key="index"
      :duration="cluster.duration"
    ></RockCluster>
  </Entity>
</template>

<script>
import { Axis } from "@babylonjs/core";
import { createClusters } from "../utils/Rock.helper";
import RockCluster from "./RockCluster";

export default {
  name: "Planet",
  components: {
    RockCluster,
  },
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
        if (shouldScore) {
          this.rotatePlanetTimer = setInterval(() => {
            requestAnimationFrame(this.rotatePlanet);
          }, 100);
        }
      }
    );
  },
  beforeDestroy() {
    clearInterval(this.rotatePlanetTimer);
  },
  methods: {
    rotatePlanet() {
      if (this.planet) {
        this.planet.rotate(Axis.Y, -0.01);
        this.$store.commit("stats/mutateScore", 0.1);
      }
    },
  },
};
</script>
