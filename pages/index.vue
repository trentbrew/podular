<script setup>
  const router = useRouter()
  const route = useRoute()

  const isMobile = window.innerWidth < 768

  console.log('isMobile', isMobile)

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
          "Podular features a food-grade sink within the pod's workspace, complete with a splash guard to meet regulatory standards and ensure a hygienic environment.",
        coordinates: [15, 12],
      },
      {
        id: 'storage',
        title: 'Storage',
        category: 'features',
        description:
          'The storage in Podular includes removable shelving with adjustable height functionality. This design ensures flexibility and optimal space utilization according to specific requirements. ',
        coordinates: [29, 15],
      },
      {
        id: 'stove',
        title: 'Stove',
        category: 'features',
        description:
          'Popular features a two-burner induction cooktop, expandable with additional units for diverse cooking needs.',
        coordinates: [40, 10],
      },
      {
        id: 'utility',
        title: 'Utility',
        category: 'features',
        description:
          'Podular incorporates a utility distribution for efficient resource allocation and management.',
        coordinates: [41, 14],
      },
      {
        id: 'access',
        title: 'Access',
        category: 'features',
        description:
          'Each Podular pod provides an accessible easy-to-move entry/exit section.',
        coordinates: [49, 16],
      },
      // {
      //   id: 'wheels',
      //   title: 'Wheels',
      //   category: 'features',
      //   coordinates: [44, 24],
      // },
      {
        id: 'led',
        title: 'LED',
        category: 'features',
        description:
          'Podular integrates contemporary LED lighting that can be remotely controlled to change colors, allowing for branding customization and creating a captivating ambiance.',
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
          'The design of each Podular pod is meticulously crafted, taking into consideration the ratio and relationship between its elements. This design approach harmonizes with the principles of human body geometry, ensuring ergonomic comfort and aesthetic cohesion. Each Podular pod spans around 12 feet in diameter and stands at approximately 44 inches in height.',
      },
      {
        id: 'access',
        title: 'Access',
        category: 'showroom',
        description:
          'Each Podular pod provides an accessible easy-to-move entry/exit section.',
        coordinates: [15, 18],
      },
      {
        id: 'electrical',
        title: 'Electrical',
        category: 'showroom',
        coordinates: [36, 20],
      },
    ],
  }

  const state = reactive({
    skipIntro: true,
    ready: false,
    active: 0,
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
  })

  onMounted(() => {
    router.push({ hash: '' })
    if (state.skipIntro) state.ready = true
  })

  watch(
    () => state.menu,
    val => {
      console.log('menu state changed...', val)
    }
  )

  function goTo(section) {
    closeMenu()
    console.log('state.active: ', state.active)
    fullpage.value.scrollById(section)
  }

  function handleScroll(e) {
    state.progress = e.progress
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
    const fx = 'filter: brightness(0.6);'
    const bgy = `background-size: ${isMobile ? 'cover' : '130%'};`
    if (state.active < index)
      return `${fx} ${bgy} background-position: 50% -50%;`
    if (state.active == index) return `${bgy} background-position: 50% 50%;`
    if (state.active > index)
      return `${fx} ${bgy} background-position: 50% 150%;`
  }

  function animate(index, inactive, active) {
    if (state.active === index) return active
    else return inactive
  }

  const eagerMenu = computed(() => {
    // return (state.menu.hover) && !state.menu.clicked
    return false
  })

  const activeMenu = computed(() => {
    // return (state.menu.hover || state.menu.ghostHover) && state.menu.clicked
    return false
  })

  function handleMenuMouseOver(e) {
    // state.menu.hover = true
  }

  function handleMenuMouseLeave() {
    // if (activeMenu) return
    // state.menu.hover = false
  }

  function handleMouseMove(e) {
    // if (state.ready) {
    //   if (/*[2, 3].includes(state.active)*/true) {
    //     if (
    //       e.clientX > window.innerWidth - state.menu.zone[0] &&
    //       e.clientY > window.innerHeight - state.menu.zone[1]
    //     ) {
    //       // state.menu.zone = [window.innerWidth / 2, window.innerHeight]
    //       // state.menu.lock = false
    //     } else {
    //       // state.menu.zone = [160, 160]
    //       // state.menu.lock = true
    //     }
    //   }
    // }
  }

  function handleMenuClick(e) {
    // state.menu.clicked = !state.menu.clicked
  }

  function closeMenu() {
    console.log('closing menu...')
    state.menu.mobile.active = false
  }

  function openMenu() {
    console.log('opening menu...')
    state.menu.mobile.active = true
  }

  function handleMobileMenuClick() {
    console.log('mobile menu clicked')
  }

  function overlay() {
    return activeMenu.value ? 'blur-xl brightness-[0.4]' : ''
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
    <Cursor v-if="!isMobile" />

    <!-- INTRO -------------------------------------------------------------->

    <div
      class="fixed top-0 left-0 origin-top-left z-[50] duration-[1.4s] pointer-events-none"
    >
      <Intro @ready="handleIntroReady" :skip="state.skipIntro" />
    </div>

    <!-- LIGHTBOX -------------------------------------------------------------->

    <div
      :class="
        [2, 3].includes(state.active) &&
        (pingContext.length ||
          state.lightbox.context.length ||
          pingContext?.length ||
          pingDescription?.length)
          ? 'opacity-100'
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
      class="hoverable shadow-lg z-[105] flex justify-center items-center rounded-full h-10 w-10 duration-150 fixed top-8 right-8 bg-white text-black"
      @click="closeLightbox"
    >
      <Icon class="pointer-events-none" size="18" name="close" />
    </div>
    <div
      class="h-screen w-full fixed top-0 left-0 z-[100] bg-black/90 backdrop-blur-lg flex justify-center items-center duration-300 pointer-events-none"
      :class="state.lightbox.active ? 'opacity-100' : 'opacity-0'"
    >
      <div
        class="bg-white h-full w-full rounded-[16px] bg-cover bg-center bg-no-repeat duration-[600ms]"
        :class="state.lightbox.active ? 'scale-1' : 'scale-[0.8]'"
        :style="`background-image: url(${
          state.lightbox.image ??
          'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcR0NrOJEpfjkM0zxD-aO9b-bWqW3mhY57jPMg3aSbxTYO__R4jOvx8T2Oa7Fm9yxXOGg4B_ns3SZaZGCiBOPQw'
        })`"
      ></div>
    </div>

    <!-- NAVIGATION -------------------------------------------------------------->

    <div
      v-if="isMobile && state.menu.mobile.active"
      id="mobile-menu-overlay"
      class="fixed top-0 left-0 z-[150] w-screen h-screen bg-black/75 backdrop-blur-3xl backdrop-saturate-150 flex flex-col justify-center items-center"
    >
      <div
        class="absolute top-0 left-0 w-full flex h-16 items-center justify-between pl-[20px] pr-4 box-border"
      >
        <div class="flex gap-[18px]">
          <svg
            class="opacity-30"
            width="34"
            height="34"
            viewBox="0 0 1299 1292"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1299 713L979.614 713C979.616 713.311 979.616 713.622 979.616 713.934C979.616 856.8 863.8 972.616 720.934 972.616C720.622 972.616 720.311 972.616 720 972.615V1292C720.311 1292 720.623 1292 720.934 1292C1040.19 1292 1299 1033.19 1299 713.934C1299 713.623 1299 713.311 1299 713Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M578.5 0C259.003 0 0 259.003 0 578.5C0 897.997 259.003 1157 578.5 1157C897.997 1157 1157 897.997 1157 578.5C1157 259.003 897.997 0 578.5 0ZM578.5 319.624C435.527 319.624 319.624 435.527 319.624 578.5C319.624 721.474 435.527 837.376 578.5 837.376C721.474 837.376 837.376 721.474 837.376 578.5C837.376 435.527 721.474 319.624 578.5 319.624ZM1157 577.565H837.375C837.376 577.877 837.376 578.188 837.376 578.5C837.376 721.474 721.474 837.376 578.5 837.376C578.188 837.376 577.877 837.376 577.565 837.375V1157C577.877 1157 578.188 1157 578.5 1157C897.997 1157 1157 897.997 1157 578.5C1157 578.188 1157 577.877 1157 577.565Z"
              fill="white"
            />
          </svg>
          <!-- <span class="podular-sans text-2xl opacity-100 translate-y-[1px]">
            podular
          </span> -->
        </div>
        <button
          @click="closeMenu"
          class="p-0 active:opacity-50 min-w-6 min-h-6 text-white"
        >
          <Icon name="close" size="36" class="pointer-events-none" />
        </button>
      </div>
      <ul
        class="absolute text-3xl flex flex-col justify-center items-center gap-6"
      >
        <li
          :class="
            state.active == 0 && !state.menu.lock
              ? 'active-link'
              : 'inactive-link'
          "
          @click="goTo('home')"
          class="hoverable menu-item"
          style="animation-delay: 0.4s"
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
          class="hoverable menu-item"
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
          class="hoverable menu-item"
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
          class="hoverable menu-item"
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
          class="hoverable menu-item"
          style="animation-delay: 0.7s"
        >
          contact
        </li>
      </ul>
      <div class="w-full p-4 box-border mt-auto font-bold">
        <a href="#" class="btn w-full bg-white text-black rounded-xl text-xl">
          pre-order
        </a>
      </div>
    </div>

    <!-- desktop nav -->

    <div class="fixed top-0 left-0 z-[40] p-0 w-screen">
      <div
        class="navbar w-full rounded-none duration-[500ms] border-b-[1.5px]"
        :class="
          state.active > 0
            ? 'bg-black/[0.2] backdrop-saturate-150 border-white/[0.15] backdrop-blur-2xl'
            : 'bg-transparent border-transparent'
        "
      >
        <div class="navbar-start pl-[64px]">
          <a
            class="duration-500 text-2xl text-white podular-sans translate-y-[-1px]"
            :class="
              state.active > 0 ? 'opacity-100' : 'opacity-0 -translate-x-2'
            "
          >
            podular
          </a>
        </div>
        <div class="navbar-center hidden lg:flex">
          <ul
            class="menu menu-horizontal duration-[1s] text-lg w-full z-[20] flex gap-[28px] items-center justify-center left-0 top-[58px]"
          >
            <li
              :class="
                state.active == 0 && !state.menu.lock
                  ? 'active-link'
                  : 'inactive-link'
              "
              @click="goTo('home')"
              class="hoverable menu-item"
              style="animation-delay: 0.4s"
            >
              home
              <!-- <div class="link-indicator"></div> -->
            </li>
            <li
              :class="
                state.active == 1 && !state.menu.lock
                  ? 'active-link'
                  : 'inactive-link'
              "
              @click="goTo('about')"
              class="hoverable menu-item"
              style="animation-delay: 0.4s"
            >
              about
              <!-- <div class="link-indicator"></div> -->
            </li>
            <li
              :class="
                state.active == 2 && !state.menu.lock
                  ? 'active-link'
                  : 'inactive-link'
              "
              @click="goTo('features')"
              class="hoverable menu-item"
              style="animation-delay: 0.5s"
            >
              features
              <!-- <div class="link-indicator"></div> -->
            </li>
            <li
              :class="
                state.active == 3 && !state.menu.lock
                  ? 'active-link'
                  : 'inactive-link'
              "
              @click="goTo('showroom')"
              class="hoverable menu-item"
              style="animation-delay: 0.6s"
            >
              showroom
              <!-- <div class="link-indicator"></div> -->
            </li>
            <li
              :class="
                state.active == 4 && !state.menu.lock
                  ? 'active-link'
                  : 'inactive-link'
              "
              @click="goTo('contact')"
              class="hoverable menu-item"
              style="animation-delay: 0.7s"
            >
              contact
              <!-- <div class="link-indicator"></div> -->
            </li>
          </ul>
        </div>
        <div class="navbar-end pr-2">
          <a
            v-if="!isMobile"
            class="btn btn-sm bg-white text-black hover:bg-transparent hover:border-white hoverable border-white border-[1.5px] hover:text-white rounded-full"
          >
            pre-order
          </a>
          <button
            v-else
            @click="openMenu"
            class="p-0 active:opacity-50 min-w-6 min-h-6 text-white"
          >
            <Icon
              name="menu_alt"
              size="36"
              class="scale-x-[-1] pointer-events-none"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- PANNING -------------------------------------------------------------->

    <div class="h-screen w-full fixed left-0 top-0"></div>

    <!-- MAIN -------------------------------------------------------------->

    <div
      class="fixed bottom-[20vh] left-0 justify-center md:justify-end md:bottom-12 md:right-16 md:left-auto z-[100] flex items-center gap-4 duration-[600ms] text-white w-full md:w-fit"
      :class="
        (isMobile ? [0, 1, 2, 3] : [0, 2, 3]).includes(state.active)
          ? 'opacity-0'
          : 'opacity-100'
      "
    >
      <a class="hoverable hover:opacity-100 md:opacity-50" href="#">
        <Icon class="pointer-events-none" name="instagram" />
      </a>
      <a class="hoverable hover:opacity-100 md:opacity-50" href="#">
        <Icon class="pointer-events-none" name="facebook_alt" />
      </a>
      <a class="hoverable hover:opacity-100 md:opacity-50" href="#">
        <Icon class="pointer-events-none" name="twitter" />
      </a>
      <a class="hoverable hover:opacity-100 md:opacity-50" href="#">
        <Icon class="pointer-events-none" name="linkedin" />
      </a>
    </div>

    <main
      class="bg-transparent"
      v-scroll="handleScroll"
      style="transition: 1.2s cubic-bezier(0.16, 1, 0.3, 1)"
    >
      <!-- PROGRESS -->
      <!-- <div
        v-show="state.ready"
        class="fixed m-auto left-0 top-0 bg-black/50 h-[4px] rounded-full w-screen z-50 flex justify-start"
      >
        <div
          class="bg-white h-full rounded-full"
          :style="`width: ${state.progress}%`"
        ></div>
      </div> -->

      <FullPage
        ref="fullpage"
        @update="handleNewSection"
        :duration="1200"
        :disable="!state.ready || state.menu.mobile.active"
        ease="easeInOutCubic"
      >
        <!-- LANDING PAGE -->
        <section
          id="home"
          class="fixed top-0 left-0 flex flex-col justify-center items-center -z-50"
          :class="overlay()"
        >
          <div
            class="absolute bg-black/25 w-screen h-screen z-[100] flex justify-center items-end text-white"
          >
            <div
              class="w-6 h-6 hoverable flex justify-center items-center absolute m-auto left-0 right-0 bottom-6"
            >
              <Icon
                :size="32"
                name="arrow_alt_down"
                class="animate-bounce pointer-events-none"
              />
            </div>
            <div
              id="wordmark"
              class="absolute duration-[1.5s]"
              :class="
                state.active > 0
                  ? 'top-[0vh] opacity-0 scale-[0.7]'
                  : 'top-[24vh] opacity-100 scale-[1]'
              "
            >
              <svg
                :width="isMobile ? 250 : 500"
                viewBox="0 0 2835 726"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1958 34.054C1958 15.2465 1973.22 0 1992 0V0C2010.78 0 2026 15.2465 2026 34.0541V525.946C2026 544.753 2010.78 560 1992 560V560C1973.22 560 1958 544.753 1958 525.946V34.054Z"
                  fill="white"
                />
                <path
                  d="M2695.51 526.886C2690.7 554.183 2669.84 559 2660.22 559C2608.88 559 2623.32 526.886 2621.71 343.837C2620.43 197.398 2742.04 164 2803 164L2803 228.228C2720.86 229.512 2695.51 306.982 2695.51 343.837C2695.51 395.494 2695.51 499.569 2695.51 526.886Z"
                  fill="white"
                />
                <path
                  d="M2771 196C2771 178.327 2785.33 164 2803 164V164C2820.67 164 2835 178.327 2835 196V196C2835 213.673 2820.67 228 2803 228V228C2785.33 228 2771 213.673 2771 196V196Z"
                  fill="white"
                />
                <path
                  d="M679.365 561C639.967 561 605.191 552.508 575.034 535.523C544.878 518.052 521.045 494.273 503.535 464.186C486.512 433.613 478 398.672 478 359.364C478 319.571 486.512 284.63 503.535 254.542C521.045 223.969 544.878 200.19 575.034 183.205C605.191 165.735 639.967 157 679.365 157C718.276 157 752.809 165.735 782.966 183.205C813.122 200.19 836.711 223.969 853.735 254.542C871.245 284.63 880 319.571 880 359.364C880 398.672 871.488 433.613 854.465 464.186C837.441 494.273 813.851 518.052 783.695 535.523C753.539 552.508 718.762 561 679.365 561ZM679.365 495.486C704.657 495.486 727.031 489.663 746.486 478.016C765.942 466.369 781.02 450.355 791.72 429.973C802.907 409.591 808.501 386.055 808.501 359.364C808.501 332.673 802.907 309.137 791.72 288.755C781.02 267.888 765.942 251.631 746.486 239.984C727.031 228.337 704.657 222.514 679.365 222.514C654.073 222.514 631.699 228.337 612.243 239.984C592.788 251.631 577.466 267.888 566.279 288.755C555.093 309.137 549.499 332.673 549.499 359.364C549.499 386.055 555.093 409.591 566.279 429.973C577.466 450.355 592.788 466.369 612.243 478.016C631.699 489.663 654.073 495.486 679.365 495.486Z"
                  fill="white"
                />
                <rect
                  x="1475"
                  y="165"
                  width="77"
                  height="193"
                  rx="38"
                  fill="white"
                />
                <rect
                  x="141"
                  y="495"
                  width="63"
                  height="63"
                  rx="31.5"
                  fill="white"
                />
                <rect
                  x="1152"
                  y="168"
                  width="61"
                  height="61"
                  rx="30.5"
                  fill="white"
                />
                <rect
                  x="2317"
                  y="492"
                  width="64"
                  height="64"
                  rx="32"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1839.34 203C1839.34 182.013 1822.33 165 1801.34 165H1800.34C1779.36 165 1762.34 182.013 1762.34 203V320C1762.34 321.885 1762.48 323.737 1762.74 325.548C1762.8 341.234 1762.84 359.176 1762.84 379.789C1762.84 417.492 1741.35 495.715 1657 496.5C1572.65 495.715 1551.5 417.492 1551.5 379.789C1551.5 340.401 1551.65 310.763 1551.78 287.992H1474.93C1474.92 293.32 1474.93 298.88 1474.93 304.681C1474.95 326.22 1474.97 351.091 1474.72 379.789C1473.43 527.065 1595.47 560.866 1657 560.992V560.992C1657.06 560.992 1657.11 560.992 1657.17 560.992C1657.23 560.992 1657.29 560.992 1657.34 560.992V560.992C1718.87 560.866 1840.92 527.065 1839.63 379.789C1839.38 351.092 1839.39 326.222 1839.41 304.683V304.681L1839.41 304.583C1839.41 298.817 1839.42 293.29 1839.42 287.992H1839.34V203Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.0109 715.28C17.1615 722.427 25.9806 726 36.4682 726C47.4325 726 56.2517 722.427 62.9256 715.28C69.5995 708.61 72.9365 700.034 72.9365 689.553V496.597C72.9576 496.623 72.9788 496.648 73 496.674V356.5V354H73.0085C73.1769 329.738 75.918 314.42 86.5227 295.066C97.487 274.58 112.503 258.619 131.572 247.185C151.117 235.274 172.807 229.318 196.642 229.318C220.955 229.318 242.645 235.274 261.713 247.185C280.782 258.619 295.798 274.58 306.762 295.066C318.203 315.076 323.924 337.945 323.924 363.673C323.924 388.924 318.203 411.792 306.762 432.279C295.798 452.289 280.782 468.25 261.713 480.16C242.645 491.595 224.312 497.5 200 497.5C191.052 497.5 181.934 496.668 173 495.023V558.075C185.111 560.58 197.727 561.802 210.944 561.631C245.744 561.631 276.968 553.055 304.617 535.903C332.266 518.275 353.956 494.692 369.688 465.153C385.896 435.138 394 401.311 394 363.673C394 326.034 385.181 292.208 367.543 262.192C350.381 232.177 327.022 208.594 297.466 191.442C267.91 173.814 234.302 165 196.642 165C159.459 165 126.09 173.814 96.5336 191.442C66.9776 208.594 43.6189 232.177 26.4573 262.192C9.29582 292.208 0.47671 326.034 0 363.673V689.553C0 700.034 3.33696 708.61 10.0109 715.28Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1346.14 11.7007C1339.1 4.56695 1330.42 1.00006 1320.09 1.00006C1309.29 1.00006 1300.61 4.56695 1294.03 11.7007C1287.46 18.3589 1284.17 26.9194 1284.17 37.3822V229.994C1284.12 229.923 1284.06 229.853 1284 229.782V346.281C1284.35 351.744 1284.5 357.32 1284.5 363C1284.5 388.682 1281.59 411.191 1270.79 431.166C1260 451.616 1245.21 467.548 1226.43 478.962C1207.18 490.851 1185.82 496.796 1162.35 496.796C1138.41 496.796 1117.05 490.851 1098.27 478.962C1079.49 467.548 1064.71 451.616 1053.91 431.166C1042.64 411.191 1037.01 388.363 1037.01 362.681C1037.01 337.476 1042.64 314.648 1053.91 294.197C1064.71 274.223 1079.49 258.291 1098.27 246.401C1116.54 235.298 1132.94 232.807 1156.04 229.297C1156.69 229.199 1157.34 229.1 1158 229C1166.41 227.721 1175.24 228.176 1184 229.827V168.229C1172.52 165.922 1160.61 164.82 1148.27 165.076C1114 165.076 1083.25 173.637 1056.02 190.758C1028.79 208.355 1007.43 231.896 991.942 261.382C975.981 291.344 968 325.11 968 362.681C968 400.253 976.685 434.019 994.054 463.981C1010.95 493.943 1033.96 517.484 1063.06 534.605C1092.17 552.202 1125.27 561 1162.35 561C1198.97 561 1231.83 552.202 1260.94 534.605C1290.04 517.484 1313.05 493.943 1329.95 463.981C1346.85 434.019 1355.53 400.253 1356 362.682V37.3822C1356 26.9194 1352.71 18.3589 1346.14 11.7007Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2215.16 534.314C2242.74 551.438 2273.88 560 2308.59 560C2322.66 560 2336.13 558.565 2349 555.694V493.382C2340.65 494.983 2331.94 495.784 2322.86 495.784C2299.08 495.784 2277.45 490.076 2257.95 478.659C2238.93 466.768 2223.72 450.832 2212.3 430.854C2201.37 410.4 2195.9 387.568 2195.9 362.357C2195.9 336.67 2201.37 313.838 2212.3 293.859C2223.72 273.405 2238.93 257.47 2257.95 246.054C2277.45 234.162 2299.08 228.216 2322.86 228.216C2347.11 228.216 2368.74 234.162 2387.76 246.054C2406.78 257.47 2421.76 273.405 2432.7 293.859C2443.63 313.838 2449.1 336.67 2449.1 362.357C2449.1 364.341 2449.07 366.311 2449 368.266V536.574C2450.66 540.715 2453.07 544.48 2456.23 547.87C2463.37 554.53 2472.16 557.859 2482.62 557.859C2493.09 557.859 2501.64 554.53 2508.3 547.87C2515.43 540.735 2519 531.935 2519 521.47V362.357C2519 324.778 2510.2 291.005 2492.61 261.038C2475.49 231.07 2452.19 207.524 2422.71 190.4C2393.23 172.8 2359.95 164 2322.86 164C2285.77 164 2252.25 172.8 2222.29 190.4C2192.81 207.524 2169.27 231.07 2151.68 261.038C2134.56 291.005 2126 324.778 2126 362.357C2126 399.935 2133.85 433.708 2149.54 463.676C2165.7 493.168 2187.58 516.714 2215.16 534.314Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
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
              style="background: linear-gradient(transparent, #000000dd)"
              :class="
                animate(
                  1,
                  'opacity-0 h-[30vh] delay-[5s]',
                  'opacity-100 h-[100vh] delay-[1.2s]'
                )
              "
            >
              <div class="font-bold text-4xl text-white mb-6 podular-sans">
                the perfect space solution
              </div>
              <div class="flex flex-col gap-3 text-white w-full">
                <span class="text-lg max-w-[45vw] opacity-40">
                  Podular presents a stylish and personalized modular pod,
                  offering swift and uncomplicated spatial solutions that
                  elevate the customer and employee experience in the food and
                  beverage industry.
                </span>
                <button
                  @click="goTo('features')"
                  class="hoverable flex gap-2 items-center w-fit bg-transparent text-white hover:bg-transparent py-3 px-4 pr-6 mt-6 rounded-full hover:border-white/40 hover:text-white duration-[300ms] border-[1.5px] border-white/20"
                >
                  <Icon
                    class="animate-bounce pointer-events-none"
                    name="arrow_alt_down"
                  />
                  explore features
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
              image="https://trentbrew.pockethost.io/api/files/swvnum16u65or8w/z5reo1oqlaznfeo/features_ao5Xejz8S5.jpg?token="
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
        <section
          id="contact"
          class="bg-black/25 backdrop-blur text-white"
          :class="overlay()"
        >
          <div
            class="w-full h-full justify-center flex md:flex-row flex-col gap-12 items-center text-center md:text-left md:m-auto z-[40]"
          >
            <div>
              <div
                class="absolute z-[-1] translate-x-[-143px] translate-y-[-145px] duration-[1.5s] delay-[800ms]"
                :class="
                  animate(
                    4,
                    'opacity-0 scale-[1.75]',
                    'opacity-[0.06] scale-[1]'
                  )
                "
              >
                <svg
                  width="500"
                  height="500"
                  viewBox="0 0 718 715"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M717.868 394.027L541.366 394.027C541.366 394.199 541.367 394.371 541.367 394.543C541.367 473.496 477.363 537.499 398.411 537.499C398.239 537.499 398.066 537.499 397.895 537.499V714.001C398.067 714.001 398.239 714.001 398.411 714.001C574.842 714.001 717.868 570.975 717.868 394.543C717.868 394.371 717.868 394.199 717.868 394.027Z"
                    fill="white"
                  />
                  <path
                    d="M0 319.697C0 143.133 143.133 0 319.697 0C496.089 0 639.116 142.854 639.394 319.181C639.395 319.353 639.395 319.525 639.395 319.697C639.395 319.525 639.395 319.353 639.394 319.181H462.76C462.76 319.353 462.761 319.525 462.761 319.697C462.761 319.577 462.76 319.456 462.76 319.335L462.76 319.181C462.481 240.407 398.537 176.634 319.697 176.634C240.686 176.634 176.634 240.686 176.634 319.697C176.634 398.537 240.407 462.481 319.181 462.76C319.302 462.76 319.423 462.76 319.543 462.761L319.697 462.761C319.525 462.761 319.353 462.76 319.181 462.76V639.394C319.353 639.395 319.525 639.395 319.697 639.395C319.525 639.395 319.353 639.395 319.181 639.394C142.854 639.116 0 496.089 0 319.697Z"
                    fill="white"
                  />
                  <path
                    d="M319.181 639.394C319.353 639.395 319.525 639.395 319.697 639.395C319.525 639.395 319.353 639.395 319.181 639.394Z"
                    fill="white"
                  />
                  <path
                    d="M639.395 319.697C639.395 319.525 639.395 319.353 639.394 319.181C639.395 319.353 639.395 319.525 639.395 319.697Z"
                    fill="white"
                  />
                </svg>
              </div>
              <img
                src="https://trentbrew.pockethost.io/api/files/swvnum16u65or8w/51arrah30qe27ve/contact_YOiKby9Gwc.png?token="
                alt="Jasna Ostojich"
                class="rounded-full object-cover w-[160px] h-[160px] border-4 border-white/25 md:text-left duration-[1s] delay-[500ms]"
                :class="
                  animate(4, 'opacity-0 scale-[0.9]', 'opacity-100 scale-[1]')
                "
              />
            </div>
            <div
              class="duration-[1.5s] delay-[1.7s]"
              :class="
                animate(
                  4,
                  'opacity-0 translate-x-[-42px]',
                  'opacity-100 translate-x-[0px]'
                )
              "
            >
              <h1 class="text-3xl md:text-5xl mb-4">Jasna Ostojich</h1>
              <p class="mb-2 text-lg md:text-xl">
                Founder & Executive President
              </p>
              <div class="flex flex-col mt-4">
                <a
                  class="hoverable underline flex items-center gap-4"
                  href="mailto:info@cafebellas.com"
                >
                  <Icon name="mail" />
                  <span class="hoverable opacity-60">info@cafebellas.com</span>
                </a>
                <span class="font-bold flex items-center justify-start gap-4">
                  <Icon name="phone" />
                  <a
                    href="tel:+18479220061"
                    class="my-2 underline hoverable opacity-60 font-normal"
                  >
                    +1 (847) 922 0061
                  </a>
                </span>
              </div>
            </div>
            <div
              class="w-full h-[100px] fixed bottom-0 flex flex-col justify-end items-start z-[30] duration-500"
              :class="
                state.active != 4
                  ? 'opacity-0 pointer-events-none'
                  : 'opacity-100'
              "
            >
              <div
                class="flex items-center w-full justify-between px-16 text-sm"
              >
                <div
                  class="w-full h-[120px] flex items-center justify-center md:justify-start flex-col md:flex-row"
                >
                  <span class="opacity-30 md:opacity-30">
                    3D Renders by
                    <a
                      class="underline hoverable"
                      href="https://studiolafa.design"
                    >
                      Lawan Alade-Fa
                    </a>
                  </span>
                  <span v-if="!isMobile">&nbsp;&nbsp;&nbsp;</span>
                  <span v-if="!isMobile" class="opacity-30 md:opacity-50">
                    |
                  </span>
                  <span v-if="!isMobile">&nbsp;&nbsp;&nbsp;</span>
                  <span class="opacity-30 md:opacity-30">
                    Web Design by
                    <a class="underline hoverable" href="https://trentbrew.com">
                      Trent Brew
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
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
    color: rgba(white, 0.4);
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
