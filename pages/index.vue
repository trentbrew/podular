<script setup>
const router = useRouter();

const fullpage = ref(null);

const state = reactive({
  debug: false,
  ready: false,
  active: 0,
  progress: 0,
  direction: "down",
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

function parallax(index) {
  const fx = "filter: brightness(0.6);";
  const bgy = "background-size: 130%; background-position:";
  if (state.active < index) {
    return `${fx} ${bgy} 50% -50%`;
  }
  if (state.active == index) {
    return `${bgy} 50% 50%`;
  }
  if (state.active > index) {
    return `${fx} ${bgy} 50% 150%`;
  }
}

function animate(index, inactive, active) {
  if (state.active === index) return active;
  else return inactive;
}
</script>

<template>
  <Cursor />
  <div
    class="fixed bottom-16 right-16 z-50 duration-[500ms]"
    :class="
      state.active > 0
        ? 'translate-y-[0px] opacity-1 delay-[300ms]'
        : 'translate-y-[32px] opacity-0'
    "
  >
    <svg
      width="100"
      height="100"
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
  </div>

  <main v-scroll="handleScroll">
    <div
      v-show="state.ready"
      class="fixed m-auto left-0 top-0 bg-transparent h-[8px] rounded-full w-screen z-50 flex justify-start"
    >
      <div
        class="bg-white h-full rounded-full"
        :style="`width: ${state.progress}%`"
      ></div>
    </div>

    <div
      class="duration-[1s]"
      :class="
        animate(
          0,
          'scale-[0.9] opacity-0 translate-y-[-20px]',
          'delay-[1200ms]'
        )
      "
    >
      <Intro v-if="!state.debug" @ready="handleIntroReady" />
    </div>

    <FullPage
      ref="fullpage"
      @update="handleNewSection"
      :duration="1200"
      :disable="!state.ready"
      ease="easeInOutCubic"
    >
      <section
        id="home"
        class="fixed top-0 left-0 flex flex-col justify-center items-center -z-50"
      >
        <div
          class="absolute w-screen h-screen bg-transparent z-[100] flex justify-center items-end"
        >
          <!-- <Arrow class="scale-[1.5] translate-y-[60px]" /> -->
        </div>
        <video
          autoplay
          loop
          muted
          src="../assets/videos/landing.mov"
          class="object-cover w-screen h-screen duration-[1600ms]"
          :class="
            animate(
              0,
              'scale-[1] -translate-y-[5vh] brightness-[0.6]',
              'scale-[1.2]'
            )
          "
        />
      </section>
      <section id="about" class="flex bg-white">
        <div
          class="bg-[url('/assets/images/renders/about.jpg')] bg-no-repeat bg-cover bg-fixed duration-[4s] h-screen w-screen flex items-end justify-start"
          :style="parallax(1)"
          :class="animate(1, 'brightness-[0]', 'brightness-[1]')"
        >
          <div
            class="bg-white w-[50vw] h-fit rounded-3xl m-12 p-12 flex flex-col justify-start items-start duration-[1.2s]"
            :class="
              animate(1, 'translate-x-[0px]', 'translate-x-[0px] delay-[0.9s]')
            "
          >
            <div class="font-bold text-3xl mb-6">
              The perfect space solution
            </div>
            <!-- <div
              class="bg-black h-[2px] duration-[4s] mb-8 delay-[0.8s]"
              :class="animate(1, 'w-[0vw]', 'w-[42vw]')"
            ></div> -->
            <div class="flex flex-col gap-3">
              <span>
                Podular offers chic and customizable modular pods, providing a
                quick and effortless space solution to enhance both customer and
                worker experiences for pop-up food and beverage services.
              </span>
              <button
                @click="goTo('features')"
                class="hoverable w-fit bg-black text-white py-2 px-4 mt-4 rounded-full hover:bg-white hover:text-black border-2 border-black duration-[200ms]"
              >
                Explore features
              </button>
            </div>
          </div>
        </div>
      </section>
      <section id="features">
        <div
          class="bg-[url('/assets/images/renders/features.jpg')] bg-no-repeat bg-fixed w-screen h-screen duration-[4s] z-[-1]"
          :style="parallax(2)"
        ></div>
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
      <section id="contact" class="bg-black text-white">contact</section>
    </FullPage>
  </main>
</template>

<style lang="scss">
@keyframes bubble-enter {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

#feat-list,
#show-list {
  animation: bubble-enter 2s ease forwards;
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
  height: 32px;
  width: 32px;
  border-radius: 100%;
  z-index: 100;
}

#feat-list #access,
#feat-list #access2 {
  top: -50px;
  right: -480px;
}

#led,
#led2 {
  bottom: -385px;
  right: -500px;
}

#storage,
#storage2 {
  bottom: 0px;
  left: -75px;
}

#sink,
#sink2 {
  top: -200px;
  left: -360px;
}

#stove,
#stove2 {
  top: -170px;
  right: -270px;
}

#utility,
#utility2 {
  top: -50px;
  right: -260px;
}

#wheels,
#wheels2 {
  bottom: -300px;
  right: -290px;
}

#show-list #access,
#show-list #access2 {
  top: -400px;
  left: -600px;
}

#electrical,
#electrical2 {
  bottom: -75px;
  right: -200px;
}

#scale,
#scale2 {
  bottom: -30px;
  left: -500px;
}
</style>
