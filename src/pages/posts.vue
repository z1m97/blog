<template>
  <template v-if="indexPage">
    <div bg-white border-b border-light-700 py-20 px-6 md:px-12>
      <div relative w-full max-w-6xl mx-auto>
        <samp class="text-xl font-medium">CODE & LIFE & CREATE</samp>
        <div class="cross-pattern-bg absolute -top-12 -bottom-12 left-24 right-0 opacity-20"></div>
      </div>
    </div>
    <PostList />
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
