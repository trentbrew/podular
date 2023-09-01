<script setup>
  const emit = defineEmits(['ready'])

  const props = defineProps({
    skip: {
      type: Boolean,
      default: false,
    },
  })

  const state = reactive({
    skip: false,
    init: false,
    clicked: false,
    hovering: false,
    wordmarkReady: false,
    ready: false,
    next: false,
  })

  onMounted(() => {
    state.skip = props.skip
    if (state.skip) {
      state.init = true
      state.hovering = true
      state.ready = true
      state.clicked = true
      state.wordmarkReady = true
      state.next = true
      emit('ready', true)
    } else {
      setTimeout(() => {
        state.init = true
        state.hovering = true
      }, 400)
      setTimeout(() => {
        state.ready = true
        state.clicked = true
      }, 3500)
      setTimeout(() => {
        // state.wordmarkReady = true
        state.next = true
      }, 4500)
      setTimeout(() => {
        emit('ready', true)
      }, 5000)
      // setTimeout(() => {
      // }, 6000)
    }
  })
</script>

<template>
  <div class="duration-[2.5s] w-screen h-screen z-100">
    <main
      style="margin: auto; left: 0; right: 0; top: 0; bottom: 0"
      :style="state.skip ? 'transition-duration: 0s !important' : ''"
      class="absolute w-full h-full flex flex-col justify-center items-center duration-[2.5s]"
      :class="`${!state.init ? 'scale-[16]' : 'scale-[1]'}`"
    >
      <div
        v-show="!state.clicked"
        id="wrapper"
        class="group flex justify-center items-center w-[123px] h-[123px] cursor-pointer"
      >
        <div
          class="card bg-black h-[120px] w-[120px] duration-[3s]"
          :class="state.hovering || state.clicked ? '!h-[53px] !w-[53px]' : ''"
        ></div>
      </div>
      <!-- whole -->
      <div
        id="step2"
        v-show="state.clicked"
        class="absolute w-[118px] h-[118px] left-[calc(50vw-59px)] top-[calc(50vh-59px)] nudge"
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
        <!-- piece -->
        <div
          class="absolute bottom-0 right-0"
          :class="
            state.skip
              ? 'duration-0 translate-x-[18px] translate-y-[18px]'
              : 'detatch'
          "
        >
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
      <div
        class="absolute w-screen h-screen scale-[3] duration-[3s] z-[-2] delay-[1s]"
        :class="`
      ${state.ready ? 'bg-transparent' : 'bg-black'}
      `"
      ></div>
    </main>
  </div>
</template>

<style lang="scss">
  @property --rotate {
    syntax: '<angle>';
    initial-value: 132deg;
    inherits: false;
  }

  #step2 {
    transition: transform 1s;
  }

  main {
    transition-timing-function: cubic-bezier(0.85, 0, 0.15, 1);
  }

  .detatch {
    animation: detatch 4s cubic-bezier(0, 0.55, 0.45, 1) forwards;
  }

  .nudge {
    animation: nudge 3s cubic-bezier(0.85, 0, 0.15, 1) forwards 200ms;
  }

  @keyframes final {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes nudge {
    to {
      transform: scale(0.28);
      left: 12px;
      top: 10px;
      // filter: invert(1);
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
    color: rgb(88 199 250 / 0%);
    transition-timing-function: cubic-bezier(0.76, 0, 0.24, 1);
  }

  .card::before {
    content: '';
    width: 118px;
    height: 118px;
    border-radius: 100%;
    background-color: white;
    background: white;
    position: absolute;
    z-index: -1;
    animation: spin 2.5s linear infinite;
    transition-duration: 1s;
  }

  @keyframes spin {
    0% {
      --rotate: 0deg;
    }
    100% {
      --rotate: 360deg;
    }
  }
</style>
