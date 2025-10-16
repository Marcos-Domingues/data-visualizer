// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss', '@nuxt/icon', '@pinia/nuxt'],
  runtimeConfig: {
    logokitApiToken: import.meta.env.LOGOKIT_API_TOKEN,
    public: {
      apiBaseUrl: import.meta.env.API_BASE_URL,
    },
  },
})