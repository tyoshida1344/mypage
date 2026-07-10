import { readFileSync, existsSync } from 'node:fs';
import type { SiteData } from './types/site';

const siteDataPath = 'data/site.json';
const siteData = existsSync(siteDataPath)
  ? (JSON.parse(readFileSync(siteDataPath, 'utf-8')) as SiteData)
  : null;
const pageTitle = [siteData?.profile?.name, 'ポートフォリオ'].filter(Boolean).join(' | ');
const siteDescription = siteData?.profile?.lead ?? '';
const siteUrl = siteData?.siteUrl ?? '';

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  ssr: true,
  site: { url: siteUrl },
  modules: ['@nuxtjs/google-fonts', '@nuxt/eslint', '@nuxtjs/sitemap', '@nuxt/image'],
  image: {
    format: ['webp'],
    quality: 80,
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
      title: pageTitle,
      htmlAttrs: { lang: 'ja' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: siteDescription },
        { property: 'og:title', content: pageTitle },
        { property: 'og:description', content: siteDescription },
        { property: 'og:url', content: siteUrl },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'ja_JP' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: pageTitle },
        { name: 'twitter:description', content: siteDescription },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
});
