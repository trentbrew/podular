<script setup></script>

<template>
  <div class="aniWrap">
    <div class="mouse">
      <div class="scroller"></div>
    </div>
  </div>
</template>

<style>
.aniWrap {
  margin: 40px auto;
  display: block;
  width: 28px;
}

.mouse {
  width: 28px;
  height: 50px;
  border: 2px solid white;
  border-radius: 14px;
}

.scroller {
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background: white;
  position: relative;
  top: 10px;
  left: 10px;
  animation: scrolls 1.3s ease-out infinite;
}

@keyframes scrolls {
  0% {
    top: 18px;
    opacity: 1;
    height: 4px;
  }
  95% {
    top: 5px;
    opacity: 0;
    height: 8px;
  }
  100% {
    top: 18px;
    opacity: 1;
    height: 4px;
  }
}
</style>
