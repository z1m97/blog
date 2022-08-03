<template>
  <template v-if="indexPage">
    <router-view />
  </template>

  <!-- 详情页 -->
  <PostDetail v-else>
    <router-view />
  </PostDetail>
</template>

<script setup lang="ts">
  const route = useRoute()
  const indexPage = computed(() => route.name === 'posts')
</script>
