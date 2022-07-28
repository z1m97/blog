<template>
  <div class="flex flex-col items-center">
    <CommonRadioGroup class="justify-center max-w-2/3" v-model="effect" :options="options" />
    <div class="flex items-center justify-center">
      <div
        class="w-20 h-20 bg-green-500"
        draggable="true"
        @dragstart="ondragstart"
        @dragend="ondragend"
      ></div>
      <div class="w-20 h-20 bg-blue-500 ml-4" @dragover="ondragover" @drop="ondrop"></div>
    </div>
    <CommonRadioGroup
      class="justify-center max-w-2/3"
      v-model="dropEffect"
      :options="dropOptions"
    />
  </div>
</template>

<script setup lang="ts">
  const keys: string[] = [
    'none',
    'copy',
    'copyLink',
    'copyMove',
    'link',
    'linkMove',
    'move',
    'all',
    'uninitialized',
  ]

  const effect = ref<string>(keys[0])
  const options = keys.map((i) => ({
    label: i,
    value: i,
  }))

  const dropKeys = ['none', 'copy', 'move', 'link']
  const dropOptions = dropKeys.map((i) => ({
    label: i,
    value: i,
  }))
  dropOptions.unshift({
    label: '不设置',
    value: 'unset',
  })
  const dropEffect = ref<string>('unset')

  const ondragstart = (evt: DragEvent) => {
    evt.dataTransfer.setData('text/plain', 'Text to drag')
    evt.dataTransfer.effectAllowed = effect.value as any
  }

  const ondragend = (evt: DragEvent) => {
    console.log('end', evt.dataTransfer)
  }

  const ondragover = (evt: DragEvent) => {
    // console.log('over', evt.dataTransfer)
    if (dropEffect.value !== 'unset') {
      evt.dataTransfer.dropEffect = dropEffect.value as any
    }
    evt.preventDefault()
  }

  const ondrop = (evt: DragEvent) => {
    console.log('drop', evt.dataTransfer)
  }
</script>
