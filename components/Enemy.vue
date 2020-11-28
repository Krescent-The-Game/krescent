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
        // TODO:// Calculate and randomises position
        enemy.position = new BABYLON.Vector3(
          3.4,
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

        const pivot = new BABYLON.TransformNode("root");
        const cor = new BABYLON.Vector3(0, -3.85, 0);
        const axis = new BABYLON.Vector3(0, 0, 1);
        const speed = this.$store.getters["enemy/getSpeed"];

        const angle = speed * 0.001;
        pivot.position = cor;
        enemy.parent = pivot;
        let totalAngleTravelled = 0.0;
        
        this.enemy.getScene().registerAfterRender(() => {
          pivot.rotate(axis, angle, BABYLON.Space.WORLD);
          totalAngleTravelled = totalAngleTravelled + angle;
          if (totalAngleTravelled > 3) {
            enemy.dispose();
            this.$store.commit("enemy/decrementCount");
          }
        });
        this.$store.commit("enemy/incrementCount");
      }
    },
  },
});
</script>
