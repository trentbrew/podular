export default defineNuxtConfig({
  ssr: false,
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    [
      "@pinia/nuxt",
      { autoImports: ["defineStore", ["defineStore", "definePiniaStore"]] },
    ],
  ],
  imports: {
    dirs: ["stores"],
  },
});
