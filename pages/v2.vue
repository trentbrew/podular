<script setup>
import anime from "animejs/lib/anime.es.js";

const router = useRouter();

const state = reactive({
  debug: false,
  scrollTop: 0,
  progress: 0,
  ringBuffer: [0, 0],
  lock: false,
  direction: "down",
  sections: [],
  sectionElements: [],
  rawSectionElements: [],
  currentSection: 0,
});

onMounted(async () => {
  let elements = await document.getElementsByTagName("section");
  const els = Array.from(elements);
  state.rawSectionElements = els;
  // map each element's bounding rect to an object along with its id
  elements = els.map((el) => {
    const rect = el.getBoundingClientRect();
    return {
      id: el.id,
      top: rect.top,
      bottom: rect.bottom,
      height: rect.height,
    };
  });
  state.sectionElements = elements;
  state.sections = Array.from(elements).map((el) => el.id);
});

function handleScroll(e) {
  let scrollTop = e.target.scrollTop;
  let scrollHeight = e.target.scrollHeight;
  let clientHeight = e.target.clientHeight;
  state.scrollTop = scrollTop;
  state.progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
  state.ringBuffer[0] = state.ringBuffer[1];
  state.ringBuffer[1] = state.progress;
  // console.clear();
  if (state.ringBuffer[0] > state.ringBuffer[1]) {
    state.direction = "up";
  } else {
    state.direction = "down";
  }
  console.log(state.direction);
  if (state.direction == "up") {
    if (state.currentSection > 0 && !state.lock) {
      state.currentSection--;
    }
  } else {
    if (state.currentSection < state.sections.length - 1 && !state.lock) {
      state.currentSection++;
    }
  }
  if (!state.lock) {
    state.lock = true;
    console.log("scroll locked");
    setTimeout(() => {
      state.lock = false;
      console.log("scroll unlocked");
    }, 1200);
  }
}

function customEasing(progress) {
  const p0 = 0.25;
  const p1 = 0.1;
  const p2 = 0.25;
  const p3 = 1.0;
  const cubicBezier = (t, p0, p1, p2, p3) => {
    const tInv = 1 - t;
    return (
      p0 * tInv * tInv * tInv +
      p1 * 3 * t * tInv * tInv +
      p2 * 3 * t * t * tInv +
      p3 * t * t * t
    );
  };
  return cubicBezier(progress, p0, p1, p2, p3);
}

function smoothScroll(element, duration, easing) {
  console.log("smooth scrolling...");
  const start = state.scrollTop;
  const target = element.getBoundingClientRect().top + start;
  console.log("scrolling to: ", target);
  const startTime = performance.now();
  const scroll = (timestamp) => {
    const currentTime = timestamp - startTime;
    const progress = Math.min(currentTime / duration, 1);
    const easedProgress = easing(progress);
    window.scrollTo(0, start + (target - start) * easedProgress);
    if (currentTime < duration) {
      requestAnimationFrame(scroll);
    }
  };
  requestAnimationFrame(scroll);
}

function scrollTo(id) {
  const el = document.getElementById(id);
  el.scrollIntoView({ behavior: "smooth" });
  // smoothScroll(el, 700, customEasing);
  state.currentSection = state.sections.indexOf(id);
}

watch(
  () => state.currentSection,
  (val) => {
    scrollTo(state.sections[val]);
  }
);
</script>

