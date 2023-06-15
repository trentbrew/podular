<script setup>
const state = reactive({
  active: 0,
  progress: 0,
});

function handleScroll(e) {
  let scrollTop = e.target.scrollTop;
  let scrollHeight = e.target.scrollHeight;
  let clientHeight = e.target.clientHeight;
  state.progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
}

function handleNewSection(e) {
  state.active = e.activeSection;
}
</script>

<template>
  <main v-scroll="handleScroll">
    <progress
      class="fixed top-0 left-0 progress progress-primary w-full z-50"
      :value="state.progress"
      max="100"
    ></progress>
    <FullPage @update="handleNewSection" :duration="1400">
      <section
        id="home"
        class="fixed top-0 left-0 flex flex-col justify-center items-center -z-50"
      >
        <video
          autoplay
          loop
          muted
          src="../assets/videos/landing.mov"
          class="object-cover w-screen h-screen duration-[1800ms]"
          :class="`
            ${
              state.active === 0
                ? 'scale-[1.3]'
                : 'scale-[1] -translate-y-[30vh] blur-[60px] brightness-[0.7] saturate-200'
            }
          `"
        />
      </section>
      <section id="about" class="mt-[100vh]">about</section>
      <section id="features">features</section>
      <section id="showroom">showroom</section>
      <section id="contact">contact</section>
    </FullPage>
  </main>
</template>
