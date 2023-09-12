<script setup>
  const router = useRouter()
  const route = useRoute()

  const emit = defineEmits(['ping'])

  const iOS = () =>
    ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) ||
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)

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
    clicked: false,
    hoveringPing: false,
    bufferHover: false,
    bufferLeave: false,
    hoverSrc: '',
    view: false,
  })

  const tiles = ref(null)
  const pings = ref(null)

  const renders = {
    features: {
      latch:
        'https://trentbrew.pockethost.io/api/files/swvnum16u65or8w/z5reo1oqlaznfeo/features_latch_tGxZ6yXiQ2.jpg?token=',
      access:
        'https://trentbrew.pockethost.io/api/files/swvnum16u65or8w/z5reo1oqlaznfeo/features_access_ZgNUvMDLWQ.jpg?token=',
      led: 'https://trentbrew.pockethost.io/api/files/swvnum16u65or8w/z5reo1oqlaznfeo/features_led_C29MthT4O4.jpg?token=',
      sink: 'https://trentbrew.pockethost.io/api/files/swvnum16u65or8w/z5reo1oqlaznfeo/features_sink_RMks1p836A.jpg?token=',
      storage:
        'https://trentbrew.pockethost.io/api/files/swvnum16u65or8w/z5reo1oqlaznfeo/features_storage_tuoSPKJDmp.jpg?token=',
      cooktop:
        'https://trentbrew.pockethost.io/api/files/swvnum16u65or8w/z5reo1oqlaznfeo/features_stove_k1RnImOdBk.jpg?token=',
      utility:
        'https://trentbrew.pockethost.io/api/files/swvnum16u65or8w/z5reo1oqlaznfeo/features_utility_Or6A3Ycgwx.jpg?token=',
    },
    showroom: {
      access:
        'https://trentbrew.pockethost.io/api/files/swvnum16u65or8w/5uacn4j78hcehva/showroom_access_Dpz1zPmH4T.jpg?token=',
      electrical:
        'https://trentbrew.pockethost.io/api/files/swvnum16u65or8w/5uacn4j78hcehva/showroom_electrical_3N9lcpKqbs.jpg?token=',
      scale:
        'https://trentbrew.pockethost.io/api/files/swvnum16u65or8w/5uacn4j78hcehva/showroom_scale_yuLw55agv3.jpg?token=',
    },
  }

  onMounted(() => {
    tiles.value = document.querySelectorAll(`.${props.id}-tile`)
    const tile = tiles.value[0]
    if (!iOS()) {
      tile.addEventListener('mouseover', e => {
        tile.children[0].style.transform = `scale(${tile.dataset.scale})`
      })
      tile.addEventListener('mouseout', e => {
        tile.children[0].style.transform = `scale(1)`
      })
      tile.addEventListener('mousemove', e => {
        tile.children[0].style.transformOrigin = `${((e.clientX - tile.offsetLeft) / tile.offsetWidth) * 100}% ${
          ((e.clientY - tile.offsetTop) / tile.offsetHeight) * 100
        }%`
      })
    }
  })

  watch(
    () => route.query.view,
    val => {
      state.view = val
    }
  )

  function updateHash(category) {
    router.push({ hash: `#${category}` })
  }

  function handlePingMouseEnter(e, category, id) {
    if (iOS()) return
    state.hoveringPing = true
    if (route.query.view) return
    router.push({ hash: `#${category}_${id}` })
  }

  function handlePingMouseLeave(e, category) {
    if (iOS()) return
    state.hoveringPing = false
    if (route.query.view) return
    router.push({ hash: `#${category}` })
  }

  function handleClick(item) {
    state.clicked = true
    emit('ping', {
      src: renders[item.category][item.id],
      category: item.category,
      id: item.id,
    })
  }
</script>

<template>
  <div class="wrapper" :style="`height: ${() => window.innerHeight}px`">
    <div class="tiles">
      <div class="tile" :data-scale="props.id == 'features' ? 1.1 : 1.3" :class="`${props.id}-tile`">
        <div class="photo" :style="`background-image: url(${props.image})`">
          <div
            class="bg-black w-full h-full absolute z-10 poitner-events-none duration-[600ms]"
            :style="`opacity: ${state.hoveringPing && !state.view ? 0.7 : 0.2};`"
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
              v-show="!state.view"
              v-for="(item, itemIndex) in props.pings"
              :id="`ping-zone-${itemIndex}`"
              @touchstart="e => updateHash(item.category)"
              @touchend="e => handleClick(item)"
              @mouseenter="e => handlePingMouseEnter(e, item.category, item.id)"
              @mouseleave="e => handlePingMouseLeave(e, item.category)"
              @click="handleClick(item)"
              :key="itemIndex"
              class="group bg-white h-8 w-8 rounded-[32px] absolute z-50 duration-[600ms]"
              :class="`${props.id}-ping ${
                !iOS()
                  ? 'hover:w-16 hover:scale-[6] hover:!rounded-[4px] hover:shadow-xl hoverable bg-cover bg-no-repeat bg-center active:scale-[5.6]'
                  : ''
              }`"
              :style="`
                left: ${(item.coordinates[0] / 64) * 100}%;
                top: ${(item.coordinates[1] / 36) * 100}%;
                background-image: url(${renders[item.category][item.id]});
                transition-timing-function: cubic-bezier(0.25, 1.1, 0.4, 1.1);
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
