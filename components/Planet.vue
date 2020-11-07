<template>
  <Entity>
    <Cylinder
      :position="[0, -3.85, -15]"
      :scaling="[6.8, 6.8, 6.8]"
      :rotation="[-Math.PI / 2, 0, 0]"
    >
    </Cylinder>
  </Entity>
</template>

<script lang="ts">
export default {
  name: "Planet",
  data() {
    return {
      rotation: [8, 0, 0],
    };
  },
  mounted() {
    setInterval(() => {
      requestAnimationFrame(this.rotatePlanet);
    }, 1000);
  },
  methods: {
    rotatePlanet() {
      this.rotation = [
        ++this.rotation[0],
        this.rotation[1],
        ++this.rotation[2],
      ];
    },
  },
};
</script>
