import { readFileSync, existsSync } from 'node:fs'

const siteDataPath = 'data/site.json'
const siteData = existsSync(siteDataPath)
  ? JSON.parse(readFileSync(siteDataPath, 'utf-8'))
  : null
const pageTitle = [siteData?.profile?.name, 'ポートフォリオ'].filter(Boolean).join(' | ')

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  ssr: true,
  app: {
    head: {
      title: pageTitle,
      htmlAttrs: { lang: 'ja' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap',
        },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
})
