export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("scroll", {
    mounted(el, binding) {
      window.addEventListener("scroll", (e) => {
        e.preventDefault();
        const target = e.target.scrollingElement;
        const height = target.scrollHeight;
        const value = Math.floor(target.scrollTop);
        const viewportHeight = target.clientHeight;
        const viewportWidth = target.clientWidth;
        const progress = (value / (height - viewportHeight)) * 100;
        binding.value({
          target,
          el,
          height,
          value,
          viewportHeight,
          viewportWidth,
          progress,
        });
      });
    },
    destroyed() {
      window.removeEventListener("scroll");
    },
  });
});
