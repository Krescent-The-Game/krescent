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
    this.$store.watch(
      () => this.$store.state.planet.shouldScore,
      (shouldScore) => {
        if (shouldScore) {
          this.createNewEnemyTimer = setInterval(() => {
            requestAnimationFrame(this.createNewEnemy);
          }, 1000);
        }
      }
    );
  },
  beforeDestroy() {
    clearInterval(this.createNewEnemyTimer);
  },
  methods: {
    random(numbers) {
      return numbers[Math.floor(Math.random() * numbers.length)];
    },
    randomWithin(max, min) {
      return Math.random() * (max - min) + min;
    },
    async createNewEnemy() {
      if (this.$store.getters["enemy/getCount"] <= 5) {
        this.$store.commit("enemy/increment");
        const enemy = new BABYLON.Mesh("Bomb", this.enemy.getScene());
        const imported = await BABYLON.SceneLoader.ImportMeshAsync(
          "",
          "/assets/sun_bomb/",
          "scene.gltf",
          this.enemy.getScene()
        );
        imported.meshes.forEach((v) => {
          v.scaling = new BABYLON.Vector3(0.01, 0.01, 0.01);
          v.parent = enemy;
        });
        enemy.name = "Bomb";
        enemy.position = new BABYLON.Vector3(
          3,
          -0.4,
          this.randomWithin(-8.5, -7)
        );
        enemy.scaling = new BABYLON.Vector3(1.5, 1.5, 1.5);

        const framerate = 10;
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
          value: enemy.position.x,
        });
        carKeys.push({
          frame: 2 * framerate,
          value: enemy.position.x - 3,
        });
        carKeys.push({
          frame: 4 * framerate,
          value: enemy.position.x - 6,
        });
        animEnemy.setKeys(carKeys);
        enemy.animations = [];
        enemy.animations.push(animEnemy);
        this.enemy.getScene().beginAnimation(enemy, 0, 100, true);
      }
    },
  },
});
</script>
