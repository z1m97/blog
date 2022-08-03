<template>
  <div class="flex flex-col">
    <router-link
      :to="data?.path || route.path"
      :class="[isActive ? '!text-white !bg-gray-700' : 'text-gray-700']"
      class="text-sm cursor-pointer pl-7 pr-3 py-1 rounded-lg flex hover:bg-gray-200 transition-all-300 mb-1"
      @click="onClick"
    >
      <div
        v-if="node?.sub?.length"
        class="w-5 aspect-1 -ml-6 flex items-center justify-center hover:bg-gray-400/20 mr-1 rounded-lg"
        @click.stop.prevent="onExpand"
      >
        <uim:angle-right-b :class="open && 'rotate-90'" class="rotate-0 transition-all-300" />
      </div>
      <span>{{ data?.title || node.slug }}</span>
      <span class="ml-1 flex items-center justify-center font-mono text-xs" v-if="node.sub?.length">
        ({{ node.sub?.length }})
      </span>
    </router-link>

    <div v-show="open">
      <ul class="ml-4" v-if="node.sub?.length">
        <li v-for="item in node.sub" :key="item.name">
          <PostMenuItem :node="item" :getData="getData" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { MenuItem, MenuInfo } from '#/common'

  const props = defineProps<{
    node: MenuItem
    getData: (name: string) => MenuInfo
  }>()

  const data: MenuInfo = props.getData(props.node.name)

  const open = toRef(props.node, 'open')

  const route = useRoute()
  const isActive = computed(() => data?.path && route.path === data?.path)

  const onClick = () => {
    open.value = true
  }

  const onExpand = () => {
    open.value = !open.value
  }
</script>

<script lang="ts">
  export default {
    name: 'PostMenuItem',
  }
</script>