<template>
  <progress
    class="absolute top-0 left-0 progress progress-primary w-full z-10"
    :class="state.progress === 100 ? 'progress-primary' : ''"
    :value="state.progress"
    max="100"
  ></progress>

  <div class="absolute left-16 top-16 flex items-center">
    <Title />
    <!-- <span class="countdown text-base-content font-mono text-6xl">
        <span :style="`--value: ${state.currentSection}`"></span>
      </span> -->
    <!-- <div
        class="duration-[2s]"
        :class="state.currentSection === -1 ? 'opacity-0' : 'opacity-1'"
      >
        <span class="text-xl text-base-300 mx-3">/</span>
        <span class="text-xl text-base-300">
          {{ state.sections.length - 1 }}
        </span>
      </div> -->
  </div>

  <div class="absolute top-16 right-16 dropdown dropdown-end cursor-pointer">
    <label tabindex="0" class="btn btn-ghost !px-4 cursor-pointer">
      <!-- <Icon name="dots_horizontal" /> -->
    </label>
  </div>

  <main
    v-on:scroll="handleScroll"
    :class="
      state.lock
        ? 'overflow-hidden pointer-events-none scroll'
        : 'overflow-y-auto snap-y snap-mandatory snap-center'
    "
  >
    <!-- INTRO -->

    <section id="intro">
      <h1 class="text-xl">This is section 1</h1>
      <button
        @click="scrollTo('farm')"
        class="btn btn-primary flex gap-2 pr-6 mt-4"
      >
        <!-- <Icon name="arrow_down" /> -->
        <span>Continue</span>
      </button>
    </section>

    <!-- FARM -->

    <section id="farm">
      <div class="w-[50%] gap-4">
        <h1 class="text-xl">This is section 2</h1>
        <div class="flex gap-4 mt-12 w-full justify-start">
          <button
            @click="scrollTo('intro')"
            class="btn btn-outline flex gap-2 pr-6"
          >
            <!-- <Icon name="arrow_up" /> -->
            <span>Back</span>
          </button>
          <button
            @click="scrollTo('cultivation')"
            class="btn btn-primary flex gap-2 pr-6"
          >
            <!-- <Icon name="arrow_down" /> -->
            <span>Continue</span>
          </button>
        </div>
      </div>
    </section>

    <!-- CULTIVATION -->

    <section id="cultivation">
      <div class="w-[50%] gap-4">
        <h1 class="text-xl">This is the 3rd section</h1>
        <div class="flex gap-4 mt-12 w-full justify-start">
          <button
            @click="scrollTo('farm')"
            class="btn btn-outline flex gap-2 pr-6"
          >
            <!-- <Icon name="arrow_up" /> -->
            <span>Back</span>
          </button>
          <button
            @click="scrollTo('sensors')"
            class="btn btn-primary flex gap-2 pr-6"
          >
            <!-- <Icon name="arrow_down" /> -->
            <span>Continue</span>
          </button>
        </div>
      </div>
    </section>

    <!-- SENSORS -->

    <section id="sensors">
      <div class="w-[74%]">
        <h1 class="text-xl">This is the fourth section</h1>
        <div class="w-full flex justify-between">
          <div class="flex gap-4 mt-8 w-full justify-start">
            <button
              @click="scrollTo('cultivation')"
              class="btn btn-outline flex gap-2 pr-6"
            >
              <!-- <Icon name="arrow_up" /> -->
              <span>Back</span>
            </button>
            <button @click="scrollTo('cultivars')" class="btn flex gap-2 pr-6">
              <!-- <Icon name="arrow_down" /> -->
              <span> Continue </span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- CULTIVARS -->

    <section id="cultivars">
      <div class="w-[74%] gap-4">
        <h1 class="text-xl">This is the 5th section</h1>
        <div class="flex w-full justify-between">
          <div class="flex gap-4 mt-12 w-full justify-start">
            <button
              @click="scrollTo('sensors')"
              class="btn btn-outline flex gap-2 pr-6"
            >
              <!-- <Icon name="arrow_up" /> -->
              <span>Back</span>
            </button>
            <button @click="scrollTo('done')" class="btn flex gap-2 pr-6">
              <!-- <Icon name="arrow_down" /> -->
              <span> Continue </span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->

    <footer id="done">
      <div class="w-[50%] gap-4">
        <div class="w-full">
          <h1 class="text-xl">You're all set!</h1>
          <div class="flex gap-4 mt-12 w-full justify-start">
            <button
              @click="scrollTo('cultivars')"
              class="btn btn-outline flex gap-2 pr-6"
            >
              <!-- <Icon name="arrow_up" /> -->
              <span>Back</span>
            </button>
            <button class="btn btn-primary flex gap-2 pr-6">
              <!-- <Icon name="check_alt" /> -->
              <span>Bye</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  </main>
</template>

<style scoped>
main {
  background: white;
  height: 100vh;
  /* scroll-snap-type: y mandatory;
  overflow-y: auto; */
  overflow-x: hidden;
}
section,
footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  width: 100vw;
  height: 100vh;
  scroll-snap-align: start;
}
section h1,
footer h1 {
  margin-bottom: 12rem;
  font-size: 48px;
  font-weight: bold;
}
section form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
