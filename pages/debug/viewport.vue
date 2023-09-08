<script setup>
  const state = reactive({
    wrapperHeight: 0,
    viewportHeight: 0,
  })

  onMounted(() => {
    const wrapper = document.getElementById('wrapper')
    state.wrapperHeight = wrapper.clientHeight
    state.viewportHeight = window.innerHeight
  })

  window.addEventListener('resize', () => {
    state.viewportHeight = window.innerHeight
  })
</script>

<template>
  <div id="wrapper" class="\flex flex-col gap-6 justify-center items-center w-screen h-screen">
    <p class="w-48 text-right">
      {{ `wrapper height ` }}
      <b class="ml-12">{{ `${state.wrapperHeight}px` }}</b>
    </p>
    <p class="w-48 text-right">
      {{ `current viewport height ` }}
      <b class="ml-12">{{ `${state.viewportHeight}px` }}</b>
    </p>
  </div>
</template>
