<script setup>
const router = useRouter();

const emit = defineEmits(["update"]);

const props = defineProps({
  duration: {
    type: Number,
    default: 1200,
  },
  ease: {
    type: String,
    default: "easeInOutQuart",
  },
  disable: {
    type: Boolean,
    default: false,
  },
});

const state = reactive({
  sections: [],
  currentSection: 0,
  isScrolling: false,
  direction: "diown",
});

window.addEventListener("wheel", function (event) {
  if (state.isScrolling || props.disable) return;
  const delta = Math.sign(event.deltaY);
  if (delta > 0 && state.currentSection < state.sections.length - 1) {
    emit("update", {
      activeSection: state.currentSection + 1,
      direction: "down",
    });
    scrollToSection(state.currentSection + 1);
    updateHash(state.sections[state.currentSection + 1].id);
  } else if (delta < 0 && state.currentSection > 0) {
    emit("update", {
      activeSection: state.currentSection - 1,
      direction: "up",
    });
    scrollToSection(state.currentSection - 1);
    updateHash(state.sections[state.currentSection - 1].id);
  }
});

function updateHash(hash) {
  setTimeout(() => {
    router.push({ hash: `#${hash}`, params: { savePosition: true } });
  }, props.duration);
}

function scrollToSection(index) {
  const targetSection = state.sections[index];
  const targetPosition = targetSection.offsetTop;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = props.duration;
  let startTimestamp = null;

  const scrollStep = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = timestamp - startTimestamp;
    window.scrollTo(
      0,
      timing[props.ease](progress, startPosition, distance, duration)
    );
    if (progress < duration) {
      window.requestAnimationFrame(scrollStep);
    } else {
      state.isScrolling = false;
      state.currentSection = index;
    }
  };

  state.isScrolling = true;
  window.requestAnimationFrame(scrollStep);
}

function scrollById(id) {
  updateHash(id);
  const index = Array.from(state.sections).findIndex((s) => s.id === id);
  emit("update", {
    activeSection: index,
  });
  state.currentSection = index;
  scrollToSection(index);
}

defineExpose({ scrollById });

const timing = {
  linear: (t, b, c, d) => {
    return (c * t) / d + b;
  },
  easeInOutQuad: (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  },
  easeInOutCubic: (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
  },
  easeOutExpo: (t, b, c, d) => {
    return c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
  },
  easeInOutCirc: (t, b, c, d) => {
    // cubic-bezier(0.85, 0, 0.15, 1)
    t /= d / 2;
    if (t < 1) return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b;
    t -= 2;
    return (c / 2) * (Math.sqrt(1 - t * t) + 1) + b;
  },
  easeInOutQuart: (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t * t + b;
    t -= 2;
    return (-c / 2) * (t * t * t * t - 2) + b;
  },
  easeOutQuart: (t, b, c, d) => {
    t /= d;
    t--;
    return -c * (t * t * t * t - 1) + b;
  },
  easeOutQuad: (t, b, c, d) => {
    t /= d;
    return -c * t * (t - 2) + b;
  },
  easeOutQuint: (t, b, c, d) => {
    t /= d;
    t--;
    return c * (t * t * t * t * t + 1) + b;
  },
  easeOutCubic: (t, b, c, d) => {
    t /= d;
    t--;
    return c * (t * t * t + 1) + b;
  },
};

onMounted(() => {
  const container = document.getElementById("fullscreen");
  state.sections = container.querySelectorAll("section");
  const initialSection = state.sections[0];
  initialSection.classList.add("active-section");
});
</script>

<template>
  <div id="fullscreen">
    <slot />
  </div>
</template>

<style>
body {
  overflow: hidden;
}
section {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
