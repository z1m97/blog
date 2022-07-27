import type { Frontmatter } from './common'
declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    frontmatter: Frontmatter,
    excerpt?: string
    isEmpty?: boolean
  }
}

export {}
