import pageRoutes from 'pages-generated'
import type { RouterScrollBehavior } from 'vue-router'
import type { RouterOptions } from 'vite-ssg'

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) return savedPosition
  else return { top: 0 }
}

export const routerOptions: RouterOptions = {
  routes: pageRoutes,
  scrollBehavior,
}
