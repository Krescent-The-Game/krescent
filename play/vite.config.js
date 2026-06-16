import { defineConfig } from "vite";

export default defineConfig({
  base: "/play/",
  build: {
    outDir: "../public/play",
    emptyOutDir: true,
  },
  publicDir: "public",
});
