<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.watch(
      () => this.$store.state.stats.health,
      (health) => {
        if (health <= 0) {
          this.$router.push("/game/over");
        }
      }
    );
    if (this.$store.state.stats.health <= 0) {
      this.$router.push("/game/over");
    }
  },
};
</script>

<style lang="less">
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

:root {
  --primary: #fc039d;
  --secondary: #7a4dab;
  --success: #87d068;
  --info: #108fe9;
}

div {
  margin: 0;
  padding: 0;
  height: 100%;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

div.nuxt__build_indicator {
  height: unset;
}

.krs__container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: url("~assets/background.jpg");
  background-color: black;
  background-size: cover;
}

.krs__title {
  display: block;
  font-weight: 300;
  color: var(--primary);
}

.krs__logo {
  flex-direction: column;

  div {
    height: unset;
  }
}

.krs__home_buttons {
  display: flex;
  flex-direction: row;
  height: unset;

  button {
    width: 50%;
    margin: 0px 5px;
  }
}
</style>
