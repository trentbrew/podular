<script setup>
const props = defineProps({
  controls: {
    type: Boolean,
    default: false,
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
  loop: {
    type: Boolean,
    default: false,
  },
  muted: {
    type: Boolean,
    default: false,
  },
  src: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <video keepplaying loop muted autoplay>
    <source :src="props.src" type="video/mp4" />
  </video>
</template>
