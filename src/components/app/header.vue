<template>
  <header class="absolute w-full bg-white">
    <div
      :class="{
        'md:border-b !border-light-700': !noBorder,
        'fixed -top-18 bg-white/60 backdrop-blur': !arrivedState.top,
        '!top-0': directionTop,
        shadow: !arrivedState.top && directionTop,
      }"
      class="flex border-transparent items-center justify-between w-full h-18 px-6 md:px-12 transition-[shadow,top] duration-300"
    >
      <router-link
        :to="{ name: 'home' }"
        aria-label="home"
        class="font-semibold text-lg md:text-xl"
      >
        {{ logo }}
      </router-link>
      <nav class="flex items-center">
        <ul class="hidden sm:inline-block">
          <li v-for="link in links" :key="link.name" class="inline-block ml-5">
            <router-link
              :to="{ name: link.pathname }"
              :class="isActiveRoute(link.pathname) ? '!text-white !bg-gray-700' : 'text-gray-700'"
              class="font-medium px-3 py-2 rounded-lg hover:bg-gray-100 transition-all-300"
            >
              {{ link.name }}
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup>
  const route = useRoute()
  const noBorder = computed(() => ['posts', 'garden'].indexOf(route.name as string) > -1)

  const isActiveRoute = (pathname: string) => {
    return pathname === 'index' ? route.path === '/' : route.path.startsWith('/' + pathname)
  }

  const logo = `Z1M's SPACE`

  const links = [
    // { name: 'Home', path: 'home' },
    { name: 'Posts', pathname: 'posts' },
    { name: 'Garden', pathname: 'garden' },
    { name: 'Bookmarks', pathname: 'bookmarks' },
    { name: 'About', pathname: 'about' },
  ]

  const { arrivedState, directions } = useScroll(window, {
    offset: { top: 72 },
  })

  const directionTop = ref<boolean>(false)

  watch(directions, () => {
    if (directions.top) {
      directionTop.value = true
    }
    if (directions.bottom) {
      directionTop.value = false
    }
  })
</script>
