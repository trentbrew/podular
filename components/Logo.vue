<script setup>
const props = defineProps({
  color: {
    type: String,
    default: "gray",
  },
  size: {
    type: [Number, String],
    default: 100,
  },
});
</script>

<template>
  <SVG
    name="logo"
    class="fixed top-12 left-12"
    :size="props.size"
    :color="props.color"
  />
</template>
