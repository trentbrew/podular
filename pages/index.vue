<script setup>
const router = useRouter();

const fullpage = ref(null);

const state = reactive({
  debug: false,
  menu: {
    hover: false,
    ghostHover: false,
    lock: false,
  },
  ready: false,
  active: 0,
  progress: 0,
  direction: "down",
  offset: {
    features: [0, 0],
    showroom: [0, 0],
  },
});

onMounted(() => {
  if (state.debug) state.ready = true;
});

watch(
  () => state.menu,
  (val) => {
    // console.log("menu state changed...", val);
  }
);

function goTo(section) {
  closeMenu();
  fullpage.value.scrollById(section);
}

function handleScroll(e) {
  state.progress = e.progress;
}

function handleNewSection(e) {
  state.active = e.activeSection;
  state.direction = e.direction;
}

function handleIntroReady(e) {
  state.ready = true;
}

function syncParallax(index) {
  if (state.active < index) return ["50vw", "-50vh"];
  if (state.active == index) return ["50vw", "50vh"];
  if (state.active > index) return ["50vw", "150vh"];
  return "";
}

function parallax(index) {
  const fx = "filter: brightness(0.6);";
  const bgy = "background-size: 130%; background-position:";
  if (state.active < index) return `${fx} ${bgy} 50% -50%`;
  if (state.active == index) return `${bgy} 50% 50%`;
  if (state.active > index) return `${fx} ${bgy} 50% 150%`;
}

function animate(index, inactive, active) {
  if (state.active === index) return active;
  else return inactive;
}

function handleMenuMouseOver() {
  state.menu.hover = true;
}

function handleMenuMouseLeave() {
  if (state.menu.ghostHover) return;
  state.menu.hover = false;
}

function overlay() {
  return state.menu.hover || state.menu.ghostHover
    ? "blur-xl brightness-[0.4]"
    : "";
}

function closeMenu() {
  state.menu.lock = true;
  setTimeout(() => {
    state.menu.lock = false;
  }, 600);
}
</script>

<template>
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
        ? `scale-[0.4] translate-x-[-150px] translate-y-[-40px] hoverable z-[100] pointer-events-none delay-[0ms] ${
            state.menu.hover ? '!duration-[1.2s]' : ''
          }`
        : ''
    }`"
  >
    <Intro @ready="handleIntroReady" />
  </div>
  <!-- MENU -->
  <div
    class="w-[50vw] h-screen fixed top-0 right-0 z-50 duration-[1.4s] flex items-center justify-end"
    style="transition: width 0s"
    :class="state.menu.lock ? 'pointer-events-none' : ''"
  >
    <div
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
          state.menu.ghostHover = true;
        }
      "
      @mouseleave="
        () => {
          state.menu.ghostHover = false;
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
      <!-- <li
        :class="
          state.active == 5 && !state.menu.lock
            ? 'active-link'
            : 'inactive-link'
        "
        @click="goTo('preorder')"
        class="hoverable podular-sans menu-item"
        style="animation-delay: 0.8s"
      >
        preorder
      </li> -->
    </ul>
  </div>

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
                quick and effortless space solution to enhance both customer and
                worker experiences for pop-up food and beverage services.
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
      <section id="features" :class="overlay()">
        <div
          class="bg-[url('/assets/images/renders/features.jpg')] bg-no-repeat bg-fixed w-screen h-screen duration-[5s] z-[-1]"
          :style="parallax(2)"
        ></div>
        <!-- <div class="w-screen h-screen bg-black"></div> -->
        <ul id="feat-list" class="absolute">
          <li id="access" class="hoverable feat"></li>
          <div class="feat" id="access2"></div>

          <li id="led" class="hoverable feat"></li>
          <div class="feat" id="led2"></div>

          <li id="sink" class="hoverable feat"></li>
          <div class="feat" id="sink2"></div>

          <li id="storage" class="hoverable feat"></li>
          <div class="feat" id="storage2"></div>

          <li id="stove" class="hoverable feat"></li>
          <div class="feat" id="stove2"></div>

          <li id="utility" class="hoverable feat"></li>
          <div class="feat" id="utility2"></div>

          <li id="wheels" class="hoverable feat"></li>
          <div class="feat" id="wheels2"></div>
        </ul>
      </section>
      <section id="showroom" :class="overlay()">
        <div
          class="bg-[url('/assets/images/renders/showroom.jpg')] bg-no-repeat bg-fixed w-screen h-screen duration-[4s]"
          :style="parallax(3)"
        ></div>
        <ul id="show-list" class="absolute">
          <li id="access" class="hoverable show"></li>
          <div class="show" id="access2"></div>
          <li id="electrical" class="hoverable show"></li>
          <div class="show" id="electrical2"></div>
          <li id="scale" class="hoverable show"></li>
          <div class="show" id="scale2"></div>
        </ul>
      </section>
      <!-- CONTACT PAGE -->
      <section id="contact" class="bg-black text-white" :class="overlay()">
        contact
      </section>
    </FullPage>
  </main>
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
  content: "";
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
  content: "";
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
