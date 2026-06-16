<template>
  <Entity>
    <Animation property="position.x" :start="10" :end="-60" :duration="8">
    </Animation>
    <Rock
      v-for="(rock, index) in rocks"
      :key="index"
      :position="rock.position"
      :scaling="rock.scaling"
      :rotation="rock.rotation"
    ></Rock>
  </Entity>
</template>

<script>
import { createRandomRocks } from "../utils/Rock.helper";
import Rock from "./Rock";

export default {
  components: {
    Rock,
  },
  props: {
    duration: {
      type: [Number],
      default: () => 5,
    },
  },
  data() {
    return {
      rocks: createRandomRocks(),
    };
  },
};
</script>
