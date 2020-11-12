<template>
  <Entity v-model="buggy" :position="position" :scaling="[0.1, 0.1, 0.1]">
  </Entity>
</template>
<script lang="ts">
import Vue from "vue";
import { createBuggy } from "../utils/Buggy.helper";

export default Vue.extend({
  name: "Buggy",
  data() {
    return {
      position: [-0.2, -0.4, -6.5],
      buggy: null,
    };
  },
  watch: {
    buggy: createBuggy,
  },
});
</script>
