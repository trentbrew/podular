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
      class="fixed top-0 left-0 progress progress-neutral invert w-full z-50"
      :value="state.progress"
      max="100"
    ></progress>

    <button
      @click="goTo('contact')"
      class="absolute left-0 top-0 right-0 bottom-0 m-auto w-fit btn"
    >
      contact
    </button>

    <FullPage ref="fullpage" @update="handleNewSection" :duration="1400">
      <section
        id="home"
        class="fixed top-0 left-0 flex flex-col justify-center items-center -z-50"
      >
        <video
          autoplay
          loop
          muted
          src="../assets/videos/landing.mov"
          class="object-cover w-screen h-screen duration-[2200ms]"
          :class="`
            ${
              state.active === 0
                ? 'scale-[1.4]'
                : 'scale-[1] -translate-y-[60vh] blur-[40px] brightness-[0.6] saturate-200'
            }
          `"
        />
      </section>
      <section id="about" class="mt-[100vh] opacity-50">about</section>
      <section id="features">features</section>
      <section id="showroom">showroom</section>
      <section id="contact">
        <button @click="goTo('about')" class="w-fit btn">about</button>
      </section>
    </FullPage>
  </main>
</template>
