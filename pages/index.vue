<script setup>
const router = useRouter();

const fullpage = ref(null);

const state = reactive({
  debug: false,
  menu: {
    hover: false,
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

function goTo(section) {
  fullpage.value.scrollById(section);
}

function handleScroll(e) {
  state.progress = e.progress;
}

function handleNewSection(e) {
  state.active = e.activeSection;
  state.direction = e.direction;
  console.log(state.active);
  console.log(state.direction);
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
  state.menu.hover = false;
}
</script>

<template>
  <Cursor />
  <!-- INTRO -->
  <div
    @click="state.active > 0 ? goTo('home') : () => {}"
    class="fixed top-0 left-0 origin-top-left duration-[1.8s] z-50"
    style="transition-timing-function: cubic-bezier(0.65, 0, 0.35, 1)"
    :class="
      state.active > 0
        ? 'scale-[0.4] translate-x-[-130px] translate-y-[-40px] hoverable'
        : ''
    "
  >
    <Intro @ready="handleIntroReady" />
  </div>
  <!-- LOGO -->
  <!-- <div
    class="fixed bottom-12 right-16 z-50 duration-[500ms]"
    :class="
      state.active > 0
        ? 'translate-y-[0px] opacity-1 delay-[300ms]'
        : 'translate-y-[32px] opacity-0'
    "
  >
    <svg
      width="80"
      height="80"
      viewBox="0 0 135 135"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M134.77 74.0625L101.618 74.0625C101.618 74.0948 101.618 74.1271 101.618 74.1594C101.618 88.9889 89.5963 101.01 74.7669 101.01C74.7345 101.01 74.7022 101.01 74.6699 101.01V134.162C74.7022 134.162 74.7345 134.162 74.7669 134.162C107.906 134.162 134.77 107.298 134.77 74.1594C134.77 74.1271 134.77 74.0948 134.77 74.0625Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M60.0998 0C26.9076 0 0 26.9076 0 60.0998C0 93.292 26.9076 120.2 60.0998 120.2C93.292 120.2 120.2 93.292 120.2 60.0998C120.2 26.9076 93.292 0 60.0998 0ZM60.0998 33.2054C45.2464 33.2054 33.2054 45.2464 33.2054 60.0998C33.2054 74.9532 45.2464 86.9942 60.0998 86.9942C74.9532 86.9942 86.9942 74.9532 86.9942 60.0998C86.9942 45.2464 74.9532 33.2054 60.0998 33.2054ZM120.2 60.0027H86.9941C86.9942 60.0351 86.9942 60.0674 86.9942 60.0998C86.9942 74.9532 74.9532 86.9942 60.0998 86.9942C60.0674 86.9942 60.0351 86.9942 60.0027 86.9941V120.2C60.0351 120.2 60.0674 120.2 60.0998 120.2C93.292 120.2 120.2 93.292 120.2 60.0998C120.2 60.0674 120.2 60.0351 120.2 60.0027Z"
        fill="white"
      />
    </svg>
  </div> -->
  <!-- MENU -->
  <div
    @mouseover="handleMenuMouseOver"
    @mouseleave="handleMenuMouseLeave"
    class="bg-white rounded-full h-[160px] w-[160px] fixed right-[-80px] top-[-80px] z-50 duration-[1.2s] hover:scale-[14] hover:translate-y-[50vh]"
    style="transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1)"
  ></div>
  <main
    v-scroll="handleScroll"
    class="duration-[1.2s]"
    :class="state.menu.hover ? 'brightness-[0.2] blur-lg saturate-200' : ''"
    style="transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1)"
  >
    <!-- PROGRESS -->
    <!-- <div
      v-show="state.ready"
      class="fixed m-auto left-0 top-0 bg-transparent h-[6px] rounded-full w-screen z-50 flex justify-start"
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
      :disable="!state.ready"
      ease="easeInOutCubic"
    >
      <!-- LANDING PAGE -->
      <section
        id="home"
        class="fixed top-0 left-0 flex flex-col justify-center items-center -z-50"
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
      <section id="about" class="flex mt-[100vh]">
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
            <div class="font-bold text-4xl text-white mb-6">
              The perfect space solution
            </div>

            <div class="flex flex-col gap-3 text-white">
              <span class="text-lg max-w-[50vw] opacity-60">
                Podular offers chic and customizable modular pods, providing a
                quick and effortless space solution to enhance both customer and
                worker experiences for pop-up food and beverage services.
              </span>
              <button
                @click="goTo('features')"
                class="hoverable w-fit bg-white font-bold text-black py-2 px-4 mt-6 rounded-full hover:bg-black hover:text-white border-2 border-white duration-[200ms]"
              >
                Explore features
              </button>
            </div>
          </div>
        </div>
      </section>
      <!-- FEATURES PAGE -->
      <section id="features">
        <!-- <div
          class="bg-[url('/assets/images/renders/features.jpg')] bg-no-repeat bg-cover bg-center bg-fixed w-screen h-screen duration-[5s] z-[-1]"
        ></div> -->
        <div class="w-screen h-screen bg-black"></div>
        <!-- <ul id="feat-list" class="absolute">
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
        </ul> -->
      </section>
      <section id="showroom">
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
      <section id="contact" class="bg-black text-white">contact</section>
    </FullPage>
  </main>
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
</style>
