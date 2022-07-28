export type Frontmatter = {
  path: string
  title: string
  description?: string
  draft?: boolean
  priority?: number
  [key: string]: unknown
}

export type PostMenuItem = {
  path: string
  title: string
  slug: string
  priority: number
  sub?: PostMenuItem[]
}

export {}
