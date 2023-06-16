<script setup>
const state = reactive({
  exitPhase1: false,
  orb: {
    hovering: false,
    mouseDown: false,
    scale: 18,
    pointerEvents: "none",
  },
});
onMounted(() => {
  setTimeout(() => {
    // state.orb.scale = 1;
  }, 500);
  setTimeout(() => {
    state.orb.pointerEvents = "all";
  }, 6500);
});
function handleMouseIn() {
  console.log("hovering");
  state.orb.hovering = true;
}
function handleMouseOut() {
  console.log("not hovering");
  state.orb.hovering = false;
}
function handleMouseDown() {
  console.log("mouse down");
  state.orb.mouseDown = true;
}
function handleMouseUp() {
  console.log("mouse up");
  state.orb.mouseDown = false;
  triggerTransition();
}
function triggerTransition() {
  console.clear();
  console.log("moving on...");
  state.exitPhase1 = true;
}
</script>

<template>
  <div
    id="hole"
    class="bg-black w-[55px] h-[55px] rounded-full absolute m-auto left-0 top-0 right-0 bottom-0 z-50 duration-[0.6s] pointer-events-none backdrop-blur-3xl"
    :class="`${state.orb.hovering ? 'scale-[1] ' : 'scale-[0]'} ${
      state.orb.mouseDown ? 'scale-[1] !duration-[300ms]' : 'scale-[1]'
    }`"
    style="transition-timing-function: cubic-bezier(0.25, 1, 0.5, 1)"
  ></div>
  <main
    class="duration-[2s]"
    :class="state.orb.mouseDown ? 'scale-[1] !duration-[200ms]' : 'scale-[1]'"
    style="backdrop-filter: blur(24px)"
    :style="`pointer-events: ${state.orb.pointerEvents}; background: ${
      !state.orb.hovering ? '#000000ff' : '#000000ff'
    }`"
  >
    <div class="w-screen h-screen flex flex-col justify-center items-center">
      <div
        @mousedown="handleMouseDown"
        @mouseup="handleMouseUp"
        @mouseover="handleMouseIn"
        @mouseleave="handleMouseOut"
        class="duration-[600ms]"
        style="transition-timing-function: cubic-bezier(0, 0.55, 0.45, 1)"
      >
        <div
          id="wrapper"
          style="transition-timing-function: cubic-bezier(0.85, 0, 0.15, 1)"
          :style="`transform: scale(${state.orb.scale});`"
        >
          <div
            class="card"
            style="border: solid black"
            :style="
              !state.orb.hovering ? 'border-width: 62px' : 'border-width: 62px'
            "
          ></div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scss>
@property --rotate {
  syntax: "<angle>";
  initial-value: 132deg;
  inherits: false;
}

:root {
  --card-height: 123px;
  --card-width: 123px;
}

.card {
  width: var(--card-width);
  height: var(--card-height);
  position: relative;
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  font-size: 1.5em;
  color: rgb(88 199 250 / 0%);
  cursor: pointer;
  font-family: cursive;
}

#wrapper {
  transition: transform 5s;
}

.card:hover {
  color: rgb(88 199 250 / 100%);
  transition: color 1s;
}

.card:hover:after {
  /* animation: none; */
  transform: scale(0.6);
  opacity: 0;
  transition-delay: 1s;
  transition: 500ms;
}

.card:hover:before {
  transform: scale(0.6);
  opacity: 0;
  transition-delay: 1s;
  transition: 5000ms;
}

.card::before {
  content: "";
  width: 104%;
  height: 102%;
  border-radius: 100%;
  background-image: linear-gradient(
    var(--rotate),
    #5ddcff,
    #3c67e3 43%,
    #4e00c2
  );
  position: absolute;
  z-index: -1;
  top: -1%;
  left: -2%;
  animation: spin 4s linear infinite;
}

.card::after {
  position: absolute;
  content: "";
  top: calc(var(--card-height) / 10);
  left: 0;
  right: 0;
  z-index: -1;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  transform: scale(0.93);
  filter: blur(calc(var(--card-height) / 3));
  background-image: linear-gradient(
    var(--rotate),
    #5ddcff,
    #3c67e3 43%,
    #4e00c2
  );
  opacity: 1;
  transition: 2s cubic-bezier(0, 0.55, 0.45, 1);
  animation: spin 4s linear infinite;
}

.card::after:hover {
  /* opacity: 0; */
  /* transition: opacity 0.5s; */
}

@keyframes spin {
  0% {
    --rotate: 0deg;
  }
  100% {
    --rotate: 360deg;
  }
}

a {
  color: #212534;
  text-decoration: none;
  font-family: sans-serif;
  font-weight: bold;
  margin-top: 2rem;
}
</style>
