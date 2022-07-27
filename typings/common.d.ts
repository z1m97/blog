export type Frontmatter = {
  path: string
  title: string
  description?: string
  draft?: boolean
  [key: string]: unknown
}

export type PostMenuItem = {
  path: string
  title: string
  slug: string
  sub?: PostMenuItem[]
}

export {}