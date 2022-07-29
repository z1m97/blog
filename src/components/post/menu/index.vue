<template>
  <div
    class="w-72 h-screen overflow-auto border-r border-light-700 inline-block sticky top-0 bg-light-300 hidden lg:block"
  >
    <ul class="my-6 px-3">
      <li v-for="item in reactiveList" :key="item.name">
        <PostMenuItem :node="item" :getData="getData" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import type { MenuItem, MenuData, MenuInfo } from '#/common'
  import { RouteRecordNormalized } from 'vue-router'

  const route = useRoute()
  const router = useRouter()
  const routes = router.getRoutes().filter((i) => i.path.startsWith('/posts/'))
  const validRoutes = routes
  // .filter((i) => !i.meta.isEmpty && !i.meta.frontmatter.draft)

  const data: MenuData = validRoutes
    .map((i) => ({
      path: i.path,
      name: i.name,
      title: i.meta.frontmatter.title,
      priority: i.meta.frontmatter.priority || 9999,
      open: ref<boolean>((route.name as string).startsWith(i.name as string)),
    }))
    .reduce((val: MenuData, cVal: MenuInfo) => {
      val[cVal.name] = cVal
      return val
    }, {} as MenuData)

  const getData = (name: string): MenuInfo => data[name]

  const menuList: MenuItem[] = validRoutes.reduce((val, cVal: RouteRecordNormalized) => {
    const pathList = cVal.path.split('/').filter((i) => i && i !== 'posts')
    const sort = (idx: number, list: MenuItem[]) => {
      const name = 'posts-' + pathList.slice(0, idx + 1).join('-')
      let item = list.find((i) => i.name === name)
      if (!item) {
        item = {
          name,
          sub: [],
        }
        list.push(item)
      }
      if (idx === pathList.length - 1) {
        list.sort((a, b) => data[a.name].priority - data[b.name].priority)
      } else {
        sort(idx + 1, item.sub)
      }
      return list
    }
    return sort(0, val)
  }, [] as MenuItem[])

  const reactiveList = reactive(menuList)
</script>
