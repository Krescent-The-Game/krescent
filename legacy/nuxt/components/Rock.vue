<template>
  <Entity
    v-model="rock"
    :scaling="scaling"
    :position="position"
    :rotation="rotation"
  >
    <Animation property="position.y" :start="4" :end="-4" :duration="20">
    </Animation
  ></Entity>
</template>

<script>
import { createRock } from "../utils/Rock.helper";

export default {
  props: {
    scaling: { type: [Array], default: () => [] },
    position: { type: [Array], default: () => [] },
    rotation: { type: [Array], default: () => [] },
  },
  data() {
    return {
      rock: null,
    };
  },
  watch: {
    rock: createRock,
  },
};
</script>
