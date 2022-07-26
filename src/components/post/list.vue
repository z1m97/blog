<template>
  <ul class="w-full grid max-w-4xl mx-auto py-10 grid-cols-2 lg:grid-cols-4 gap-4">
    <li v-for="post in posts" :key="post.path">
      <PostCard :post="post" />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { Frontmatter } from '#/common'

defineProps<{
  type?: string
}>()

const router = useRouter()
const posts: Frontmatter[] = router.getRoutes()
  .filter(i => i.path.startsWith('/posts/'))
  .map(i => ({
    path: i.path,
    title: i.meta.frontmatter.title,
    description: i.meta.frontmatter.description || i.meta.excerpt
  }))
</script>
