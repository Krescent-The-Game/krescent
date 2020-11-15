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
  mounted() {
    addEventListener("keydown", this.handleMouseDown);
  },
  methods: {
    handleJumpUp() {
      requestAnimationFrame(() => {
        if (this.buggy.position.y < 0.1) {
          this.buggy.position.y += 0.2;
        } else {
          clearInterval(this.upTimer);
          this.downTimer = setInterval(this.handleJumpDown, 100);
        }
      });
    },
    handleJumpDown() {
      requestAnimationFrame(() => {
        if (this.buggy.position.y > -0.39) {
          this.buggy.position.y -= 0.2;
        } else {
          this.isJumping = false;
          clearInterval(this.downTimer);
        }
      });
    },
    handleMouseDown(e) {
      if (e.code === "Space") {
        if (this.isJumping) {
          return;
        }
        this.isJumping = true;
        this.handleJumpUp();
        this.upTimer = setInterval(this.handleJumpUp, 100);
      }
      if (e.key === "ArrowRight") {
        if (this.buggy.position.x <= 0.2) {
          requestAnimationFrame(() => {
            this.buggy.position.x += 0.1;
          });
        }
      }
      if (e.key === "ArrowLeft") {
        if (this.buggy.position.x >= -0.2) {
          requestAnimationFrame(() => {
            this.buggy.position.x -= 0.1;
          });
        }
      }
      if (e.key === "ArrowUp") {
        if (this.buggy.position.z <= -6.5 + 0.5) {
          requestAnimationFrame(() => {
            this.buggy.position.z += 0.1;
          });
        }
      }
      if (e.key === "ArrowDown") {
        if (this.buggy.position.z >= -6.5 - 0.5) {
          requestAnimationFrame(() => {
            this.buggy.position.z -= 0.1;
          });
        }
      }
    },
  },
});
</script>
