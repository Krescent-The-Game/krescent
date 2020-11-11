<template>
  <Entity v-model="buggy" :position="position"> </Entity>
</template>
<script lang="ts">
import Vue from "vue";
import { createBuggy } from "../utils/Buggy.helper";

export default Vue.extend({
  name: "Buggy",
  data() {
    return {
      position: [-0.2, -0.1, -8.5],
      buggy: null,
    };
  },
  watch: {
    buggy: createBuggy,
  },
  mounted() {
    addEventListener("keydown", this.handleMouseDown);
  },
  methods: {
    handleMouseDown(e) {
      if (e.key === "ArrowUp") {
        if (this.buggy.position.y <= 0.2) {
          requestAnimationFrame(() => {
            this.buggy.position.y += 0.1;
          });
        }
      }
      if (e.key === "ArrowDown") {
        if (this.buggy.position.y >= -0.2) {
          requestAnimationFrame(() => {
            this.buggy.position.y -= 0.1;
          });
        }
      }
    },
  },
});
</script>
