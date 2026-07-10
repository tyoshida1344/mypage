export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  ssr: true,
  site: { url: process.env.NUXT_PUBLIC_SITE_URL || 'https://triver-selfy.netlify.app' },
  modules: ['@nuxtjs/google-fonts', '@nuxt/eslint', '@nuxtjs/sitemap'],
  runtimeConfig: {
    gasApiUrl: '',
  },
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
      htmlAttrs: { lang: 'ja' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
});
