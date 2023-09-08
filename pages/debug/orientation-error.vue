<script setup>
  const height = computed(() => window.innerHeight)

  onMounted(() => {
    if (window.innerWidth > 900) location.href = '/'
  })
</script>

<template>
  <div class="bg-white flex flex-col gap-6 justify-center items-center w-full" :style="`height: ${height}px`">
    <img
      width="100"
      src="https://trentbrew.pockethost.io/api/files/swvnum16u65or8w/l5l7rc3za2mvufy/landscape_1krQzsjhnv.gif?token="
      alt="Landscape mode not supported"
    />
    <h1>This site is best viewed in portrait mode</h1>
  </div>
</template>
