<script setup>
  const router = useRouter()
  const route = useRoute()

  const pingCategory = computed(() => {
    return route.hash?.split('_')[0].substring(1) ?? ''
  })

  const pingContext = computed(() => {
    return route.hash?.split('_')[1] ?? ''
  })

  const pingDescription = computed(() => {
    if (pings[pingCategory.value]) {
      const ping = pings[pingCategory.value].find(
        ping => ping.id === pingContext.value
      )
      return ping?.description ?? ''
    }
    return ''
  })

  const fullpage = ref(null)

  const pings = {
    features: [
      {
        id: 'sink',
        title: 'Sink',
        category: 'features',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae diam euismod, aliquam odio vitae, ultricies nisl. Nulla facilisi. Sed euismod, nisl quis aliquet ultricies, nisl nisl aliquam odio, vitae ultricies nisl nisl vitae diam.',
        coordinates: [15, 12],
      },
      {
        id: 'storage',
        title: 'Storage',
        category: 'features',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae diam euismod, aliquam odio vitae, ultricies nisl. Nulla facilisi. Sed euismod, nisl quis aliquet ultricies, nisl nisl aliquam odio, vitae ultricies nisl nisl vitae diam.',
        coordinates: [29, 15],
      },
      {
        id: 'stove',
        title: 'Stove',
        category: 'features',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae diam euismod, aliquam odio vitae, ultricies nisl. Nulla facilisi. Sed euismod, nisl quis aliquet ultricies, nisl nisl aliquam odio, vitae ultricies nisl nisl vitae diam.',
        coordinates: [40, 10],
      },
      {
        id: 'utility',
        title: 'Utility',
        category: 'features',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae diam euismod, aliquam odio vitae, ultricies nisl. Nulla facilisi. Sed euismod, nisl quis aliquet ultricies, nisl nisl aliquam odio, vitae ultricies nisl nisl vitae diam.',
        coordinates: [41, 14],
      },
      {
        id: 'access',
        title: 'Access',
        category: 'features',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae diam euismod, aliquam odio vitae, ultricies nisl. Nulla facilisi. Sed euismod, nisl quis aliquet ultricies, nisl nisl aliquam odio, vitae ultricies nisl nisl vitae diam.',
        coordinates: [49, 16],
      },
      {
        id: 'wheels',
        title: 'Wheels',
        category: 'features',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae diam euismod, aliquam odio vitae, ultricies nisl. Nulla facilisi. Sed euismod, nisl quis aliquet ultricies, nisl nisl aliquam odio, vitae ultricies nisl nisl vitae diam.',
        coordinates: [44, 24],
      },
      {
        id: 'led',
        title: 'LED',
        category: 'features',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae diam euismod, aliquam odio vitae, ultricies nisl. Nulla facilisi. Sed euismod, nisl quis aliquet ultricies, nisl nisl aliquam odio, vitae ultricies nisl nisl vitae diam.',
        coordinates: [52, 28],
      },
    ],
    showroom: [
      {
        id: 'scale',
        title: 'Scale',
        category: 'showroom',
        coordinates: [9, 11],
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae diam euismod, aliquam odio vitae, ultricies nisl. Nulla facilisi. Sed euismod, nisl quis aliquet ultricies, nisl nisl aliquam odio, vitae ultricies nisl nisl vitae diam.',
      },
      {
        id: 'access',
        title: 'Access',
        category: 'showroom',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae diam euismod, aliquam odio vitae, ultricies nisl. Nulla facilisi. Sed euismod, nisl quis aliquet ultricies, nisl nisl aliquam odio, vitae ultricies nisl nisl vitae diam.',
        coordinates: [15, 18],
      },
      {
        id: 'electrical',
        title: 'Electrical',
        category: 'showroom',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae diam euismod, aliquam odio vitae, ultricies nisl. Nulla facilisi. Sed euismod, nisl quis aliquet ultricies, nisl nisl aliquam odio, vitae ultricies nisl nisl vitae diam.',
        coordinates: [36, 20],
      },
    ],
  }

  const state = reactive({
    debug: false,
    lightbox: {
      active: false,
      image: null,
      category: '',
      context: '',
      description: '',
    },
    featureContext: null,
    menu: {
      zone: [160, 160],
      open: false,
      hover: false,
      ghostHover: false,
      lock: false,
      ignore: false,
    },
    ready: false,
    active: 0,
    progress: 0,
    direction: 'down',
    offset: {
      features: [0, 0],
      showroom: [0, 0],
    },
  })

  onMounted(() => {
    router.push({ hash: '' })
    if (state.debug) state.ready = true
  })

  watch(
    () => state.menu,
    val => {
      console.log('menu state changed...', val)
    }
  )

  function goTo(section) {
    closeMenu()
    fullpage.value.scrollById(section)
  }

  function handleScroll(e) {
    state.progress = e.progress
  }

  function handleNewSection(e) {
    state.active = e.activeSection
    state.direction = e.direction
  }

  function handleIntroReady(e) {
    state.ready = true
  }

  function syncParallax(index) {
    if (state.active < index) return ['50vw', '-50vh']
    if (state.active == index) return ['50vw', '50vh']
    if (state.active > index) return ['50vw', '150vh']
    return ''
  }

  function parallax(index) {
    const fx = 'filter: brightness(0.6);'
    const bgy = 'background-size: 130%; background-position:'
    if (state.active < index) return `${fx} ${bgy} 50% -50%`
    if (state.active == index) return `${bgy} 50% 50%`
    if (state.active > index) return `${fx} ${bgy} 50% 150%`
  }

  function animate(index, inactive, active) {
    if (state.active === index) return active
    else return inactive
  }

  function handleMenuMouseOver(e) {
    state.menu.hover = true
  }

  function handleMenuMouseLeave() {
    if (state.menu.ghostHover) return
    state.menu.hover = false
  }

  function handleMenuZoneMouseOver(e) {}

  function handleMouseMove(e) {
    if (state.ready) {
      if ([2, 3].includes(state.active)) {
        if (
          e.clientX > window.innerWidth - state.menu.zone[0] &&
          e.clientY > window.innerHeight - state.menu.zone[1]
        ) {
          state.menu.zone = [window.innerWidth / 2, window.innerHeight]
          state.menu.lock = false
        } else {
          state.menu.zone = [160, 160]
          state.menu.lock = true
        }
      }
    }
  }

  function closeMenu() {
    state.menu.zone = [160, 160]
    state.menu.lock = true
    setTimeout(() => {
      state.menu.lock = false
    }, 600)
  }

  function overlay() {
    return state.menu.hover || state.menu.ghostHover
      ? 'blur-xl brightness-[0.4]'
      : ''
  }

  function openLightbox(image) {
    state.lightbox.image = image.src
    state.lightbox.category = image.category
    state.lightbox.context = image.id
    state.lightbox.description = pings[image.category][image.id]
    state.lightbox.active = true
    router.push({
      hash: `#${state.lightbox.category}_${image.id}`,
      query: { view: true },
    })
  }

  function closeLightbox() {
    router.push({ hash: `#${state.lightbox.category}` })
    state.lightbox.image = null
    state.lightbox.active = false
    state.lightbox.context = ''
    state.lightbox.description = ''
  }
