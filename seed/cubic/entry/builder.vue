<template>
  <div>
    <CubicViewer v-bind="{ builder }" />
  </div>
</template>

<script lang="ts" setup>
  import CubicViewer from './viewer.vue'
  import { Builder } from '../cubic'

  const builder = new Builder()
</script>
