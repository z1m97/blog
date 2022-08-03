<template>
  <div class="p-3">
    <router-link :to="data.path" class="p-4 bg-white">
      {{ data.name }}
    </router-link>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    data: any
  }>()
</script>
