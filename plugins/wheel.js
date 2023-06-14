export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("wheel", {
    mounted(el, binding) {
      window.addEventListener("wheel", (e) => {
        binding.value(e);
      });
    },
    destroyed() {
      window.removeEventListener("wheel");
    },
  });
});
