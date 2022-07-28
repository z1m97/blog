<template>
  <div class="flex bg-white w-full">
    <PostMenu />
    <div
      class="prose w-full max-w-3xl text-base prose-truegray p-6 md:p-12 relative mx-auto lg:mx-0"
    >
      <div
        v-if="frontmatter.cover"
        class="aspect-16/9 w-full bg-light-300 mb-10 border border-light-700 rounded overflow-hidden"
      ></div>
      <h1>{{ frontmatter.title }}</h1>
      <article ref="content">
        <slot></slot>
      </article>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const route = useRoute()
  const router = useRouter()
  const content = ref<HTMLDivElement>()

  const frontmatter = computed(() => route.meta.frontmatter)

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
