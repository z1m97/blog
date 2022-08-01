<template>
  <div
    :class="{
      '!-ml-64': !open,
    }"
    class="ml-0 w-72 h-screen border-r border-light-700 inline-block sticky top-0 z-10 bg-light-300 hidden lg:block transition-all ease-in-out duration-300"
  >
    <div
      class="text-gray-600/50 z-10 w-6 flex items-center justify-center aspect-1 bg-white absolute rounded-full border border-light-700 cursor-pointer right-0 top-12 transform translate-x-[50%]"
      @click="open = !open"
    >
      <uim:angle-right-b v-if="open" class="rotate-180 text-sm" />
      <gg-menu-left v-else class="text-xs" />
    </div>
    <ul
      class="relative z-0 py-6 px-3 h-screen overflow-auto opacity-100"
      :class="{ '!opacity-0 pointer-events-none !overflow-hidden': !open }"
    >
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
    }))
    .reduce((val: MenuData, cVal: MenuInfo) => {
      val[cVal.name] = cVal
      return val
    }, {} as MenuData)

  const getData = (name: string): MenuInfo => data[name]

  const open = ref<boolean>(true)

  const menuList: MenuItem[] = validRoutes.reduce((val, cVal: RouteRecordNormalized) => {
    const pathList = cVal.path.split('/').filter((i) => i && i !== 'posts')
    const sort = (idx: number, list: MenuItem[]) => {
      const name = 'posts-' + pathList.slice(0, idx + 1).join('-')
      let item = list.find((i) => i.name === name)
      if (!item) {
        item = {
          name,
          sub: [],
          slug: pathList.slice(0, idx + 1).slice(-1)[0],
          open: (route.name as string).startsWith(name as string),
        }
        list.push(item)
      }
      if (idx === pathList.length - 1) {
        list.sort((a, b) => data[a.name]?.priority - data[b.name]?.priority)
      } else {
        sort(idx + 1, item.sub)
      }
      return list
    }
    return sort(0, val)
  }, [] as MenuItem[])

  const reactiveList = reactive(menuList)
</script>
