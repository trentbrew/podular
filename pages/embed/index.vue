<script setup>
  import { pings } from '@/data/defaults/index.mjs'

  const route = useRoute()
  const router = useRouter()

  const fullpage = ref(null)

  const isMobile = window.innerWidth < 900
  const iPhone = isMobile && iOS()
  const isFirefox = typeof InstallTrigger !== 'undefined'

  const isSafari =
    /constructor/i.test(window.HTMLElement) ||
    (function (p) {
      return p.toString() === '[object SafariRemoteNotification]'
    })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification))

  const iOS = () =>
    ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) ||
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)

  const isChromeForAndroid = () => navigator.userAgent.toLowerCase().includes('chrome') && userAgent.includes('android')

  const overlay = () => (activeMenu.value ? 'blur-xl brightness-[0.4]' : '')

  const eagerMenu = computed(() => false)
  const activeMenu = computed(() => false)
  const landscape = computed(() => window.innerWidth > window.innerHeight)

  const pingCategory = computed(() => route.hash?.split('_')[0].substring(1) ?? '')
  const pingContext = computed(() => route.hash?.split('_')[1] ?? '')
  const pingDescription = computed(() => pings[pingCategory.value]?.find(ping => ping.id === pingContext.value)?.description || '')

  // watchEffect(() => {
  //   console.log('------------')
  //   console.log('pingCategory: ', pingCategory.value)
  //   console.log('pingContext: ', pingContext.value)
  //   console.log('pingDescription: ', pingDescription.value)
  // })

  const state = reactive({
    skipIntro: true,
    viewportHeight: 0,
    ready: false,
    active: 0,
    scroll: 0,
    progress: 0,
    direction: 'down',
    featureContext: null,
    menu: {
      zone: [160, 160],
      active: false,
      hover: false,
      ghostHover: false,
      lock: false,
      ignore: false,
      clicked: false,
      mobile: {
        active: false,
      },
    },
    lightbox: {
      active: false,
      image: null,
      category: '',
      context: '',
      description: '',
    },
    offset: {
      features: [0, 0],
      showroom: [0, 0],
    },
    data: {
      landing: {
        title: '',
        subtitle: '',
      },
      about: {
        title: '',
        subtitle: '',
      },
      contact: {
        full_name: '',
        role: '',
        email: '',
        image: '',
      },
    },
  })

  onMounted(async () => {
    router.push({ hash: `#features` })
    init()
  })

  function init() {
    state.viewportHeight = window.innerHeight
    if (state.skipIntro) state.ready = true
  }

  function updateViewportHeight(e) {
    state.viewportHeight = e
  }

  function goTo(section, delayed) {
    if (delayed) {
      closeMenu()
      setTimeout(() => {
        fullpage.value.scrollById(section)
      }, 400)
    } else {
      fullpage.value.scrollById(section)
    }
  }

  function handleScroll(e) {
    state.progress = e.progress
    state.scroll = e.value
  }

  function handleNewSection(e) {
    state.active = e.activeSection
    state.direction = e.direction
  }

  function handleIntroReady() {
    state.ready = true
  }

  function syncParallax(index) {
    if (state.active < index) return ['50vw', '-50vh']
    if (state.active == index) return ['50vw', '50vh']
    if (state.active > index) return ['50vw', '150vh']
    return ''
  }

  function parallax(index) {
    if (isChromeForAndroid()) return ''
    if (iOS() || isMobile) return ''
    const fx = 'filter: brightness(0.6);'
    const bgy = `background-attachment: fixed; background-size: ${isMobile ? 'cover' : '130%'}; background-position: 50%`
    if (state.active < index) return `${fx} ${bgy} -50%;`
    if (state.active == index) return `${bgy} 50%;`
    if (state.active > index) return `${fx} ${bgy} 150%;`
  }

  function animate(index, inactive, active) {
    if (iPhone) return active
    if (state.active === index) return active
    else return inactive
  }

  function closeMenu() {
    state.menu.mobile.active = false
  }

  function openMenu() {
    state.menu.mobile.active = true
  }

  function openLightbox(image) {
    state.lightbox.image = image.src
    state.lightbox.category = image.category
    state.lightbox.context = image.id
    state.lightbox.description = pings[image.category][image.id]
    state.lightbox.active = true
    const slug = `#${state.lightbox.category}_${image.id}`
    console.log('slug: ', slug)
    router.push({
      hash: slug,
      query: { view: true },
    })
  }

  function closeLightbox() {
    router.push({ hash: `#${route.hash.split('_')[0]}` })
    state.lightbox.image = null
    state.lightbox.active = false
    state.lightbox.context = ''
    state.lightbox.description = ''
  }

  function iPhoneParallax() {
    if (iPhone) return `filter: brightness(${state.progress / 100 < 0.5 ? 1 - state.progress / 100 : state.progress / 100});`
  }
