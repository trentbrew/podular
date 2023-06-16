<script setup></script>

<template>
  <main class="w-screen h-screen flex flex-col justify-center items-center">
    <!-- <div
      class="card border-black border-[0px] hover:border-[34px] hover:border-white active:scale-[0.95]"
    ></div> -->
    <div
      id="wrapper"
      class="group flex justify-center items-center w-[120px] h-[120px] cursor-pointer active:scale-[0.95] duration-[300ms]"
    >
      <div
        class="card bg-black h-[120px] w-[120px] group-hover:h-[55px] group-hover:w-[55px]"
      ></div>
    </div>
  </main>
</template>

<style lang="scss">
@property --rotate {
  syntax: "<angle>";
  initial-value: 132deg;
  inherits: false;
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
  transition: 500ms;
  transition-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
}

#wrapper:hover .card {
  transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
}

#wrapper:hover .card:before {
  filter: brightness(10) saturate(0) grayscale(1);
  background: white;
}

#wrapper:hover .card:after {
  animation-play-state: paused;
  opacity: 0;
}

.card::before {
  content: "";
  width: 123px;
  height: 123px;
  border-radius: 100%;
  background-color: white;
  background-image: linear-gradient(
    var(--rotate),
    #5ddcff,
    #3c67e3 43%,
    #4e00c2
  );
  position: absolute;
  z-index: -1;
  /* top: -1%; */
  /* left: -2%; */
  animation: spin 2.5s linear infinite;
  transition-duration: 1s;
}

.card::after {
  position: absolute;
  content: "";
  top: calc(var(--card-height) / 6);
  left: 0;
  right: 0;
  z-index: -1;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  transform: scale(0.8);
  filter: blur(calc(var(--card-height) / 6));
  background-image: linear-gradient(
    var(--rotate),
    #5ddcff,
    #3c67e3 43%,
    #4e00c2
  );
  opacity: 1;
  transition: opacity 0.5s;
  animation: spin 2.5s linear infinite;
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
