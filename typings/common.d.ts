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
  sub: MenuItem[]
}

export type MenuInfo = {
  path: string
  name: string
  title: string
  priority: number
  open: Ref<boolean>
}

export type MenuData = {
  [key: string]: MenuInfo
}

export {}
