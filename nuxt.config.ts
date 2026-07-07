import { readFileSync, existsSync } from 'node:fs'
import type { SiteData } from './types/site'

const siteDataPath = 'data/site.json'
const siteData = existsSync(siteDataPath)
  ? JSON.parse(readFileSync(siteDataPath, 'utf-8')) as SiteData
  : null
const pageTitle = [siteData?.profile?.name, 'ポートフォリオ'].filter(Boolean).join(' | ')

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  ssr: true,
  modules: ['@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      'Noto Sans JP': [300, 400, 500, 600, 700],
      'Space Mono': [400, 700],
    },
    display: 'swap',
    preload: true,
    subsets: ['latin', 'japanese'],
  },
  app: {
    head: {
      title: pageTitle,
      htmlAttrs: { lang: 'ja' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
})
