import type { ViteSSGContext } from 'vite-ssg'

import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat.js'

import Cubic from '@seed/cubic'

export function setupPlugins({ app }: ViteSSGContext<true>) {
  dayjs.extend(LocalizedFormat)

  app.use(Cubic)
}
