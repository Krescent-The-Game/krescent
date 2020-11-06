<template>
  <div class="krs__container">
    <a-card class="krs__card--game">
      <Scene>
        <Sphere :position="[6, 0, 0]" :scaling="[1, 1, 1]"></Sphere>
      </Scene>
    </a-card>
  </div>
</template>

<style lang="less" scoped>
.krs__card--game {
  min-height: 95vh;
  width: 100%;
  margin: 10px;
  background: rgba(255, 255, 255, 0.5);
}
</style>
