// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/FIFA2026/' : '/',
    buildAssetsDir: 'assets',
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/eslint', '@pinia/nuxt'],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {}
    }
  },
  nitro: {
    prerender: {
      ignore: ['/GroupGameSchedule', '/CountryGameSchedule']
    }
  }
})