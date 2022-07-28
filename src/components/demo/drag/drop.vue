<template>
  <div class="flex items-center justify-center">
    <div class="w-20 h-20 bg-green-500" draggable="true"></div>
    <div class="droparea w-20 h-20 bg-blue-500 ml-4" @dragover="ondragover" @drop="ondrop"></div>
  </div>
</template>

<script lang="ts" setup>
  const ondragover = (evt: DragEvent) => {
    evt.preventDefault()
  }

  const ondrop = (evt: DragEvent) => {}
</script>

<style scoped>
  .droparea:-moz-drag-over {
    border: 3px solid black;
  }
</style>
