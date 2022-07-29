<template>
  <div class="flex flex-col">
    <router-link
      :to="data.path"
      :class="[isActive ? '!text-white !bg-gray-700' : 'text-gray-700']"
      class="text-sm cursor-pointer px-3 py-1 rounded-lg flex hover:bg-gray-200 transition-all duration-300 mb-1"
      @click="onClick"
    >
      <span>{{ data.title || slug }}</span>
      <span v-if="node.sub?.length"> ({{ node.sub?.length }})</span>

      <div class="h-5 aspect-1 bg-gray-600/20 ml-auto" @click.stop="onExpand"> </div>
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
  const open = data.open
  const slug = data.path.split('/').pop()

  const route = useRoute()
  const isActive = computed(() => data.path && route.path === data.path)

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
