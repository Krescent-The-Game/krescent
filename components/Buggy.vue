<template>
  <Entity v-model="buggy" :position="position">
    <Box :scaling="[0.1, 0.05, 0.05]"></Box>
  </Entity>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Buggy",
  data() {
    return {
      position: [-0.2, -0.1, -8.5],
      buggy: null,
    };
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
