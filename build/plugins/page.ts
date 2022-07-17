import Pages from 'vite-plugin-pages'

export function createPagePlugin() {
  const pagePlugin = Pages({
    extensions: ['vue'],
    pagesDir: 'src/packages',
  })

  return pagePlugin
}
