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
      const { data, excerpt } = matter(md)

      // 有excerpt则覆盖desc
      route.meta = Object.assign(route.meta || {}, { 
        frontmatter: Object.assign(data, {
          excerpt
        }) 
      }) as RouteMeta
      return route
    },
  })

  return pagePlugin
}
