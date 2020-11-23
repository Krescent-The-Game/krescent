<template>
  <Entity>
    <Entity v-model="powerUp"></Entity>
  </Entity>
</template>

<script>
import Vue from "vue";
import * as BABYLON from "@babylonjs/core";
import { randomWithin } from "~/utils/Random.helper";

export default Vue.extend({
  name: "PowerUp",
  data() {
    return {
      powerUp: null,
    };
  },
  mounted() {
    this.$store.commit("powerUp/reset");
    this.$store.watch(
      () => this.$store.state.planet.shouldScore,
      (shouldScore) => {
        if (shouldScore) {
          this.createNewPowerUpTimer = setInterval(() => {
            requestAnimationFrame(this.createRandomPowerUp);
          }, 1000);
        }
      }
    );
  },
  beforeDestroy() {
    clearInterval(this.createNewPowerUpTimer);
  },
  methods: {
    createRandomPowerUp() {
      const chance = Math.random();
      if (chance < this.$store.getters["powerUp/getHealthChance"] / 100.0) {
        this.createHealthPowerUp();
      }
    },
    createHealthPowerUp() {
      if (
        this.$store.getters["powerUp/getHealthCount"] <
        this.$store.getters["powerUp/getHealthLimit"]
      ) {
        const powerUp = BABYLON.MeshBuilder.CreateIcoSphere(
          "HealthPowerUp",
          { radiusX: 0.1, radiusY: 0.1, radiusZ: 0.1, subdivisions: 1.5 },
          this.powerUp.getScene()
        );
        const buggy = this.powerUp.getScene().getMeshByName("Buggy");
        if (!buggy) {
          return;
        }
        powerUp.position = new BABYLON.Vector3(
          3,
          buggy.position.y,
          buggy.position.z
        );
        const powerUpScale = randomWithin(0.5, 0.4);
        powerUp.scaling = new BABYLON.Vector3(
          powerUpScale,
          powerUpScale,
          powerUpScale
        );

        const healthMaterial = new BABYLON.StandardMaterial(
          "healthMaterial",
          this.powerUp.getScene()
        );
        healthMaterial.diffuseColor = new BABYLON.Color3(0, 255, 0);
        powerUp.material = healthMaterial;

        const framerate = 10;
        const animPowerUp = new BABYLON.Animation(
          "movingForward",
          "position.x",
          framerate,
          BABYLON.Animation.ANIMATIONTYPE_FLOAT,
          BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        );

        this.$store.commit("powerUp/setHealthSpeed", randomWithin(1, 3));
        const speed = this.$store.getters["powerUp/getHealthSpeed"];
        const Keys = [];
        Keys.push({
          frame: 0,
          value: powerUp.position.x,
        });
        Keys.push({
          frame: framerate,
          value: powerUp.position.x - speed / 2,
        });
        Keys.push({
          frame: 2 * framerate,
          value: powerUp.position.x - speed,
        });
        Keys.push({
          frame: 4 * framerate,
          value: powerUp.position.x - speed * 2,
        });
        Keys.push({
          frame: 8 * framerate,
          value: powerUp.position.x - speed * 4,
        });
        animPowerUp.setKeys(Keys);
        const endEvent = new BABYLON.AnimationEvent(
          8 * framerate - 1,
          () => {
            this.$store.commit("powerUp/decrementHealthCount");
            powerUp.dispose();
          },
          true
        );
        animPowerUp.addEvent(endEvent);
        powerUp.animations = [];
        powerUp.animations.push(animPowerUp);
        this.powerUp.getScene().beginAnimation(powerUp, 0, 100, true);
        this.$store.commit("powerUp/incrementHealthCount");
      }
    },
  },
});
</script>
