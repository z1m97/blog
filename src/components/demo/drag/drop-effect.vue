<template>
  <div class="flex items-center justify-center">
    <div class="w-20 h-20 bg-green-500" draggable="true" @dragend="ondragend"></div>
    <div
      class="droparea w-20 h-20 ml-4"
      :class="`bg-${isOn ? 'red' : 'blue'}-500`"
      @dragover="ondragover"
      @dragenter="ondragenter"
      @dragleave="ondragleave"
    ></div>
  </div>
</template>

<script setup lang="ts">
  const ondragover = (evt: DragEvent) => {
    evt.preventDefault()
  }

  const isOn = ref<boolean>(false)

  const ondragenter = () => {
    isOn.value = true
  }
  const ondragleave = () => {
    isOn.value = false
  }
  const ondragend = () => {
    isOn.value = false
  }
</script>
