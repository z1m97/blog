import fs from 'fs-extra'
import Pages from 'vite-plugin-pages'
import matter from 'gray-matter'
import { pathResolve } from '../utils'
import type { RouteMeta } from 'vue-router'

export function createPagePlugin() {
  const pagePlugin = Pages({
    extensions: ['vue', 'md'],
    pagesDir: 'src/packages',
    exclude: ['**/components/*.vue', '**/components/*.md'],
    extendRoute(route) {
      const path = pathResolve(route.component.slice(1))

      const md = fs.readFileSync(path, 'utf-8')
      const { data } = matter(md)
      route.meta = Object.assign(route.meta || {}, { frontmatter: data }) as RouteMeta

      return route
    },
  })

  return pagePlugin
}
