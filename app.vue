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

  const isFirefox = typeof InstallTrigger !== 'undefined'

  function handleOrientationChange() {
    switch (window.orientation) {
      case 0:
        console.log('Portrait orientation')
        window.location.reload()
        break
      case 90:
        console.log('Landscape orientation (clockwise)')
        window.location.reload()
        break
      case -90:
        console.log('Landscape orientation (counterclockwise)')
        window.location.reload()
        break
      default:
        console.log('Unknown orientation')
        break
    }
  }

  window.addEventListener('orientationchange', handleOrientationChange)

  nuxtApp.hook('page:finish', () => {
    window.scrollTo(0, 0)
  })

  onMounted(() => {
    console.log('app mounted')
  })
</script>

<template>
  <Html data-theme="black">
    <Head><Title>PODULAR</Title></Head>
    <div
      :style="
        isMobile
          ? 'overflow: hidden !important;'
          : isSafari || isFirefox
          ? ''
          : 'cursor: none !important;'
      "
    >
      <NuxtLayout />
    </div>
  </Html>
</template>
