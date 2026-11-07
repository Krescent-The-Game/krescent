<template>
  <div class="krs__container krs__logo">
    <h1 class="krs__title">Krescent</h1>
    <h2></h2>
    <div class="krs__home_buttons">
      <a-button type="primary"
        ><NuxtLink to="/game"> Play! </NuxtLink></a-button
      >
      <a-button>
        <a
          href="https://github.com/m3yevn/krescent"
          target="_blank"
          rel="noopener noreferrer"
        >
          <a-icon type="github" />GitHub
        </a>
      </a-button>
    </div>
    <footer>
      A project by
      <ul>
        <li v-for="contributor in contributors" :key="contributor.id">
          <a :href="contributor.html_url" target="_blank">
            <a-avatar :src="contributor.avatar_url"> </a-avatar>
          </a>
        </li>
      </ul>
    </footer>
  </div>
</template>

<style lang="less" scoped>
footer {
  position: absolute;
  bottom: 0px;
  color: white;
  display: flex;
  align-items: center;

  ul {
    list-style: none;
    display: flex;
    margin: 0px;
    padding: 0px;

    li {
      margin: 3px;

      .ant-avatar {
        border: solid 2px white;
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      contributors: [],
    };
  },
  mounted() {
    this.handleFetchContributors();
  },
  methods: {
    async handleFetchContributors() {
      this.contributors = await this.$axios.$get(
        "https://api.github.com/repos/m3yevn/krescent/contributors"
      );
    },
  },
};
</script>
