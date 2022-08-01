export type Frontmatter = {
  path: string
  title: string
  description?: string
  draft?: boolean
  priority?: number
  [key: string]: unknown
}

export type MenuItem = {
  name: string
  slug: string
  sub: MenuItem[]
  open: boolean
}

export type MenuInfo = {
  path: string
  name: string
  title: string
  priority: number
}

export type MenuData = {
  [key: string]: MenuInfo
}

export {}
