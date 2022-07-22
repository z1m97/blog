import vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

import { createUnocssPlugin } from './unocss'
import { createPagePlugin } from './page'
import { createMarkdownPlugins } from './markdown'

export function createVitePlugins() {
  const vitePlugins = [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Inspect(),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core', '@vueuse/head'],
    }),
    Components({
      extensions: ['vue', 'md'],
      dts: true,
      directoryAsNamespace: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        IconsResolver({
          componentPrefix: '',
        }),
      ],
    }),
    Icons({
      defaultClass: 'inline',
      defaultStyle: 'vertical-align: sub;',
    }),
    createUnocssPlugin(),
    createPagePlugin(),
    ...createMarkdownPlugins(),
  ]

  return vitePlugins
}
