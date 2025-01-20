// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: false,
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    'radix-vue/nuxt',
    '@nuxt/ui',
    'nuxt-lodash',
    '@pinia/nuxt',
  ],
  css: ['@unocss/reset/tailwind-compat.css'],
  app: {
    baseURL: '/mygo/',
  },
})
