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

<script lang="ts">
import { Axis } from "@babylonjs/core";

export default {
  name: "Planet",
  data() {
    return {
      planet: null,
      axis: [-Math.PI / 2, 0, 0],
    };
  },
  mounted() {
    setInterval(() => {
      requestAnimationFrame(this.rotatePlanet);
    }, 1000);
  },
  methods: {
    rotatePlanet() {
      if (this.planet) {
        this.planet.rotate(Axis.Y, -0.2);
      }
    },
  },
};
</script>
