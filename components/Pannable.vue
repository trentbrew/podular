<script setup>
  const router = useRouter()

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

  const renders = {
    features: {
      wheels:
        'https://trentbrew.pockethost.io/api/files/swvnum16u65or8w/nnxq334eo7ugkqk/feature_wheels_Xb2ZfzARu9.jpg?token=',
      access:
        'https://trentbrew.pockethost.io/api/files/swvnum16u65or8w/7w2i7lflvnzfnsh/features_access_tmGnzqqtXi.jpg?token=',
      led: 'https://trentbrew.pockethost.io/api/files/swvnum16u65or8w/3d6ll0pih6hq9gh/features_led_oxDTvGZY2O.jpg?token=',
      sink: 'https://trentbrew.pockethost.io/api/files/swvnum16u65or8w/v4wim4knb84v7cm/features_sink_s7GXEY3pdf.jpg?token=',
      storage:
        'https://trentbrew.pockethost.io/api/files/swvnum16u65or8w/72u2jwt7rthybus/features_storage_dli5uI7jxK.jpg?token=',
      stove:
        'https://trentbrew.pockethost.io/api/files/swvnum16u65or8w/8beptzot2cxyygc/features_stove_5cOfcRcw3Q.jpg?token=',
      utility:
        'https://trentbrew.pockethost.io/api/files/swvnum16u65or8w/gcpt2r759je29jc/features_utility_c33EUYBsGt.jpg?token=',
    },
    showroom: {
      access:
        'https://trentbrew.pockethost.io/api/files/swvnum16u65or8w/jlqw9vqk2p4lf8b/showroom_access_5vUUE95LBu.jpg?token=',
      electrical:
        'https://trentbrew.pockethost.io/api/files/swvnum16u65or8w/g62h0u6dh5h5qgl/showroom_electrical_9S5N1IaX52.jpg?token=',
      scale:
        'https://trentbrew.pockethost.io/api/files/swvnum16u65or8w/p3dc6eqywawc6s1/showroom_scale_1JoRFquniq.jpg?token=',
    },
  }

  onMounted(() => {
    // console.log('pings: ', props.pings)
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

  function handlePingMouseEnter(e, category, id) {
    state.hoveringPing = true
    router.push({ hash: `#${category}_${id}` })
  }

  function handlePingMouseLeave(e, category) {
    state.hoveringPing = false
    router.push({ hash: `#${category}` })
  }

  function handleMouseMove(e) {}
</script>

<template>
  <div class="wrapper" @mousemove="handleMouseMove">
    <div class="tiles">
      <div class="tile" data-scale="1.4" :class="`${props.id}-tile`">
        <div class="photo" :style="`background-image: url(${props.image})`">
          <div
            class="bg-black w-full h-full absolute z-10 poitner-events-none duration-[600ms]"
            :style="`opacity: ${state.hoveringPing ? 0.7 : 0.2};`"
          ></div>
          <ul>
            <li
              v-for="(item, itemIndex) in props.pings"
              :key="itemIndex"
              class="bg-white h-8 w-8 rounded-full absolute animate-ping"
              :class="`${props.id}-ping`"
              :style="`
              left: ${(item.coordinates[0] / 64) * 100}%;
              top: ${(item.coordinates[1] / 36) * 100}%;
            `"
            ></li>
            <li
              v-for="(item, itemIndex) in props.pings"
              :id="`ping-zone-${itemIndex}`"
              @mouseenter="e => handlePingMouseEnter(e, item.category, item.id)"
              @mouseleave="e => handlePingMouseLeave(e, item.category)"
              :key="itemIndex"
              class="group bg-white h-8 w-8 rounded-[32px] absolute z-50 duration-[400ms] hover:w-16 hover:scale-[6] hover:!rounded-[4px] hover:shadow-xl hoverable bg-cover bg-no-repeat bg-center"
              :class="`${props.id}-ping`"
              :style="`
              left: ${(item.coordinates[0] / 64) * 100}%;
              top: ${(item.coordinates[1] / 36) * 100}%;
              background-image: url(${renders[item.category][item.id]});
              transition-timing-function: ease;
            `"
            >
              <div
                class="bg-white rounded-[32px] group-hover:!rounded-[4px] w-full h-full group-hover:!opacity-0 duration-[400ms] hoverable"
                style="transition-timing-function: ease"
              ></div>
            </li>
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

  .photo {
    position: absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    transition: transform 3s ease;
  }

  .x {
    font-size: 32px;
    line-height: 32px;
  }
</style>
