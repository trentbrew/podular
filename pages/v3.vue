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
  console.log("progress: ", state.progress);
}

function handleNewSection(e) {
  console.log("activeSection: ", e.activeSection);
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
    <FullPage @update="handleNewSection">
      <section id="home">podular</section>
      <section id="about">about</section>
      <section id="features">features</section>
      <section id="showroom">showroom</section>
      <section id="contact">contact</section>
    </FullPage>
  </main>
</template>
