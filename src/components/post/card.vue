<template>
  <router-link
    :to="post.path"
    class="shadow-card hover:shadow-card-hover hover:scale-102 h-full w-full bg-white rounded-md flex flex-col overflow-hidden transition-all ease-in-out duration-300"
  >
    <div class="w-full aspect-16/9 bg-light-700 overflow-hidden"></div>
    <div class="py-2 px-3">
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
