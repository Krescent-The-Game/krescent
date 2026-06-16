export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: "static",

  router: {
    base: "/play/",
  },

  generate: {
    dir: "../../public/play",
    fallback: true,
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "Krescent — Moonshot endless runner",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Krescent is a GitHub Game Off 2020 moon buggy endless runner — Nuxt 2 + BabylonJS WebGL. Play in the browser. Eternal Flame rebirth by Kevin Moe Myint Myat.",
      },
      { name: "author", content: "Kevin Moe Myint Myat" },
      { name: "theme-color", content: "#0a0a0a" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["~assets/styles.less"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ["@/plugins/antd-ui", "@/plugins/babylon-canvas"],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: false,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
  ],
  ssr: false,

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
      babel: {
        query: { compact: false },
      },
    },
    transpile: ["vue-babylonjs"],
    parallel: true,
    cache: true,
    extractCSS: process.env.NODE_ENV === "production",
    optimizeCSS: process.env.NODE_ENV === "production",
  },
  pwa: {
    meta: {
      title: "Krescent",
      author: "m3yevn and kaichie",
    },
    manifest: {
      name: "Krescent",
      short_name: "Krescent",
      lang: "en",
    },
  },
};
