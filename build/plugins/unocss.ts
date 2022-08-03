import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno, presetTypography, presetWebFonts } from 'unocss'
import { presetScrollbar } from 'unocss-preset-scrollbar'
import { presetHeroPatterns } from '@julr/unocss-preset-heropatterns'

export function createUnocssPlugin() {
  const unocssPlugin = Unocss({
    theme: {
      boxShadow: {
        DEFAULT: '0 8px 20px -3px rgba(40,49,73, 0.12)',
        card: '1px 16px 18px -6px rgba(40,49,73, 0.08)',
        'card-hover': '1px 24px 14px -6px rgba(40,49,73, 0.12)',
      },
      colors: {
        lighter: '#F3F3F3',
        lightest: '#F7F8F9',
      },
    },
    shortcuts: {
      'transition-all-300': 'transition-all duration-300 ease-in-out',
      'absolute-center': 'absolute transform top-1/2 left-1/2 -translate-1/2',
      'scale-show': 'opacity-100 scale-100',
      'scale-hide': 'opacity-0 scale-0',
      'scrollbar-default':
        'scrollbar hover:scrollbar-thumb-color-gray-200 scrollbar-thumb-color-gray-100 scrollbar-track-color-transparent',
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
      presetHeroPatterns(),
    ],
  })
  return unocssPlugin
}
