<template>
  <div class="krs__game_stats">
    <a-card class="krs__game_card">
      <div class="krs__health_bar">
        <div>
          <label>Health - {{ health }} %</label>
        </div>
        <a-progress
          :stroke-color="healthColor"
          :percent="health"
          :show-info="false"
        />
      </div>
      <div class="krs__ammo_bar">
        <div>
          <label>Ammo - {{ ammoReal }} rounds</label>
        </div>
        <a-progress
          :stroke-color="ammoColor"
          :percent="ammo"
          :show-info="false"
        />
        <div v-if="ammoReal === 0">
          <a-button @click="handleReloadAmmo">Reload</a-button>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
export default {
  name: "Stats",
  data() {
    return {
      healthColor: {
        "0%": "var(--secondary)",
        "100%": "var(--primary)",
      },
      ammoColor: {
        "0%": "var(--info)",
        "100%": "var(--success)",
      },
    };
  },
  computed: {
    health() {
      return this.$store.state.stats.health;
    },
    ammo() {
      return this.$store.state.stats.ammo * 5;
    },
    ammoReal() {
      return this.$store.state.stats.ammo;
    },
  },
  mounted() {
    this.$store.watch(
      () => this.$store.state.stats.health,
      (health) => {
        this.$store.commit("powerUp/setHealthChance", (100 - health) / 2);
      }
    );
  },
  methods: {
    handleReloadAmmo() {
      this.$store.commit("stats/mutateAmmo", 20);
    },
  },
};
</script>

<style lang="less">
.krs__game_stats {
  z-index: 1;
  position: absolute;
  top: 0px;
  right: 0px;
  height: unset;

  div {
    height: unset;
  }

  label {
    color: white;
  }
}

.krs__game_card {
  height: 150px;
  width: 200px;
  background: rgba(255, 255, 255, 0.2);
}
</style>
