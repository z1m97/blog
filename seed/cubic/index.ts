import type { Plugin } from 'vue'
import Builder from './entry/builder.vue'
import Viewer from './entry/viewer.vue'

const builder: Plugin = {
  install(app, options) {
    app.component('SeedCubicBuilder', Builder)
    app.component('SeedCubicViewer', Viewer)
  },
}

export default builder
