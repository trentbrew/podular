<script setup>
  const nuxtApp = useNuxtApp()

  const isMobile = window.innerWidth < 768

  const isSafari =
    /constructor/i.test(window.HTMLElement) ||
    (function (p) {
      return p.toString() === '[object SafariRemoteNotification]'
    })(
      !window['safari'] ||
        (typeof safari !== 'undefined' && window['safari'].pushNotification)
    )

  nuxtApp.hook('page:finish', () => {
    window.scrollTo(0, 0)
  })
</script>

<template>
  <Html data-theme="black">
    <Head><Title>PODULAR</Title></Head>
    <div
      :style="
        isMobile
          ? 'overflow: hidden !important;'
          : isSafari
          ? ''
          : 'cursor: none !important;'
      "
    >
      <NuxtLayout />
    </div>
  </Html>
</template>
