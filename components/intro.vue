<script setup>
const state = reactive({
  init: false,
  ready: false,
  clicked: false,
  hovering: false,
});

onMounted(() => {
  setTimeout(() => {
    state.init = true;
    state.hovering = true;
  }, 400);
  setTimeout(() => {
    state.ready = true;
    state.clicked = true;
  }, 5000);
});

function handleClick() {
  state.clicked = true;
}
</script>

<template>
  <main
    class="w-screen h-screen flex flex-col justify-center items-center duration-[4s]"
    :class="`
      ${!state.ready ? 'pointer-events-none' : ''}
      ${!state.init ? 'scale-[18]' : 'scale-[1.5]'}
    `"
  >
    <!-- <div
      class="card border-black border-[0px] hover:border-[34px] hover:border-white active:scale-[0.95]"
    ></div> -->
    <div
      v-show="!state.clicked"
      @click="handleClick"
      id="wrapper"
      class="group flex justify-center items-center w-[123px] h-[123px] cursor-pointer"
    >
      <div
        class="card bg-black h-[120px] w-[120px] duration-[5s]"
        :class="state.hovering || state.clicked ? '!h-[55px] !w-[55px]' : ''"
      ></div>
    </div>

    <div
      id="step2"
      v-show="state.clicked"
      class="absolute w-[118px] h-[118px] duration-[300ms] rotate grow"
    >
      <div class="absolute">
        <svg
          width="118"
          height="118"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M100 0C44.7715 0 0 44.7715 0 100C0 155.228 44.7715 200 100 200C155.228 200 200 155.228 200 100C200 44.7715 155.228 0 100 0ZM100 55.2504C75.2855 55.2504 55.2504 75.2855 55.2504 100C55.2504 124.715 75.2855 144.75 100 144.75C124.715 144.75 144.75 124.715 144.75 100C144.75 75.2855 124.715 55.2504 100 55.2504ZM200 99.8385H144.749C144.749 99.8923 144.75 99.9461 144.75 100C144.75 124.715 124.715 144.75 100 144.75C99.9461 144.75 99.8923 144.749 99.8385 144.749V200C99.8923 200 99.9461 200 100 200C155.228 200 200 155.228 200 100C200 99.9461 200 99.8923 200 99.8385Z"
            fill="white"
          />
        </svg>
      </div>
      <div class="absolute bottom-0 right-0 detatch">
        <svg
          width="59"
          height="59"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M99.9999 2.41118e-06L44.8384 0C44.8386 0.0537423 44.8387 0.107507 44.8387 0.161294C44.8387 24.836 24.8359 44.8387 0.16129 44.8387C0.107505 44.8387 0.0537411 44.8386 0 44.8384V99.9999C0.0537535 100 0.107517 100 0.16129 100C55.3007 100 100 55.3007 100 0.161294C100 0.10752 100 0.0537562 99.9999 2.41118e-06Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    </div>
    <div class="absolute w-screen h-screen duration-[5s] z-[-2] bg-black"></div>
  </main>
</template>

<style lang="scss">
@property --rotate {
  syntax: "<angle>";
  initial-value: 132deg;
  inherits: false;
}

main {
  transition-timing-function: cubic-bezier(0.85, 0, 0.15, 1);
}

.detatch {
  animation: detatch 2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes final {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes rotate {
  0% {
    transform: rotate(90deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes detatch {
  0% {
    transform: translate(0px, 0px);
  }
  100% {
    transform: translate(18px, 18px);
  }
}

:root {
  --card-height: 120px;
  --card-width: 120px;
}

.card {
  position: relative;
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  font-size: 1.5em;
  color: rgb(88 199 250 / 0%);
  font-family: cursive;
  transition-timing-function: cubic-bezier(0.76, 0, 0.24, 1);
}

// #wrapper:hover .card:before {
//   filter: brightness(10) saturate(0) grayscale(1);
//   background: white;
// }

// #wrapper:hover .card:after {
//   animation-play-state: paused;
//   opacity: 0;
// }

.card::before {
  content: "";
  width: 118px;
  height: 118px;
  border-radius: 100%;
  background-color: white;
  background: white;
  // background-image: linear-gradient(
  //   var(--rotate),
  //   #5ddcff,
  //   #3c67e3 43%,
  //   #4e00c2
  // );
  position: absolute;
  z-index: -1;
  /* top: -1%; */
  /* left: -2%; */
  animation: spin 2.5s linear infinite;
  transition-duration: 1s;
}

// .card::after {
//   position: absolute;
//   content: "";
//   top: calc(var(--card-height) / 6);
//   left: 0;
//   right: 0;
//   z-index: -1;
//   height: 100%;
//   width: 100%;
//   margin: 0 auto;
//   transform: scale(0.8);
//   filter: blur(calc(var(--card-height) / 6)) contrast(0.6);
//   background-image: linear-gradient(
//     var(--rotate),
//     #5ddcff,
//     #3c67e3 43%,
//     #4e00c2
//   );
//   opacity: 1;
//   transition: opacity 0.5s;
//   animation: spin 2.5s linear infinite;
// }

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
