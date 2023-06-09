<script setup>
// const video = require("@/assets/video/1.mp4");
</script>

<template>
  <main class="fixed overflow-hidden flex justify-center items-center">
    <div class="z-[-1]">
      <GradientMesh class="fixed top-0 left-0 opacity-[0.92] saturate-200" />
      <video
        autoplay
        loop
        muted
        src="../assets/videos/1.mp4"
        class="object-cover w-screen h-screen"
      />
    </div>
    <section class="absolute w-full flex justify-center item-center">
      <h1>Bientôt disponible</h1>
    </section>
  </main>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;700&display=swap");

main {
  text-align: center;
  color: rgba(255, 255, 255, 0.3);
  font-size: 24px;
  font-weight: 100;
  font-family: monospace, sans-serif;
  text-transform: lowercase;
}
</style>
