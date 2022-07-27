<template>
  <div
    class="h-screen overflow-auto border-r border-light-700 inline-block sticky top-0 bg-light-300 hidden lg:block"
  >
    <ul class="my-6 px-3">
      <li v-for="item in viewList" :key="item.path">
        <PostMenuItem :node="item" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import type { Frontmatter, PostMenuItem } from '#/common'

  const router = useRouter()

  const viewList = router
    .getRoutes()
    .filter((i) => i.path.startsWith('/posts/'))
    .map((i) => ({
      path: i.path,
      title: i.meta.frontmatter.title,
    }))
    .reduce((val, cVal) => {
      const pathList = cVal.path.split('/').filter((t) => t && t !== 'posts')

      const sort = (idx: number, list: PostMenuItem[]) => {
        let item = list.find((e) => e.slug === pathList[idx])
        if (!item) {
          item = {
            path: '',
            title: '',
            slug: pathList[idx],
            sub: [],
          }
          list.push(item)
        }
        if (idx === pathList.length - 1) {
          Object.assign(item, cVal)
        } else {
          sort(idx + 1, item.sub)
        }

        return list
      }
      return sort(0, val)
    }, [] as PostMenuItem[])
</script>