</script>

<template>
  <div @mousemove="handleMouseMove">
    <Cursor />
    <!-- INTRO -->
    <div
      @click="state.active > 0 ? goTo('home') : () => {}"
      class="fixed top-0 left-0 origin-top-left z-[50] duration-[1.4s]"
      :style="`${
        state.menu.hover || state.menu.ghostHover
          ? 'transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1)'
          : 'transition-timing-function: cubic-bezier(0.65, 0, 0.35, 1)'
      }`"
      :class="`${
        state.active > 0 || state.menu.hover || state.menu.ghostHover
          ? `scale-[0.4] left-[-130px] top-[-30px] hoverable z-[100] pointer-events-none delay-[0ms] ${
              state.menu.hover ? '!duration-[1.2s]' : ''
            }`
          : ''
      }`"
    >
      <Intro @ready="handleIntroReady" />
    </div>
    <!-- LIGHTBOX -->
    <div
      :class="
        [2, 3].includes(state.active) &&
        (pingContext.length ||
          state.lightbox.context.length ||
          pingContext?.length ||
          pingDescription?.length)
          ? 'opacity-1'
          : 'opacity-0'
      "
      class="w-[100vw] p-16 h-[50vh] pb-12 flex flex-col justify-end items-start duration-[2s] fixed bottom-0 left-0 pointer-events-none z-[110]"
      style="background: linear-gradient(transparent, #000000dd)"
    >
      <div class="font-bold text-5xl text-white mb-6 podular-sans">
        {{ pingContext ?? state.lightbox.context }}
      </div>
      <div class="flex flex-col gap-3 text-white">
        <span class="text-lg max-w-[50vw] opacity-60">
          {{ pingDescription ?? state.lightbox.description }}
        </span>
      </div>
    </div>
    <div
      v-show="state.lightbox.active"
      class="hoverable shadow-lg z-[105] flex justify-center items-center rounded-full h-12 w-12 duration-150 fixed top-8 right-8 backdrop-invert backdrop-blur-xl"
      @click="closeLightbox"
    >
      <Icon class="pointer-events-none invert" name="close" />
    </div>
    <div
      class="h-screen w-full fixed top-0 left-0 z-[100] bg-black/90 backdrop-blur-lg flex justify-center items-center duration-300 pointer-events-none"
      :class="state.lightbox.active ? 'opacity-1' : 'opacity-0'"
    >
      <div
        class="bg-white h-screen w-screen rounded-[16px] bg-cover bg-center bg-no-repeat duration-[600ms]"
        :class="state.lightbox.active ? 'scale-1' : 'scale-[0.8]'"
        :style="`background-image: url(${
          state.lightbox.image ??
          'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcR0NrOJEpfjkM0zxD-aO9b-bWqW3mhY57jPMg3aSbxTYO__R4jOvx8T2Oa7Fm9yxXOGg4B_ns3SZaZGCiBOPQw'
        })`"
      ></div>
    </div>
    <!-- MENU -->
    <div
      id="menu-zone"
      class="w-[50vw] h-screen fixed top-0 right-0 z-50 duration-[1.4s] flex items-center justify-end"
      style="transition: width 0s"
      :class="state.menu.lock ? 'pointer-events-none' : ''"
      @mouseover="handleMenuZoneMouseOver"
    >
      <div
        id="menu"
        @mouseover="handleMenuMouseOver"
        @mouseleave="handleMenuMouseLeave"
        class="bg-white rounded-full h-[160px] w-[160px] fixed right-[-80px] bottom-[-80px] duration-[1.2s] z-[50]"
        :class="
          !state.ready
            ? 'right-[-200px] bottom-[-200px]'
            : state.menu.hover || state.menu.ghostHover
            ? 'scale-[10] translate-y-[-50vh]'
            : ''
        "
        style="transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1)"
      ></div>
      <div
        @click="closeMenu"
        class="absolute flex justify-center items-center w-[36px] h-[36px] bottom-3 right-3 z-[50] pointer-events-none"
        :class="!state.ready ? 'right-[-200px] bottom-[-200px]' : ''"
      >
        <div
          class="menu-toggle z-[100] duration-1000"
          :class="
            state.menu.hover || state.menu.ghostHover
              ? 'active'
              : !state.ready
              ? 'opacity-0'
              : ''
          "
        >
          <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="cross opacity-0">
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <ul
        @mouseover="
          () => {
            state.menu.ghostHover = true
          }
        "
        @mouseleave="
          () => {
            state.menu.ghostHover = false
          }
        "
        class="flex flex-col h-full items-center justify-center text-3xl gap-12 text-right pr-40 translate-x-[-80px] z-[50] duration-[200ms]"
        :class="
          state.menu.hover || state.menu.ghostHover
            ? 'opacity-1'
            : state.menu.lock
            ? 'opacity-0 translate-x-[200px] translate-y-[400px] scale-[0.3]'
            : 'hidden'
        "
      >
        <li
          :class="
            state.active == 0 && !state.menu.lock
              ? 'active-link'
              : 'inactive-link'
          "
          @click="goTo('home')"
          class="hoverable podular-sans menu-item"
          style="animation-delay: 0.3s"
        >
          home
        </li>
        <li
          :class="
            state.active == 1 && !state.menu.lock
              ? 'active-link'
              : 'inactive-link'
          "
          @click="goTo('about')"
          class="hoverable podular-sans menu-item"
          style="animation-delay: 0.4s"
        >
          about
        </li>
        <li
          :class="
            state.active == 2 && !state.menu.lock
              ? 'active-link'
              : 'inactive-link'
          "
          @click="goTo('features')"
          class="hoverable podular-sans menu-item"
          style="animation-delay: 0.5s"
        >
          features
        </li>
        <li
          :class="
            state.active == 3 && !state.menu.lock
              ? 'active-link'
              : 'inactive-link'
          "
          @click="goTo('showroom')"
          class="hoverable podular-sans menu-item"
          style="animation-delay: 0.6s"
        >
          showroom
        </li>
        <li
          :class="
            state.active == 4 && !state.menu.lock
              ? 'active-link'
              : 'inactive-link'
          "
          @click="goTo('contact')"
          class="hoverable podular-sans menu-item"
          style="animation-delay: 0.7s"
        >
          contact
        </li>
        <a href="#">
          <li
            :class="
              state.active == 5 && !state.menu.lock
                ? 'active-link'
                : 'inactive-link'
            "
            class="hoverable podular-sans menu-item"
            style="animation-delay: 0.8s"
          >
            preorder
          </li>
        </a>
      </ul>
    </div>
    <!-- PANNING -->
    <div class="h-screen w-full fixed left-0 top-0"></div>
    <!-- MAIN -->
    <main
      v-scroll="handleScroll"
      style="transition: 1.2s cubic-bezier(0.16, 1, 0.3, 1)"
    >
      <!-- PROGRESS -->
      <div
        v-show="state.ready"
        class="fixed m-auto left-0 top-0 bg-black/50 h-[4px] rounded-full w-screen z-50 flex justify-start"
      >
        <div
          class="bg-white h-full rounded-full"
          :style="`width: ${state.progress}%`"
        ></div>
      </div>
      <FullPage
        ref="fullpage"
        @update="handleNewSection"
        :duration="1200"
        :disable="!state.ready"
        ease="easeInOutCubic"
      >
        <!-- LANDING PAGE -->
        <section
          id="home"
          class="fixed top-0 left-0 flex flex-col justify-center items-center -z-50"
          :class="overlay()"
        >
          <div
            class="absolute w-screen h-screen bg-transparent z-[100] flex justify-center items-end"
          ></div>
          <video
            autoplay
            loop
            muted
            src="../assets/videos/landing.mp4"
            class="object-cover w-screen h-screen duration-[2.5s]"
            :class="
              animate(
                0,
                'scale-[1.5] -translate-y-[20vh] brightness-[0.4]',
                'scale-[1]'
              )
            "
          />
        </section>
        <!-- ABOUT PAGE -->
        <section id="about" class="flex mt-[100vh]" :class="overlay()">
          <div
            class="bg-[url('/assets/images/renders/about.jpg')] bg-no-repeat bg-cover bg-fixed duration-[4s] h-screen w-screen flex items-end justify-start"
            :style="parallax(1)"
            :class="animate(1, 'brightness-[0]', 'brightness-[1]')"
          >
            <div
              class="absolute w-screen h-screen backdrop-brightness-[0.75] z-[-1]"
            ></div>
            <div
              class="w-[100vw] p-16 pb-12 flex flex-col justify-end items-start duration-[2s]"
              style="background: linear-gradient(transparent, black)"
              :class="
                animate(
                  1,
                  'opacity-0 h-[30vh] delay-[5s]',
                  'opacity-1 h-[100vh] delay-[1.2s]'
                )
              "
            >
              <div class="font-bold text-5xl text-white mb-6 podular-sans">
                the perfect space solution
              </div>
              <div class="flex flex-col gap-3 text-white">
                <span class="text-lg max-w-[50vw] opacity-60">
                  Podular offers chic and customizable modular pods, providing a
                  quick and effortless space solution to enhance both customer
                  and worker experiences for pop-up food and beverage services.
                </span>
                <button
                  @click="goTo('features')"
                  class="hoverable w-fit bg-white font-bold text-lg text-black py-4 px-6 mt-6 rounded-full hover:bg-black hover:text-white border-2 border-white duration-[200ms]"
                >
                  Explore features
                </button>
              </div>
            </div>
          </div>
        </section>
        <!-- FEATURES PAGE -->
        <section
          id="features"
          :class="
            overlay() + state.active != 2
              ? ' brightness-[0.3]'
              : ' brightness-1'
          "
        >
          <div class="w-full h-full absolute duration-[2s]">
            <Pannable
              @ping="openLightbox"
              :pings="pings.features"
              class="duration-0"
              id="features"
              image="https://trentbrew.pockethost.io/api/files/swvnum16u65or8w/gcfp37v00ilzfl6/features_page_base_2_U0AoEhOwqX.jpg?token="
            />
          </div>
        </section>
        <!-- SHOWROOM PAGE -->
        <section
          id="showroom"
          :class="
            overlay() + state.active != 3
              ? ' brightness-[0.3]'
              : ' brightness-1'
          "
        >
          <div class="w-full h-full absolute">
            <Pannable
              @ping="openLightbox"
              :pings="pings.showroom"
              class="duration-0"
              id="showroom"
              image="https://trentbrew.pockethost.io/api/files/swvnum16u65or8w/5uacn4j78hcehva/showroom_base_w4cqlt8g0p.jpg?token="
            />
            <div
              class="w-[100vw] p-16 pb-12 flex flex-col justify-end items-start duration-[2s] absolute bottom-0 left-0 pointer-events-none"
            >
              <div class="font-bold text-5xl text-white mb-6 podular-sans">
                {{ pingContext }}
              </div>
              <div class="flex flex-col gap-3 text-white">
                <span class="text-lg max-w-[50vw] opacity-60">
                  {{ pingDescription }}
                </span>
              </div>
            </div>
          </div>
        </section>
        <!-- CONTACT PAGE -->
        <section id="contact" class="bg-black text-white" :class="overlay()">
          <Profile />
        </section>
      </FullPage>
    </main>
  </div>
</template>

<style lang="scss">
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
    opacity: 0;
    animation: menu-item-enter 600ms ease forwards;
  }

  section {
    @apply duration-[1.4s];
  }

  .active-link {
    @apply text-white flex items-center justify-end;
  }

  .active-link::before {
    content: '';
    position: absolute;
    height: 80px;
    width: 550px;
    border-radius: 200px;
    background: black;
    right: -300px;
    z-index: -1;
    transition: 300ms;
  }

  .inactive-link {
    @apply text-black duration-[300ms];
  }

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

  #stove {
    top: -170px;
    right: -270px;
  }

  #stove2 {
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
    cursor: pointer;
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
