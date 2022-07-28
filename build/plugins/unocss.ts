import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno, presetTypography, presetWebFonts } from 'unocss'
import { presetScrollbar } from 'unocss-preset-scrollbar'

export function createUnocssPlugin() {
  const unocssPlugin = Unocss({
    theme: {
      boxShadow: {
        DEFAULT: '0 8px 20px -3px rgba(40,49,73, 0.12)',
        card: '1px 16px 18px -6px rgba(40,49,73, 0.08)',
        'card-hover': '1px 24px 14px -6px rgba(40,49,73, 0.12)',
      },
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
          sans: ['Jost:100,200,300,400,500,600,700,800,900'],
          // mono: ['Fira Code', 'Fira Mono:400,700'],
        },
      }),
      presetTypography(),
      presetAttributify(),
      presetScrollbar(),
    ],
  })
  return unocssPlugin
}
