<script setup>
  const nuxtApp = useNuxtApp()
  const router = useRouter()

  const isMobile = window.innerWidth < 900

  const isSafari =
    /constructor/i.test(window.HTMLElement) ||
    (function (p) {
      return p.toString() === '[object SafariRemoteNotification]'
    })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification))

  const isFirefox = typeof InstallTrigger !== 'undefined'

  const iOS = () =>
    ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) ||
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)

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
  <Html data-theme="black">
    <Head><Title>PODULAR</Title></Head>
    <div :style="`${iOS() || isSafari || isFirefox ? '' : 'cursor: none !important;'} overflow: hidden !important;`">
      <NuxtLayout />
    </div>
  </Html>
</template>
