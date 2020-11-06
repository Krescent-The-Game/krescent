<template>
  <div class="krs__container">
    <div>
      <h1 class="krs__title">Krescent</h1>
      <h2></h2>
      <div class="krs__home_buttons">
        <a-button type="primary"
          ><NuxtLink to="/game"> Play! </NuxtLink></a-button
        >
        <a-button>
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            <a-icon type="github" />GitHub
          </a>
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.krs__home_buttons {
  display: flex;
  flex-direction: row;

  button {
    width: 50%;
    margin: 0px 5px;
  }
}
</style>
