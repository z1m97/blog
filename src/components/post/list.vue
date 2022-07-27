<template>
  <div class="py-6 md:py-12 w-full max-w-6xl mx-auto">
    <ul class="flex flex-wrap mb-8 -mx-4">
      <li 
        v-for="tag in lv1_list" 
        :key="tag.slug"
        :class="{
          '!bg-white shadow-common': activeSlug === tag.slug
        }"
        class="relative shadow-none rounded-lg hover:bg-gray-100 ml-4 mb-2 cursor-pointer text-sm transition-all duration-300"
      >
        <router-link class="w-full h-full p-3 block" :to="tag.slug? `?slug=${tag.slug}`: route.path">{{ tag.title }}</router-link>
      </li>
    </ul>
    <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <li v-for="post in posts" :key="post.path">
        <PostCard :post="post" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { Frontmatter } from '#/common'

defineProps<{
  type?: string
}>()

type FilterTag = {
  title: string
  slug: string
}

const router = useRouter()
const route = useRoute()
const activeSlug = computed(() => route.query.slug || '')

const posts: Frontmatter[] = router.getRoutes()
  .filter(i => i.path.startsWith('/posts/') && !i.meta.isEmpty && !i.meta.frontmatter.draft)
  .map(i => ({
    path: i.path,
    title: i.meta.frontmatter.title,
    description: i.meta.frontmatter.description || i.meta.excerpt
  }))

const lv1_list: FilterTag[] = router.getRoutes()
  .filter(i => i.path.startsWith('/posts/') && i.path.split('/').length === 3)
  .map(i => ({
    title: i.meta.frontmatter.title,
    slug: i.path.split('/').pop()
  }))
  
lv1_list.unshift({
    title: '全部',
    slug: ''
  })
</script>
