<script setup>
const props = defineProps({
  duration: {
    type: Number,
    default: 1200,
  },
  easing: {
    type: String,
    default: "easeInOutQuart",
  },
});

const state = reactive({
  sections: [],
  currentSection: 0,
  isScrolling: false,
});

window.addEventListener("wheel", function (event) {
  if (state.isScrolling) return;
  const delta = Math.sign(event.deltaY);
  console.log(state.currentSection, state.sections.length - 1);
  if (delta > 0 && state.currentSection < state.sections.length - 1) {
    scrollToSection(state.currentSection + 1);
  } else if (delta < 0 && state.currentSection > 0) {
    scrollToSection(state.currentSection - 1);
  }
});

function scrollToSection(index) {
  console.log("scrollToSection", index);
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
      timing[props.easing](progress, startPosition, distance, duration)
    );
    if (progress < duration) {
      window.requestAnimationFrame(scrollStep);
    } else {
      state.currentSection = index;
      state.isScrolling = false;
    }
  };

  state.isScrolling = true;
  window.requestAnimationFrame(scrollStep);
}

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

#fullscreen {
  background: black;
}
section {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
}
section:nth-child(even) {
  background-color: #212121;
}
</style>
