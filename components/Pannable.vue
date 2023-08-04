<script setup>
  const props = defineProps({
    id: {
      type: String,
      default: 'pannable',
    },
    image: {
      type: String,
      default:
        'https://images.unsplash.com/photo-1578677103277-409d1213df61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1572&q=80',
    },
    pings: {
      type: Array,
      default: () => [],
    },
  })

  const state = reactive({
    hoveringPing: false,
    bufferHover: false,
    bufferLeave: false,
    hoverSrc: '',
  })

  const tiles = ref(null)
  const pings = ref(null)

  onMounted(() => {
    console.log('pings: ', props.pings)
    tiles.value = document.querySelectorAll(`.${props.id}-tile`)
    const tile = tiles.value[0]
    tile.addEventListener('mouseover', e => {
      tile.children[0].style.transform = `scale(${tile.dataset.scale})`
    })
    tile.addEventListener('mouseout', e => {
      tile.children[0].style.transform = `scale(1)`
    })
    tile.addEventListener('mousemove', e => {
      tile.children[0].style.transformOrigin = `${
        ((e.clientX - tile.offsetLeft) / tile.offsetWidth) * 100
      }% ${((e.clientY - tile.offsetTop) / tile.offsetHeight) * 100}%`
    })
  })

  function handlePingMouseEnter(e) {
    state.hoveringPing = true
  }

  function handlePingMouseLeave() {
    state.hoveringPing = false
  }

  function handleMouseMove(e) {
    console.log('hover src:', e.srcElement)
  }
</script>

<template>
  <div class="wrapper" @mousemove="handleMouseMove">
    <div class="tiles">
      <div class="tile" data-scale="1.8" :class="`${props.id}-tile`">
        <div class="photo" :style="`background-image: url(${props.image})`">
          <ul>
            <li
              v-for="(item, itemIndex) in props.pings"
              :key="itemIndex"
              class="bg-white h-8 w-8 rounded-full absolute animate-ping z-50"
              :class="`${props.id}-ping`"
              :style="`
              left: ${(item.coordinates[0] / 64) * 100}%;
              top: ${(item.coordinates[1] / 36) * 100}%;
            `"
            ></li>
            <li
              v-for="(item, itemIndex) in props.pings"
              :id="`ping-zone-${itemIndex}`"
              @mouseenter="handlePingMouseEnter"
              @mouseleave="handlePingMouseLeave"
              :key="itemIndex"
              class="bg-white h-8 w-8 rounded-full absolute z-50 duration-1000 hover:scale-[6] hover:shadow-xl hoverable"
              :class="`${props.id}-ping`"
              :style="`
              left: ${(item.coordinates[0] / 64) * 100}%;
              top: ${(item.coordinates[1] / 36) * 100}%;
            `"
            ></li>
          </ul>
        </div>
      </div>
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

  .title::after {
    content: 'hi 👋🏾';
    position: absolute;
    background: red;
    height: 200px;
    width: 200px;
  }

  .photo {
    position: absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    transition: transform 1s ease;
  }

  .x {
    font-size: 32px;
    line-height: 32px;
  }
</style>
