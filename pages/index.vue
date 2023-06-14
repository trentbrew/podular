<script setup>
const transitions = reactive({
  scroll: {
    logo: {
      brightness: 0,
      rotation: 0,
    },
    noise: {
      size: 10,
    },
    topbar: {
      opacity: 0,
    },
    hero: {
      opacity: 1,
      scale: 1.32,
      blur: 0,
      translateY: 0,
    },
    about: {
      alpha: 0,
      brightness: 0,
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
  transitions.scroll.hero.opacity = 1 - (e.value / e.viewportHeight) * 0.2;
  transitions.scroll.hero.scale = 1.32 - e.value / 4000 ?? 1.32;
  transitions.scroll.hero.blur = e.value / 80;
  transitions.scroll.hero.translateY = e.value / 1.4;
  transitions.scroll.logo.brightness = 100 - e.value / 10;
  transitions.scroll.about.brightness = 100 - e.value / 50;
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
    <!-- <div
      class="w-full h-[200px] fixed top-0 left-0"
      style="background: linear-gradient(#7e92b5, transparent)"
    ></div> -->

    <!-- <div
      :style="`opacity: ${transitions.scroll.topbar.opacity}%`"
      class="gradient-blur fixed top-0 left-0 w-full h-[248px] z-2 pointer-events-none"
    ></div> -->

    <div class="text-white">
      <svg
        class="fixed top-12 left-12"
        width="100"
        height="100"
        viewBox="0 0 401 399"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M400.315 220.486L301.967 220.486C301.967 220.582 301.967 220.678 301.967 220.774C301.967 264.767 266.304 300.43 222.311 300.43C222.215 300.43 222.119 300.43 222.023 300.43V398.778C222.119 398.778 222.215 398.778 222.311 398.778C320.62 398.778 400.315 319.083 400.315 220.774C400.315 220.678 400.315 220.582 400.315 220.486Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M178.45 0.931641C80.0676 0.931641 0.3125 80.6867 0.3125 179.07C0.3125 277.452 80.0676 357.207 178.45 357.207C276.833 357.207 356.588 277.452 356.588 179.07C356.588 80.6867 276.833 0.931641 178.45 0.931641ZM178.45 99.3536C134.424 99.3536 98.7344 135.044 98.7344 179.07C98.7344 223.095 134.424 258.786 178.45 258.786C222.476 258.786 258.166 223.095 258.166 179.07C258.166 135.044 222.476 99.3536 178.45 99.3536ZM356.588 178.782H258.166C258.166 178.878 258.166 178.974 258.166 179.07C258.166 223.095 222.476 258.786 178.45 258.786C178.354 258.786 178.259 258.785 178.163 258.785V357.207C178.259 357.207 178.354 357.207 178.45 357.207C276.833 357.207 356.588 277.452 356.588 179.07C356.588 178.974 356.588 178.878 356.588 178.782Z"
          fill="currentColor"
        />
      </svg>
    </div>

    <div
      class="absolute fullscreen"
      :style="`
        will-change: background-size filter transform;
        background-size: ${transitions.scroll.noise.size}%;
      `"
    ></div>

    <section
      class="z-[-1] fixed top-0 left-0 flexy image-cover bg-[#CED5E2] fullscreen ease-in-out"
      :style="`
        opacity: ${transitions.scroll.hero.opacity};
        transform: scale(${transitions.scroll.hero.scale}) translateY(-${transitions.scroll.hero.translateY}px);
        filter: blur(${transitions.scroll.hero.blur}px);
      `"
    >
      <!-- 🔴 TODO: dynamically swap fixed media/content for each section? -->
      <video
        autoplay
        loop
        muted
        src="../assets/videos/landing.mov"
        class="object-cover w-screen h-screen translate-y-[-12%]"
      />
    </section>

    <!-- <section class="flexy justify-center items-start w-full mt-[100vh]">
      <div
        id="hr1"
        v-peek="handlePeek"
        class="rounded-sm delay-100 h-[100vh] ease-expo bg-[url(/assets/images/renders/about.jpg)] bg-cover bg-fixed w-screen"
        :class="peekaboo('hr1')"
      >
        <div
          class="bg-[#d8dff4] h-screen w-screen"
          :style="`
          opacity: ${transitions.scroll.about.brightness}%;
        `"
        ></div>
      </div>
    </section> -->

    <section
      class="flexy justify-center items-start w-full h-screen bg-[#d8dff4] mt-[100vh]"
    ></section>
  </main>
</template>
