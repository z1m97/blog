import type { ViteSSGContext } from 'vite-ssg'

import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat.js'

// import { createHead } from '@vueuse/head'

export function setupPlugins({ app }: ViteSSGContext<true>) {
  dayjs.extend(LocalizedFormat)

  // const head = createHead()
  // app.use(head)
}
