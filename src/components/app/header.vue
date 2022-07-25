<template>
  <header class="absolute w-full bg-white dark:bg-gray-800">
    <div class="flex items-center justify-between w-full h-18 px-6 md:px-12 transition-[shadow,top] duration-300 border-b border-light-700">
      <router-link to="/">
        <a aria-label="home" className="font-bold text-lg md:text-xl">
          {{ logo }}
        </a>
      </router-link>
      <nav class="flex items-center">
        <ul class="hidden md:inline-block">
          <li v-for="link in links" :key="link.name" class="inline-block ml-5">
            <router-link 
              :to="link.path"
              :class="isActiveRoute(link.path)? '!text-white !bg-gray-700' : 'text-gray-700'"
              class="font-bold p-1 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300">
              {{link.name}}
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup>
const route = useRoute()

const isActiveRoute = (path: string) => {
  return path === '/' ? route.path === '/' : route.path.startsWith(path)
}

const logo = `Z1M's SPACE`

const links = [
  { name: 'Home', path: '/' },
  { name: 'Posts', path: '/posts/' },
  { name: 'Gallary', path: '/gallary/' },
  { name: 'Bookmarks', path: '/bookmarks/' },
  { name: 'About', path: '/about/' },
]
</script>