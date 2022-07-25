import fs from 'fs-extra'
import Pages from 'vite-plugin-pages'
import matter from 'gray-matter'
import { pathResolve } from '../utils'
import type { RouteMeta } from 'vue-router'
import generateSitemap from 'vite-plugin-pages-sitemap'

export function createPagePlugin() {
  const pagePlugin = Pages({
    extensions: ['vue', 'md'],
    pagesDir: 'src/pages',
    exclude: ['**/components/*.vue', '**/components/*.md'],
    onRoutesGenerated: routes => (generateSitemap({ routes })),
    extendRoute(route) {
      const path = pathResolve(route.component.slice(1))

      const md = fs.readFileSync(path, 'utf-8')
      const { data, excerpt } = matter(md, { excerpt_separator: '<!--end-->'})
      route.meta = Object.assign(route.meta || {}, { frontmatter: data, excerpt }) as RouteMeta
      
      return route
    },
  })

  return pagePlugin
}
