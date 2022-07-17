import '@unocss/reset/tailwind.css'
import 'uno.css'

import './styles/main.css'

import { ViteSSG } from 'vite-ssg'

// router
import { setupRouterGuard } from './router/guard'
import { routerOptions } from './router'
// store
import { setupStore } from './store'
// plugins
import { setupPlugins } from './plugins'
// template
import App from './App.vue'

export const createApp = ViteSSG(App, routerOptions, (context) => {
  setupPlugins(context)
  setupRouterGuard(context)
  setupStore(context)
})
