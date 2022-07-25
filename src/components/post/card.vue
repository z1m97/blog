<template>
  <router-link :to="post.path" class="border border-light-700 h-full w-full bg-white rounded-md flex flex-col overflow-hidden">
    <div class="w-full aspect-16/9 bg-light-400 overflow-hidden"></div>
    <div class="py-2 px-3 border-t border-light-700">
      <span class="text-sm">{{ post.title }}</span>
      <p class="text-xs break-all mt-1 opacity-60">{{ post.description }}</p>
    </div>
  </router-link>
</template>

<script lang="ts" setup>
  import type { Frontmatter } from '#/common'

  defineProps<{
    post: Frontmatter
  }>()
</script>
