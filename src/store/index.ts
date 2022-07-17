import type { ViteSSGContext } from 'vite-ssg'
import { createPinia } from 'pinia'
import { useAppStoreOut } from './modules/app'

const pinia = createPinia()

export function setupStore({ app, router, initialState }: ViteSSGContext<true>) {
  app.use(pinia)

  if (import.meta.env.SSR) {
    initialState.pinia = pinia.state.value
  } else {
    pinia.state.value = initialState.pinia || {}
  }

  router.beforeEach((to, from, next) => {
    const appStore = useAppStoreOut()
    !appStore.ready && appStore.initialize()
    next()
  })
}

export { pinia }
