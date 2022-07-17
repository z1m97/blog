import type { Router } from 'vue-router'
import type { ViteSSGContext } from 'vite-ssg'
import NProgress from 'nprogress'

export function setupRouterGuard({ router, isClient }: ViteSSGContext<true>) {
  if (isClient) {
    createProgressGuard(router)
  }
}

function createProgressGuard(router: Router) {
  router.beforeEach(() => {
    NProgress.start()
  })
  router.afterEach(() => {
    NProgress.done()
  })
}
