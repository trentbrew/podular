<script setup>
const router = useRouter();

const fullpage = ref(null);

const state = reactive({
  debug: false,
  ready: false,
  active: 0,
  progress: 0,
  direction: "down",
});

function goTo(section) {
  fullpage.value.scrollById(section);
}

function handleScroll(e) {
  state.progress = e.progress;
}

function handleNewSection(e) {
  state.active = e.activeSection;
  state.direction = e.direction;
  console.log(state.direction);
}

function handleIntroReady(e) {
  state.ready = true;
}

function parallax(index) {
  const fx = "filter: brightness(0.6);";
  const bgy = "background-size: 130%; background-position:";
  if (state.active < index) {
    return `${fx} ${bgy} 50% -50%`;
  }
  if (state.active == index) {
    return `${bgy} 50% 50%`;
  }
  if (state.active > index) {
    return `${fx} ${bgy} 50% 150%`;
  }
}
</script>

<template>
  <main v-scroll="handleScroll">
    <progress
      class="fixed top-0 left-0 progress progress-neutral grayscale w-full z-50"
      :value="state.progress"
      max="100"
    ></progress>

    <div
      class="duration-[1s]"
      :class="`
    ${
      state.active != 0
        ? 'scale-[0.9] opacity-0 translate-y-[-20px]'
        : 'delay-[1200ms]'
    }
    `"
    >
      <Intro v-if="!state.debug" @ready="handleIntroReady" />
    </div>

    <FullPage
      ref="fullpage"
      @update="handleNewSection"
      :duration="1200"
      :disable="!state.ready"
      ease="easeInOutCubic"
    >
      <section
        id="home"
        class="fixed top-0 left-0 flex flex-col justify-center items-center -z-50"
      >
        <video
          autoplay
          loop
          muted
          src="../assets/videos/landing.mov"
          class="object-cover w-screen h-screen duration-[1600ms]"
          :class="`
            ${
              state.active === 0
                ? 'scale-[1.2]'
                : 'scale-[1] -translate-y-[5vh] brightness-[0.6]'
            }
          `"
        />
      </section>
      <section
        id="about"
        class="flex flex-col justify-center items-center bg-white"
      >
        <div
          class="bg-[url('/assets/images/renders/about.jpg')] bg-no-repeat bg-fixed duration-[2s] h-screen w-screen brightness-50"
          :style="parallax(1)"
        ></div>
        <!-- <div
          class="bg-white w-screen duration-[3s]"
          :class="state.active === 1 ? 'delay-[2s] h-[50vh]' : 'h-[100vh]'"
        ></div> -->
      </section>
      <section id="features">
        <div
          class="bg-[url('/assets/images/renders/features.jpg')] bg-no-repeat bg-fixed w-screen h-screen duration-[2s]"
          :style="parallax(2)"
        ></div>
      </section>
      <section id="showroom">
        <div
          class="bg-[url('/assets/images/renders/showroom.jpg')] bg-no-repeat bg-fixed w-screen h-screen duration-[2s]"
          :style="parallax(3)"
        ></div>
      </section>
      <section id="contact" class="bg-black text-white">contact</section>
    </FullPage>
  </main>
</template>
