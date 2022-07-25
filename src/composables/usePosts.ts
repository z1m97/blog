import type { Frontmatter } from '#/common'

export function usePosts(type?: string) {
  const router = useRouter()
  const posts: Frontmatter[] = router.getRoutes()
    .filter(i => i.path.startsWith('/posts/'))
    .map(i => ({
      path: i.path,
      title: i.meta.frontmatter.title,
      description: i.meta.frontmatter.description
    }))

  return { posts }
}