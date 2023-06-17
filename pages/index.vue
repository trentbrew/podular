<script setup>
const router = useRouter();

const fullpage = ref(null);

const state = reactive({
  active: 0,
  progress: 0,
});

function goTo(section) {
  fullpage.value.scrollById(section);
}

function handleScroll(e) {
  state.progress = e.progress;
}

function handleNewSection(e) {
  state.active = e.activeSection;
  console.log(state.active);
}
</script>

<template>
  <main v-scroll="handleScroll">
    <!-- <progress
      class="fixed top-0 left-0 progress progress-neutral invert w-full z-50"
      :value="state.progress"
      max="100"
    ></progress> -->

    <Intro />

    <FullPage
      ref="fullpage"
      @update="handleNewSection"
      :duration="1000"
      ease="easeInOutQuad"
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
                : 'scale-[1] -translate-y-[10vh] blur-[24px] brightness-[0.6] saturate-200'
            }
          `"
        />
      </section>
      <section
        id="about"
        class="mt-[100vh] flex justify-center items-center bg-white"
      >
        about
      </section>
      <section id="features" class="bg-white">features</section>
      <section id="showroom" class="bg-white">showroom</section>
      <section id="contact" class="bg-white">contact</section>
    </FullPage>
  </main>
</template>
