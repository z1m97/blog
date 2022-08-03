<template>
  <router-link
    :to="post.path"
    class="md:shadow-card md:hover:shadow-card-hover hover:scale-102 w-full h-full bg-white rounded-lg flex flex-col overflow-hidden transition-all ease-in-out duration-300"
  >
    <div v-if="post.cover" class="w-full aspect-16/9 bg-light-700 overflow-hidden"></div>
    <div class="py-2 md:py-4 px-2 md:px-5">
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
