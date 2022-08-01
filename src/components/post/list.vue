<template>
  <div class="py-6 md:py-12 px-6 md:px-12">
    <div class="w-full max-w-6xl mx-auto">
      <ul class="flex flex-wrap mb-8 -mx-4">
        <li
          v-for="tag in lv1_list"
          :key="tag.slug"
          :class="{
            '!bg-white !shadow !-top-2px': activeSlug === tag.slug,
          }"
          class="relative shadow-none rounded-lg top-0 hover:bg-gray-100 ml-4 mb-2 cursor-pointer text-sm transition-all duration-300"
        >
          <router-link
            class="w-full h-full py-2 px-3 block font-medium"
            :to="tag.slug ? `?slug=${tag.slug}` : route.path"
          >
            <span>{{ tag.title }}</span>
            <span> ({{ tag.count }})</span>
          </router-link>
        </li>
      </ul>
      <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <li v-for="post in posts" :key="post.path">
          <PostCard :post="post" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { Frontmatter } from '#/common'
  import { ComputedRef } from 'vue'

  type FilterTag = {
    title: string
    slug: string
    count?: number
  }

  const route = useRoute()
  const activeSlug = computed(() => route.query.slug || '')
  const router = useRouter()
  const routes = router.getRoutes().filter((i) => i.path.startsWith('/posts/'))

  const validRoutes = routes.filter(
    (i) => i.path.startsWith('/posts/') && !i.meta.isEmpty && !i.meta.frontmatter.draft,
  )
  const validSlug = [...new Set(validRoutes.map((i) => i.path.split('/')[2]))]

  const posts: ComputedRef<Frontmatter[]> = computed(() => {
    return validRoutes
      .filter((i) => !activeSlug.value || activeSlug.value === i.path.split('/')[2])
      .map((i) => ({
        path: i.path,
        title: i.meta.frontmatter.title || i.path.split('/').pop(),
        description: i.meta.frontmatter.description || i.meta.excerpt,
      }))
  })

  const lv1_list: FilterTag[] = validSlug
    .map((i) => {
      const post_list = validRoutes.filter((t) => t.path.split('/')[2] === i)
      const lv1_route = routes.find((t) => t.name === `posts-${i}`)
      return {
        slug: i,
        title: lv1_route?.meta.frontmatter.title,
        priority: lv1_route?.meta.frontmatter.priority || 9999,
        count: post_list.length,
      }
    })
    .sort((a, b) => a.priority - b.priority)

  lv1_list.unshift({
    title: '全部',
    slug: '',
    count: validRoutes.length,
  })
</script>
