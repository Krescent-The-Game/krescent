<template>
  <Entity v-model="enemy"> </Entity>
</template>

<script>
import Vue from "vue";
import * as BABYLON from "@babylonjs/core";
import { randomWithin } from "~/utils/Random.helper";

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
    createNewEnemy() {
      if (
        this.$store.getters["enemy/getCount"] <=
          this.$store.getters["enemy/getLimit"] &&
        this.$store.getters["enemy/getCount"] <= 20
      ) {
        this.$store.commit("enemy/incrementCount");

        const enemy = BABYLON.MeshBuilder.CreateIcoSphere(
          "Bomb",
          { radiusX: 0.1, radiusY: 0.1, radiusZ: 0.1, subdivisions: 1.5 },
          this.enemy.getScene()
        );
        const buggy = this.enemy.getScene().getMeshByName("Buggy");
        enemy.position = new BABYLON.Vector3(
          3,
          buggy.position.y,
          buggy.position.z
        );
        const enemyScale = randomWithin(0.8, 0.7);
        enemy.scaling = new BABYLON.Vector3(enemyScale, enemyScale, enemyScale);

        const lavaMaterial = new BABYLON.StandardMaterial(
          "lavaMaterial",
          this.enemy.getScene()
        );
        lavaMaterial.diffuseColor = new BABYLON.Color3(255, 0, 0);
        enemy.material = lavaMaterial;

        const framerate = 10;
        const animEnemy = new BABYLON.Animation(
          "movingForward",
          "position.x",
          framerate,
          BABYLON.Animation.ANIMATIONTYPE_FLOAT,
          BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );
        const Keys = [];
        Keys.push({
          frame: 0,
          value: enemy.position.x,
        });
        Keys.push({
          frame: 2 * framerate,
          value: enemy.position.x - 3,
        });
        Keys.push({
          frame: 4 * framerate,
          value: enemy.position.x - 6,
        });
        animEnemy.setKeys(Keys);
        enemy.animations = [];
        enemy.animations.push(animEnemy);
        this.enemy.getScene().beginAnimation(enemy, 0, 100, true);
      }
      if (
        this.$store.getters["enemy/getCount"] >
        this.$store.getters["enemy/getLimit"]
      ) {
        const bomb = this.enemy.getScene().getMeshByName("Bomb");
        bomb.dispose();
        this.$store.commit("enemy/decrementCount");
      }
    },
  },
});
</script>
