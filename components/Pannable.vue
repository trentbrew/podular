<script setup>
const props = defineProps({
  id: {
    type: String,
    default: "pannable",
  },
  image: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1578677103277-409d1213df61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1572&q=80",
  },
});

const tiles = ref(null);

onMounted(() => {
  tiles.value = document.querySelectorAll(`.${props.id}-tile`);
  tiles.value.forEach((tile) => {
    tile.addEventListener("mouseover", () => {
      tile.children[0].style.transform = `scale(${tile.dataset.scale})`;
    });
    tile.addEventListener("mouseout", () => {
      tile.children[0].style.transform = `scale(1)`;
    });
    tile.addEventListener("mousemove", (e) => {
      tile.children[0].style.transformOrigin = `${
        ((e.clientX - tile.offsetLeft) / tile.offsetWidth) * 100
      }% ${((e.clientY - tile.offsetTop) / tile.offsetHeight) * 100}%`;
    });
    tile.innerHTML += `<div class="photo" style="background-image: url(${tile.dataset.image})"></div>`;
  });
});
</script>

<template>
  <div class="wrapper">
    <div ref="tiles" class="tiles">
      <div
        data-scale="1.6"
        class="tile"
        :class="`${props.id}-tile`"
        :data-image="props.image"
      ></div>
    </div>
  </div>
</template>

<style>
.wrapper {
  width: 100%;
  height: 100vh;
}

.tiles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.tile {
  position: relative;
  float: left;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.photo {
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: transform 0.5s ease-out;
}

.x {
  font-size: 32px;
  line-height: 32px;
}
</style>
