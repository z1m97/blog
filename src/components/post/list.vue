<template>
  <ul class="w-full grid max-w-4xl mx-auto py-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <li v-for="post in posts" :key="post.path">
      <PostCard :post="post" />
    </li>
  </ul>
</template>

<script lang="ts" setup>
  import { usePosts } from '~/composables/usePosts'

  const props = defineProps<{
    type?: string
  }>()

  const { posts } = usePosts(props.type)
</script>
