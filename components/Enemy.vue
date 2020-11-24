<template>
  <Entity>
    <Entity v-model="enemy"></Entity>
  </Entity>
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
    this.$store.commit("enemy/reset");
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
        const enemy = BABYLON.MeshBuilder.CreateIcoSphere(
          "Bomb",
          { radiusX: 0.1, radiusY: 0.1, radiusZ: 0.1, subdivisions: 1.5 },
          this.enemy.getScene()
        );
        const buggy = this.enemy.getScene().getMeshByName("Buggy");
        if (!buggy) {
          return;
        }
        enemy.position = new BABYLON.Vector3(
          3,
          buggy.position.y,
          buggy.position.z
        );
        const enemyScale = randomWithin(0.5, 0.4);
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
        const speed = this.$store.getters["enemy/getSpeed"];
        const Keys = [];
        Keys.push({
          frame: 0,
          value: enemy.position.x,
        });
        Keys.push({
          frame: framerate,
          value: enemy.position.x - speed / 2,
        });
        Keys.push({
          frame: 2 * framerate,
          value: enemy.position.x - speed,
        });
        Keys.push({
          frame: 4 * framerate,
          value: enemy.position.x - speed * 2,
        });
        Keys.push({
          frame: 8 * framerate,
          value: enemy.position.x - speed * 4,
        });
        Keys.push({
          frame: 16 * framerate,
          value: enemy.position.x - speed * 8,
        });
        animEnemy.setKeys(Keys);
        const endEvent = new BABYLON.AnimationEvent(
          16 * framerate,
          function () {
            if (
              this.$store.getters["enemy/getCount"] >
                this.$store.getters["enemy/getLimit"] &&
              this.$store.getters["enemy/getCount"] > 10
            ) {
              enemy.dispose();
              this.$store.commit("enemy/decrementCount");
            }
          },
          true
        );
        animEnemy.addEvent(endEvent);
        enemy.animations = [];
        enemy.animations.push(animEnemy);
        this.enemy.getScene().beginAnimation(enemy, 0, 100, true);
        this.$store.commit("enemy/incrementCount");
      }
    },
  },
});
</script>
