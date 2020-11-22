<template>
  <Entity
    v-model="buggy"
    :position="position"
    :scaling="scaling"
    :rotation="rotation"
  >
  </Entity>
</template>
<script>
import Vue from "vue";
import { createBuggy } from "../utils/Buggy.helper";
import { createBullets } from "../utils/Bullet.helper";

export default Vue.extend({
  name: "Buggy",
  data() {
    return {
      position: [-0.2, -0.4, -7.5],
      scaling: [0.01, 0.01, 0.01],
      rotation: [-Math.PI / 2, -Math.PI / 2, 0],
      buggy: null,
    };
  },
  watch: {
    buggy: "handleCreateBuggy",
  },
  mounted() {
    addEventListener("keydown", this.handleMouseDown);
  },
  beforeDestroy() {
    removeEventListener("keydown", this.handleMouseDown);
  },
  methods: {
    handleCreateBuggy(e) {
      createBuggy(this.handleIntersect)(e);
    },
    handleIntersect() {
      this.$store.commit("enemy/decrementCount");
      this.$store.commit("stats/mutateHealth", -10);
    },
    handleIntersectWithBullet() {
      this.$store.commit("enemy/decrementCount");
    },
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
      if (e.key === "ArrowRight" || e.key === "d") {
        if (this.buggy.position.x <= 0.2) {
          requestAnimationFrame(() => {
            this.buggy.position.x += 0.1;
          });
        }
      }
      if (e.key === "ArrowLeft" || e.key === "a") {
        if (this.buggy.position.x >= -0.2) {
          requestAnimationFrame(() => {
            this.buggy.position.x -= 0.1;
          });
        }
      }
      if (e.key === "ArrowUp" || e.key === "w") {
        if (this.buggy.position.z <= -7) {
          requestAnimationFrame(() => {
            this.buggy.position.z += 0.1;
          });
        }
      }
      if (e.key === "ArrowDown" || e.key === "s") {
        if (this.buggy.position.z >= -8.5) {
          requestAnimationFrame(() => {
            this.buggy.position.z -= 0.1;
          });
        }
      }
      if (e.key === "Enter") {
        if (this.$store.state.stats.ammo > 0) {
          createBullets(this.handleIntersectWithBullet)(this.buggy);
          this.$store.commit("stats/mutateAmmo", -1);
        }
      }
    },
  },
});
</script>
