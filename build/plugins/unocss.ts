import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno, presetTypography, presetWebFonts } from 'unocss'
import { presetScrollbar } from 'unocss-preset-scrollbar'

export function createUnocssPlugin() {
  const unocssPlugin = Unocss({
    theme: {
      extend: {
        boxShadow: {
          'common': '0 8px 20px -3px rgba(40,49,73, 0.3)',
        }
      }
    },
    presets: [
      presetUno(),
      presetIcons({
        extraProperties: {
          display: 'inline-block',
          height: '1.2em',
          width: '1.2em',
          'vertical-align': 'text-bottom',
        },
      }),
      presetWebFonts({
        provider: 'google',
        fonts: {
          sans: 'Jost',
          mono: ['Fira Code', 'Fira Mono:400,700'],
        }
      }),
      presetTypography(),
      presetAttributify(),
      presetScrollbar(),
    ],
  })
  return unocssPlugin
}
