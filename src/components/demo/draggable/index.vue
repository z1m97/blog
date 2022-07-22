<template>
<div class="demo-draggable" ref="root">
  <slot />
</div>
</template>

<script setup lang="ts">
import handlers from './handlers'

const root = ref<HTMLElement | null>(null)

onMounted(() => {
  Array.prototype.forEach.call(root.value.children || [], (elm: HTMLElement) => {
    elm.draggable = true
    Object.keys(handlers).forEach(evtType => useEventListener(elm, evtType, handlers[evtType]))
  })
})
</script>