</script>

<template>
  <div>
    <Cursor v-if="!isMobile && !isFirefox && !isSafari && !iOS()" class="pointer-events-none" />

    <!-- INTRO -------------------------------------------------------------->

    <!-- <div class="fixed top-0 left-0 origin-top-left z-[50] duration-[1.4s] pointer-events-none">
      <Intro @ready="handleIntroReady" :skip="state.skipIntro" />
    </div> -->

    <!-- LIGHTBOX -------------------------------------------------------------->

    <div
      v-if="!iPhone"
      :class="state.lightbox.context.length || pingContext?.length || pingDescription?.length ? 'opacity-100' : 'opacity-0'"
      class="w-[100vw] p-8 pb-6 md:p-16 h-[50vh] md:pb-12 flex flex-col justify-end items-start duration-[2s] fixed bottom-0 left-0 !pointer-events-none z-[110]"
      style="background: linear-gradient(transparent, #000000)"
    >
      <div class="font-bold text-4xl md:text-5xl text-white mb-6 podular-sans">{{ pingContext }}</div>
      <div class="flex flex-col gap-3 text-white">
        <span class="md:text-lg w-full md:max-w-[50vw] opacity-100 md:opacity-60">{{ pingDescription }}</span>
      </div>
    </div>
    <div
      v-show="state.lightbox.active"
      class="hoverable shadow-lg z-[105] flex justify-center items-center rounded-full h-10 w-10 duration-150 fixed top-4 right-4 md:top-8 md:right-8 md:left-auto bg-white text-black"
      @click="closeLightbox"
    >
      <Icon class="pointer-events-none" :size="18" name="close" />
    </div>
    <div
      class="w-full h-screen fixed top-0 left-0 z-[100] bg-black/90 backdrop-blur-lg flex justify-center items-center duration-300 pointer-events-none"
      :class="state.lightbox.active ? 'opacity-100' : 'opacity-0'"
    >
      <div
        class="bg-white w-full bg-cover bg-center bg-no-repeat duration-[600ms] flex justify-start items-end"
        :class="state.lightbox.active ? 'scale-1' : 'scale-[0.8]'"
        :style="`min-height: -webkit-fill-available; background-image: url(${
          state.lightbox.image ?? 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcR0NrOJEpfjkM0zxD-aO9b-bWqW3mhY57jPMg3aSbxTYO__R4jOvx8T2Oa7Fm9yxXOGg4B_ns3SZaZGCiBOPQw'
        })`"
      >
        <div
          v-if="iPhone"
          class="w-[100vw] h-[100vh] flex flex-col justify-end items-center p-8 pb-[18dvh] duration-[2s] pointer-events-none z-[110]"
          style="background: linear-gradient(transparent, #000000bb)"
        >
          <div class="flex flex-col gap-3 text-white text-left w-full">
            <div class="font-bold text-4xl md:text-5xl text-white mb-2 podular-sans w-full text-left">
              {{ pingContext ?? state.lightbox.context }}
            </div>
            <span class="md:text-lg w-full md:max-w-[50vw] opacity-100 md:opacity-60">
              {{ pingDescription ?? state.lightbox.description }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- MAIN -------------------------------------------------------------->

    <div
      class="fixed bottom-[21vh] left-0 justify-center md:justify-end md:bottom-12 md:right-16 md:left-auto z-[100] flex items-center gap-8 duration-[600ms] text-white w-full md:w-fit delay-[400ms] scale-[0.8]"
      :class="(isMobile ? [0, 1, 2, 3] : [0, 1, 2, 3]).includes(state.active) ? 'opacity-0 pointer-events-none' : 'opacity-100'"
    >
      <a class="hoverable hover:opacity-50 md:opacity-100" href="https://www.facebook.com/PodularOfficial">
        <Icon class="pointer-events-none" name="facebook" />
      </a>
    </div>

    <main
      class="bg-transparent"
      v-scroll="handleScroll"
      style="transition: 1.2s cubic-bezier(0.16, 1, 0.3, 1)"
      :style="state.lightbox.active ? 'overflow: hidden !important;' : ''"
    >
      <!-- PAGES -->

      <FullPage
        ref="fullpage"
        @ready="handleFullscreenReady"
        @resize="updateViewportHeight"
        @update="handleNewSection"
        :duration="1200"
        :lock="!state.ready || state.menu.mobile.active || state.lightbox.active"
        :disabled="true"
        ease="easeInOutCubic"
      >
        <section id="features" class="bg-black md:bg-transparent" :class="!isMobile ? (overlay() ? ' brightness-[0.3]' : ' brightness-1') : ''">
          <!-- desktop -->
          <div v-if="!isMobile" class="w-screen h-screen absolute duration-[2s]">
            <Pannable
              @ping="openLightbox"
              :pings="pings.features"
              class="duration-0"
              id="features"
              image="https://podular.pockethost.io/api/files/mycqyrkva5287ex/e0qw45c9nkmu8bp/features_DKM4WPMfkj.jpg"
            />
          </div>
          <!-- mobile -->
          <div v-else class="w-full h-full">
            <div v-if="iPhone" class="font-normal text-5xl text-white mb-6 mt-24 podular-sans text-left ml-8">features</div>
            <hr v-if="iPhone" class="opacity-25" />
            <ul class="pt-4 w-full mt-[64px] bg-black flex flex-col" :class="iPhone ? '!mt-[12px]' : ''" :style="iPhone ? '' : `height: ${state.viewportHeight - 64}px`">
              <li
                v-for="(item, itemIndex) in pings.features"
                @click="
                  openLightbox({
                    src: item.image,
                    category: 'features',
                    id: item.id,
                  })
                "
                :key="itemIndex"
                class="w-full flex justify-start items-center px-4 pb-4 rounded-lg"
                :class="state.lightbox.active ? 'pointer-events-none' : iPhone ? '!h-[150px]' : 'h-full'"
              >
                <div class="w-full h-full flex justify-center items-center rounded-lg">
                  <div class="w-full h-full bg-no-repeat bg-cover bg-center brightness-[0.4] saturate-125 rounded-lg" :style="`background-image: url(${item.image});`"></div>
                  <span class="pointer-events-none absolute w-full flex justify-center text-3xl text-white lowercase">
                    {{ item.title }}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <!-- SHOWROOM PAGE -->

        <section id="showroom" class="bg-black md:bg-transparent" :class="!isMobile ? (overlay() ? ' brightness-[0.3]' : ' brightness-1') : ''">
          <!-- desktop -->
          <div v-if="!isMobile" class="w-screen h-screen absolute">
            <Pannable
              @ping="openLightbox"
              :pings="pings.showroom"
              class="duration-0"
              id="showroom"
              image="https://trentbrew.pockethost.io/api/files/swvnum16u65or8w/5uacn4j78hcehva/showroom_base_w4cqlt8g0p.jpg?token="
            />
            <div class="w-[100vw] p-16 pb-12 flex flex-col justify-end items-start duration-[2s] absolute bottom-0 left-0 pointer-events-none">
              <div class="font-bold text-5xl text-white mb-6 podular-sans">
                {{ pingContext ?? 'Loading...' }}
              </div>
              <div class="flex flex-col gap-3 text-white">
                <span class="text-lg max-w-[50vw] opacity-60">
                  {{ pingDescription }}
                </span>
              </div>
            </div>
          </div>

          <!-- mobile -->
          <div v-else class="w-full h-full">
            <div v-if="iPhone" class="font-normal text-5xl text-white mb-6 mt-24 podular-sans text-left ml-8">showroom</div>
            <hr v-if="iPhone" class="opacity-25" />
            <ul class="pt-4 w-full mt-[64px] bg-black flex flex-col" :class="iPhone ? '!mt-[12px]' : ''" :style="iPhone ? '' : `height: ${state.viewportHeight - 64}px`">
              <li
                v-for="(item, itemIndex) in pings.showroom"
                @click="
                  openLightbox({
                    src: item.image,
                    category: 'showroom',
                    id: item.id,
                  })
                "
                :key="itemIndex"
                class="w-full flex justify-start items-center px-4 pb-4"
                :class="state.lightbox.active ? 'pointer-events-none' : isMobile && iPhone ? '!h-[150px]' : 'h-full'"
              >
                <div class="w-full h-full flex justify-center items-center rounded-lg">
                  <div class="w-full h-full bg-no-repeat bg-cover bg-center brightness-[0.4] saturate-125 rounded-lg" :style="`background-image: url(${item.image});`"></div>
                  <span class="pointer-events-none absolute w-full flex justify-center text-3xl text-white lowercase">
                    {{ item.title }}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <!-- CONTACT PAGE -->

        <!-- <section
          id="contact"
          class="bg-black/40 backdrop-blur-sm text-white"
          :class="overlay()"
          :style="iPhone ? 'background: black !important; height: 100vh;' : ''"
        >
          <div
            class="w-full h-full justify-center flex md:flex-row flex-col gap-12 items-center text-center md:text-left md:m-auto z-[40]"
          >
            <div
              v-if="iPhone"
              class="font-normal w-full text-5xl text-white mb-[-36px] mt-0 podular-sans text-left ml-8"
            >
              contact
            </div>
            <hr v-if="iPhone" class="opacity-25 mb-12 mt-0 w-full" />
            <div>
              <div
                class="absolute z-[-1] translate-x-[-143px] translate-y-[-145px] duration-[3s] delay-[200ms]"
                :class="animate(4, 'opacity-0', 'opacity-[0.0]')"
              >
                <h1>The Perfect Space Solution</h1>
              </div>

              <img
                src="https://trentbrew.pockethost.io/api/files/swvnum16u65or8w/51arrah30qe27ve/contact_YOiKby9Gwc.png?token="
                alt="Jasna Ostojich"
                class="rounded-full mt-[-100px] md:m-auto object-cover w-[160px] h-[160px] border-2 border-white/10 md:text-left duration-[1.5s] delay-[1.4s]"
                :class="animate(4, 'opacity-0 scale-[0.9]', `opacity-100 scale-[1] ${iPhone ? '!mt-0' : ''}`)"
              />
            </div>
            <div
              class="duration-[1.5s] delay-[1.8s]"
              :class="
                isMobile
                  ? animate(4, 'opacity-0 translate-y-[24px]', 'opacity-100 translate-y-[0px]')
                  : animate(4, 'opacity-0 translate-x-[-42px]', 'opacity-100 translate-x-[0px]')
              "
            >
              <h1 class="text-3xl md:text-5xl mb-4">Jasna Ostojich</h1>
              <p class="mb-2 text-lg md:text-xl">Founder & Executive President</p>
              <div class="flex flex-col mt-6 justify-start items-center md:items-start">
                <a class="hoverable underline flex gap-4 items-center justify-center" href="mailto:jasna@podular.us">
                  <Icon name="mail" class="opacity-60 md:opacity-100" />
                  <span class="hoverable opacity-50">jasna@podular.us</span>
                </a>
                <span class="font-bold flex justify-start gap-4 items-center"></span>
                <div
                  v-if="iPhone"
                  class="translate-y-[64px] justify-center md:justify-end md:bottom-12 md:right-16 md:left-auto z-[100] flex items-center gap-8 duration-[600ms] text-white w-full md:w-fit delay-[400ms] scale-[0.7]"
                >
                  <a class="hoverable hover:opacity-50 md:opacity-100" href="#">
                    <Icon class="pointer-events-none" name="instagram" />
                  </a>
                  <a class="hoverable hover:opacity-50 md:opacity-100" href="#">
                    <Icon class="pointer-events-none" name="facebook_alt" />
                  </a>
                  <a class="hoverable hover:opacity-50 md:opacity-100" href="#">
                    <Icon class="pointer-events-none" name="twitter" />
                  </a>
                </div>
              </div>
            </div>
            <div
              class="w-full h-[100px] fixed bottom-0 flex flex-col justify-end items-start z-[30] duration-500"
              :class="state.active != 4 || iPhone ? 'opacity-0 pointer-events-none' : 'opacity-100'"
            >
              <div class="flex items-center w-full justify-between px-16">
                <div
                  class="w-full h-[120px] flex gap-[4px] md:gap-0 items-center justify-center md:justify-start flex-col md:flex-row"
                >
                  <span class="opacity-50 md:opacity-40 flex gap-2 items-center text-xs md:text-base">
                    <Icon class="md:mr-1" name="cube" :size="16" />
                    3D Renders by
                    <a class="underline hoverable" href="https://studiolafa.design">Lawan Alade-Fa</a>
                  </span>
                  <span class="ml-4 opacity-50 md:opacity-40 flex gap-2 items-center text-xs md:text-base">
                    <Icon class="md:mr-2" name="laptop" :size="16" />
                    Web Design by
                    <a class="underline hoverable" href="https://trentbrew.com">Trent Brew</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section> -->
      </FullPage>
    </main>

    <!-- / -->
  </div>
</template>

<style lang="scss">
  @keyframes bubble-enter {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes menu-item-enter {
    0% {
      transform: translateX(80px);
      opacity: 0;
    }
    100% {
      transform: translateX(0px);
      opacity: 1;
    }
  }

  .menu-item {
    transition: 200ms;
    display: flex;
    flex-direction: column;
    align-items: center;
    // opacity: 0;
    // animation: menu-item-enter 600ms ease forwards;
  }

  section {
    @apply duration-[1.4s];
  }

  .active-link {
    transition: 400ms;
    color: white !important;
    // border-bottom: white 1px solid;
  }

  .link-indicator {
    @apply w-[0%] duration-[800ms] bg-white h-[1.5px] translate-y-[22px];
  }

  .active-link .link-indicator {
    opacity: 1 !important;
    width: 80% !important;
  }

  // .active-link::after {
  //   content: '';
  //   position: absolute;
  //   width: 8px;
  //   height: 8px;
  //   background-color: white;
  //   border-radius: 16px 16px 0px 0px;
  //   top: 52px;
  // }

  .inactive-link {
    transition: 400ms;
    color: rgba(white, 0.32);
  }

  .inactive-link:hover {
    color: white;
  }

  #feat-list > div {
    @apply animate-ping;
    z-index: 10;
  }

  #show-list > div {
    @apply animate-ping;
    z-index: 10;
  }

  .feat,
  .show {
    position: absolute;
    background: #ffffff;
    height: 36px;
    width: 36px;
    border-radius: 100%;
    z-index: 100;
  }

  #feat-list #access {
    top: -50px;
    right: -480px;
  }

  #feat-list #access2 {
    top: -50px;
    right: -480px;
  }

  #led {
    bottom: -385px;
    right: -500px;
  }

  #led2 {
    bottom: -385px;
    right: -500px;
  }

  #storage {
    bottom: 0px;
    left: -75px;
  }

  #storage2 {
    bottom: 0px;
    left: -75px;
  }

  #sink {
    top: -200px;
    left: -360px;
  }

  #sink2 {
    top: -200px;
    left: -360px;
  }

  #cooktop {
    top: -170px;
    right: -270px;
  }

  #cooktop2 {
    top: -170px;
    right: -270px;
  }

  #utility {
    top: -50px;
    right: -260px;
  }

  #utility2 {
    top: -50px;
    right: -260px;
  }

  #wheels {
    bottom: -300px;
    right: -290px;
  }

  #wheels2 {
    bottom: -300px;
    right: -290px;
  }

  #show-list #access {
    top: -400px;
    left: -600px;
  }

  #show-list #access2 {
    top: -400px;
    left: -600px;
  }

  #electrical {
    bottom: -75px;
    right: -200px;
  }

  #electrical2 {
    bottom: -75px;
    right: -200px;
  }

  #scale {
    bottom: -30px;
    left: -500px;
  }

  #scale2 {
    bottom: -30px;
    left: -500px;
  }

  .menu-toggle {
    flex: 0 0 auto;
    width: 40px;
    height: 40px;
    // cursor: pointer;
    position: relative;
  }

  .hamburger,
  .cross {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .hamburger span {
    display: block;
    width: 18px;
    height: 2px;
    margin-bottom: 3px;
    overflow: hidden;
    position: relative;
  }

  .hamburger span:last-child {
    margin: 0;
  }

  .hamburger span:before,
  .hamburger span:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgb(15, 15, 15);
    transform: translateX(-200%);
    transition: transform ease 300ms;
  }

  .hamburger span:after {
    transform: translateX(0);
  }

  .hamburger span:nth-child(2):before,
  .hamburger span:nth-child(2):after {
    transition-delay: 75ms;
  }

  .hamburger span:last-child:before,
  .hamburger span:last-child:after {
    transition-delay: 150ms;
  }

  .menu-toggle:hover .hamburger span:before {
    transform: translateX(0);
  }

  .menu-toggle:hover .hamburger span:after {
    transform: translateX(200%);
  }

  .menu-toggle.active .hamburger span:before {
    transform: translateX(100%);
  }

  .menu-toggle.active .hamburger span:after {
    transform: translateX(200%);
  }

  .cross span {
    display: block;
    width: 18px;
    height: 2px;
    background-color: rgb(15, 15, 15);
    transform: translateY(50%) rotate(45deg) scaleX(0);
    transition: transform ease 200ms;
  }

  .cross span:last-child {
    transform: translateY(-50%) rotate(-45deg) scaleX(0);
  }

  .menu-toggle.active .cross span {
    transition-delay: 450ms;
    transform: translateY(50%) rotate(45deg) scaleX(1);
  }

  .menu-toggle.active .cross span:last-child {
    transform: translateY(-50%) rotate(-45deg) scaleX(1);
  }
</style>
