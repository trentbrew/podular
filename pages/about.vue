<script setup>
const transitions = reactive({
  scroll: {
    noise: {
      size: 10,
    },
    topbar: {
      opacity: 0,
    },
    hero: {
      opacity: 1,
      scale: 1.02,
      blur: 0,
    },
  },
  peek: {
    hr1: {
      visible: false,
      inactive: "w-[0%] opacity-0",
      active: "w-[100%] opacity-100",
    },
  },
});

function handleScroll(e) {
  transitions.scroll.noise.size =
    e.value > e.viewportHeight ? 4 : 14 - 10 * (e.value / e.viewportHeight); // 10% -> 4%
  transitions.scroll.topbar.opacity = e.value > e.viewportHeight ? 100 : 0;
  transitions.scroll.hero.opacity = 1 - (e.value / e.viewportHeight) * 0.9;
  transitions.scroll.hero.scale = 1.02 - e.value / 25000;
  transitions.scroll.hero.blur = e.value / 30;
}

function handlePeek(e) {
  transitions.peek[e.id].visible = e.value;
}

function peekaboo(id) {
  return transitions.peek[id].visible
    ? transitions.peek[id].active
    : transitions.peek[id].inactive;
}
</script>

<template>
  <main v-scroll="handleScroll">
    <div
      :style="`opacity: ${transitions.scroll.topbar.opacity}%`"
      class="gradient-blur fixed top-0 left-0 w-full h-[248px] z-2 pointer-events-none"
    ></div>

    <Logo color="#0F090B" />

    <div
      class="noisy absolute fullscreen"
      :style="`
        will-change: background-size filter transform;
        background-size: ${transitions.scroll.noise.size}%;
      `"
    ></div>

    <section
      class="z-[-1] fixed top-0 left-0 flexy image-cover bg-[url('assets/images/hero.png')] fullscreen ease-in-out contrast-200"
      :style="`
        opacity: ${transitions.scroll.hero.opacity};
        transform: scale(${transitions.scroll.hero.scale});
        filter: blur(${transitions.scroll.hero.blur}px);
      `"
    ></section>

    <section
      class="flexy justify-center items-start w-full mt-[100vh] p-[15vw]"
    >
      <h1 class="text-[72px] font-bold">KIANIJEE</h1>
      <p class="text-lg pb-[72px] font-bold">
        Lorem ipsum Lorem Lorem ipsum dolor sit amet, consectetuer adipiscing
        elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
        aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
        tation ullamcorper suscipit lobortis n
      </p>
      <div
        id="hr1"
        v-peek="handlePeek"
        class="bg-black rounded-sm duration-[1.5s] delay-100 ease-expo h-[3px]"
        :class="peekaboo('hr1')"
      ></div>
    </section>

    <section></section>
  </main>
</template>
