<template>
<div class="flex flex-col">
  <router-link 
    :to="node.path"
    :class="isActiveRoute(node.path)? '!text-white !bg-gray-700' : 'text-gray-700'"
    class="text-sm cursor-pointer px-3 py-1 rounded-lg hover:bg-gray-200 transition-all duration-300 mb-1">
    {{ node.title || node.slug }}
  </router-link>

  <ul class="ml-4" v-if="node.sub?.length">
    <li v-for="item in node.sub" :key="item.path">
      <PostMenuItem :node="item" />
    </li>
  </ul>
</div>
</template>

<script setup lang="ts">
import type { PostMenuItem } from '#/common'
defineProps<{
  node: PostMenuItem
}>()

const route = useRoute()

const isActiveRoute = (path: string) => {
  return path && route.path === path
}
</script>

<script lang="ts">
export default {
  name: 'PostMenuItem'
}
</script>
