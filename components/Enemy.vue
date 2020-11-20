<template>
  <Entity v-model="enemy"> </Entity>
</template>
<script lang="ts">
import Vue from "vue";
import * as BABYLON from "@babylonjs/core";

export default Vue.extend({
  name: "Enemy",
  data() {
    return {
      enemy: null,
    };
  },
  mounted() {
    setInterval(() => {
      requestAnimationFrame(this.createNewEnemy);
    }, 1000);
  },
  methods: {
    random(numbers) {
      return numbers[Math.floor(Math.random() * numbers.length)];
    },
    createNewEnemy() {
      if (this.$store.getters["enemy/getCount"] <= 2) {
        this.$store.commit("enemy/increment");
        const bodyMaterial = new BABYLON.StandardMaterial(
          "body_mat",
          this.enemy.getScene()
        );
        bodyMaterial.diffuseColor = new BABYLON.Color3(1.0, 0.1, 0.3);
        bodyMaterial.backFaceCulling = false;

        // TODO: update this to proper lunar private mesh
        const box = BABYLON.MeshBuilder.CreateBox(
          "Bomb",
          {},
          this.enemy.getScene()
        );
        box.material = bodyMaterial;
        box.position = new BABYLON.Vector3(
          2,
          -0.4,
          this.random([-8, -7.5, -7])
        );
        box.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2);

        const framerate = 30;
        const animEnemy = new BABYLON.Animation(
          "movingForward",
          "position.x",
          framerate,
          BABYLON.Animation.ANIMATIONTYPE_FLOAT,
          BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );
        const carKeys = [];
        carKeys.push({
          frame: 0,
          value: box.position.x,
        });
        carKeys.push({
          frame: 2 * framerate,
          value: box.position.x - 2,
        });
        carKeys.push({
          frame: 4 * framerate,
          value: box.position.x - 5,
        });
        animEnemy.setKeys(carKeys);
        box.animations = [];
        box.animations.push(animEnemy);
        this.enemy.getScene().beginAnimation(box, 0, 100, true);
      }
    },
  },
});
</script>
