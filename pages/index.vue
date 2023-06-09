<script setup>
const transitions = reactive({
  scroll: {
    wordmark: {
      opacity: 0,
      scale: 1,
    },
  },
});

function handleScroll(e, values) {
  let style = e.el.style;
  style["will-change"] = Object.keys(values).join(", ");
  Object.keys(values).forEach((key) => (style[key] = values[key]));
}
</script>

<template>
  <main class="bg-[#14090A]">
    <Logo color="#FDE5D3" />
    <section class="w-full h-[calc(100vh-88px)] flexy">
      <Wordmark
        v-scroll="
          (e) =>
            handleScroll(e, {
              opacity: 100 - (e.value / e.viewportHeight) * 100,
              scale: 1 - e.value / 10000,
            })
        "
      />
    </section>
    <div class="w-full bg-[#326CFF]">
      <Ticker
        text="Graphic Designer Print Maker Craftswoman "
        size="xl"
        class="text-white"
      />
    </div>
    <div
      class="w-full h-[16px] bg-[url('assets/images/checkerboard_17x17.png')] repeat"
    ></div>
    <div class="w-full h-[80px] bg-[#E9E800]"></div>
    <section class="w-full h-[600px]"></section>
  </main>
</template>
