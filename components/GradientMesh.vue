<script setup>
import { Gradient } from "whatamesh";

onMounted(() => {
  const gradient = new Gradient();
  gradient.initGradient("#gradient-canvas");
});
</script>

<style scoped>
#gradient-canvas {
  width: 100vw;
  height: 100vh;
  filter: blur(24px);
  transform: scale(2);
  --gradient-color-1: #af611f;
  --gradient-color-2: #182d6b;
  --gradient-color-3: #2e69ff;
  --gradient-color-4: #130809;
}

#gradient-canvas3 {
  border-radius: 18px;
}
</style>

<template>
  <canvas id="gradient-canvas"></canvas>
</template>
