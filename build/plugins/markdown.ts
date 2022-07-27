import Markdown from 'vite-plugin-vue-markdown'
import shiki from 'markdown-it-shiki'
import anchor from 'markdown-it-anchor'
import LinkAttributes from 'markdown-it-link-attributes'
import TOC from 'markdown-it-table-of-contents'

import { slugify } from '../utils'

export function createMarkdownPlugins() {
  return [
    Markdown({
      headEnabled: true,
      // wrapperComponent: 'layout',
      markdownItOptions: {
        quotes: '""\'\'',
      },
      markdownItSetup(md) {
        md.use(shiki, { theme: 'github-light' }),
          md.use(anchor, {
            slugify,
            permalink: anchor.permalink.linkInsideHeader({
              symbol: '#',
              renderAttrs: () => ({ 'aria-hidden': 'true' }),
            }),
          })

        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        }),
          md.use(TOC, {
            includeLevel: [1, 2, 3],
            slugify,
          })
      },
    }),
  ]
}
