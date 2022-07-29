<template>
  <div class="flex flex-col items-center">
    <CommonRadioGroup v-model="type" :options="options" />
    <div
      class="w-20 h-20 bg-green-500"
      @dragstart="ondragstart"
      @dragend="ondragend"
      draggable="true"
    ></div>
  </div>
</template>

<script setup lang="ts">
  enum feedType {
    image,
    canvas,
  }

  const type = ref<feedType>(feedType.image)
  const options = [
    { label: 'img', value: feedType.image },
    { label: 'canvas', value: feedType.canvas },
  ]

  let elm = null

  const set = () => {
    if (type.value === feedType.canvas) {
      elm = document.createElement('canvas')
      elm.width = 80
      elm.height = 80
      var ctx = elm.getContext('2d')
      ctx.lineWidth = 4
      ctx.strokeStyle = '#000000'
      ctx.moveTo(10, 10)
      ctx.lineTo(60, 60)
      ctx.moveTo(10, 60)
      ctx.lineTo(60, 10)
      ctx.stroke()
    } else if (type.value === feedType.image) {
      elm = document.createElement('img')
      elm.src = '/avatar.png'
      elm.className = 'w-20 h-20'
    }
  }

  // watchEffect(() => {})

  watch([type], () => {
    set()
  })

  onMounted(() => {
    set()
  })

  const ondragstart = (evt: DragEvent) => {
    document.documentElement.appendChild(elm)
    evt.dataTransfer.setDragImage(elm, 0, 0)
  }
  const ondragend = () => {
    document.documentElement.removeChild(elm)
  }
</script>
