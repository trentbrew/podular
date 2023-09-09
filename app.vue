<script setup>
  const nuxtApp = useNuxtApp()

  const isMobile = window.innerWidth < 900

  const iOS = () =>
    ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) ||
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)

  const iPhone = isMobile && iOS()

  const isSafari =
    /constructor/i.test(window.HTMLElement) ||
    (function (p) {
      return p.toString() === '[object SafariRemoteNotification]'
    })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification))

  const isFirefox = typeof InstallTrigger !== 'undefined'

  function handleOrientationChange() {
    switch (window.orientation) {
      case 0:
        console.log('Portrait orientation')
        location.href = '/'

        break
      case 90:
        console.log('Landscape orientation (clockwise)')
        location.href = '/debug/orientation-error'
        break
      case -90:
        console.log('Landscape orientation (counterclockwise)')
        location.href = '/debug/orientation-error'

        break
      default:
        console.log('Unknown orientation')
        location.href = '/debug/orientation-error'
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
  <Html data-theme="black" :style="iPhone ? 'overscroll-behavior: none;' : 'overflow: hidden;'">
    <Head><Title>PODULAR</Title></Head>
    <Body :style="iPhone ? 'overscroll-behavior: none;' : 'overflow: hidden;'">
      <div :style="`${iOS() || isSafari || isFirefox ? '' : 'cursor: none !important'}`">
        <NuxtLayout />
      </div>
    </Body>
  </Html>
</template>
