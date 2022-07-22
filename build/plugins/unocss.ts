import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno, presetTypography, presetWebFonts } from 'unocss'
import { presetScrollbar } from 'unocss-preset-scrollbar'

export function createUnocssPlugin() {
  const unocssPlugin = Unocss({
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
