<template>
  <AppHeader class="z-999 h-18" />
  <main class="flex flex-col justify-center min-h-screen pt-18">
    <div v-if="isPostPage" class="flex bg-white w-full">
      <PostMenu class="w-72" />
      <div class="prose w-full max-w-3xl text-base prose-truegray p-10 relative mx-auto lg:mx-0">
        <div class="aspect-16/9 w-full bg-light-300 mb-10 border border-light-700 rounded overflow-hidden"></div>
        <h1>{{ frontmatter.title }}</h1>
        <article ref="content">
          <slot />
        </article>
      </div>
    </div>

    <slot v-else />

    <AppFooter />
  </main>
</template>

<script lang="ts" setup>
  import type { Frontmatter } from '#/common'

  defineProps<{
    frontmatter: Frontmatter
  }>()

  const router = useRouter()
  const route = useRoute()
  const content = ref<HTMLDivElement>()

  const isPostPage = computed(() => route.path.startsWith('/posts') && route.name !== 'posts')

  onMounted(() => {
    const navigate = () => {
      if (location.hash) {
        document
          .querySelector(decodeURIComponent(location.hash))
          ?.scrollIntoView({ behavior: 'smooth' })
      }
    }
    const handleAnchors = (event: MouseEvent & { target: HTMLElement }) => {
      const link = event.target.closest('a')
      if (
        !event.defaultPrevented &&
        link &&
        event.button === 0 &&
        link.target !== '_blank' &&
        link.rel !== 'external' &&
        !link.download &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey
      ) {
        const url = new URL(link.href)
        if (url.origin !== window.location.origin) return
        event.preventDefault()
        const { pathname, hash } = url
        if (hash && (!pathname || pathname === location.pathname)) {
          window.history.replaceState({}, '', hash)
          navigate()
        } else {
          router.push({ path: pathname, hash })
        }
      }
    }
    useEventListener(window, 'hashchange', navigate)
    useEventListener(content.value!, 'click', handleAnchors, { passive: false })
    navigate()
    setTimeout(navigate, 500)
  })
</script>
