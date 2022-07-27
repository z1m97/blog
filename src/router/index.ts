import pageRoutes from 'pages-generated'
import type { RouterScrollBehavior } from 'vue-router'
import type { RouterOptions } from 'vite-ssg'

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) return savedPosition
  else return { top: 0 }
}

const indexPage = pageRoutes.find((i) => i.name === 'index')
indexPage.redirect = 'posts'

export const routerOptions: RouterOptions = {
  routes: pageRoutes,
  scrollBehavior,
}
