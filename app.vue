<script setup>
const nuxtApp = useNuxtApp();

nuxtApp.hook("page:finish", () => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <Html data-theme="business">
    <Head><Title>PODULAR</Title></Head>
    <div>
      <NuxtLayout />
    </div>
  </Html>
</template>
