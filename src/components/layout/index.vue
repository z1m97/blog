<template>
  <div class="layout">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    type?: LAYOUT_TYPES
  }>()
</script>
