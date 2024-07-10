<script setup>
  const pb = usePocketbase()

  const state = reactive({
    data: null,
  })

  onMounted(async () => {
    state.data = await pb.get('test_collection')
  })
</script>

<template>
  <main>
    <h1>Pocketbase Debug</h1>
    <pre>{{ state.data }}</pre>
  </main>
</template>
