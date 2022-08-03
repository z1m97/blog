<template>
  <div ref="root" class="w-full aspect-3/2">
    <!-- <div v-for="items in "></div> -->
  </div>
</template>

<script lang="ts" setup>
  import { Viewer } from '../cubic'

  const props = defineProps<{
    builder?: Viewer
  }>()

  const root = ref<HTMLDivElement>()

  const viewer = props.builder || new Viewer()

  onMounted(() => {
    viewer.init(root.value)
  })
</script>
