<script setup>
const state = reactive({
  xChild: 0,
  yChild: 0,
  xParent: 0,
  yParent: 0,
  hover: false,
  hideCursor: true,
});

const cursorCircle = computed(() => {
  return `transform: translateX(${state.xParent}px) translateY(${state.yParent}px) translateZ(0) translate3d(0, 0, 0);`;
});

const cursorPoint = computed(() => {
  return `transform: translateX(${state.xChild - 3}px) translateY(${
    state.yChild - 3
  }px) translateZ(0) translate3d(0, 0, 0);`;
});

function moveCursor(e) {
  state.xChild = e.clientX;
  state.yChild = e.clientY;
  setTimeout(() => {
    state.xParent = e.clientX - 20;
    state.yParent = e.clientY - 20;
  }, 100);
}

onMounted(() => {
  document.addEventListener("mouseover", (e) => {
    if (e.target.classList.contains("hoverable")) {
      state.hover = true;
    } else {
      state.hover = false;
    }
  });
  document.addEventListener("mousemove", moveCursor);
  document.addEventListener("mouseleave", (e) => {
    state.hideCursor = true;
  });
  document.addEventListener("mouseenter", (e) => {
    state.hideCursor = false;
  });
});
</script>

<template>
  <div
    :class="[
      'g-cursor',
      { 'g-cursor_hover': state.hover },
      { 'g-cursor_hide': state.hideCursor },
    ]"
  >
    <div :style="cursorCircle" class="g-cursor__circle"></div>
    <div class="g-cursor__point" ref="point" :style="cursorPoint"></div>
  </div>
</template>

<style lang="scss">
.g-cursor {
  position: absolute;

  &_hide {
    opacity: 0;
    width: 60px;
    height: 60px;
    transition: width 0.6s ease, height 0.6s ease, opacity 0.6s ease;
  }

  &__circle {
    pointer-events: none;
    user-select: none;
    top: 2px;
    left: 2px;
    position: fixed;
    width: 36px;
    height: 36px;
    background: white;
    mix-blend-mode: difference;
    //background: rgba(white,0.3);
    border-radius: 100%;
    z-index: 5555;
    backface-visibility: hidden;
    transition: margin 0.6s ease, opacity 0.6s ease, width 0.6s ease,
      height 0.6s ease;
  }

  &__point {
    top: 0;
    left: 0;
    position: fixed;
    width: 14px;
    height: 14px;
    margin-left: -4px;
    margin-top: -4px;
    pointer-events: none;
    user-select: none;
    border-radius: 100%;
    background: #fff;
    mix-blend-mode: difference;
    z-index: 55555555;
    backface-visibility: hidden;
    will-change: transform;
    transition: margin 0.4s ease, opacity 0.4s ease, width 0.4s ease,
      height 0.4s ease;
  }

  &_hover {
    .g-cursor__point {
      opacity: 0;
      width: 80px;
      height: 80px;
      margin-left: -42px;
      margin-top: -42px;
      background: white;
      mix-blend-mode: difference;
      background: rgba(white, 1);
      border-color: white;
      transition: margin 0.4s ease, width 0.4s ease, height 0.4s ease,
        opacity 0.4s ease, transform 0s;
    }

    .g-cursor__circle {
      opacity: 1;
      width: 74px;
      height: 74px;
      margin-left: -22px;
      margin-top: -22px;
      background: rgba(white, 1);
      border-color: transparent;
      transition: margin 0.4s ease, width 0.4s ease, height 0.4s ease,
        opacity 0.4s ease;
    }
  }
}
</style>
