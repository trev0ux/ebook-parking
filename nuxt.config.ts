// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  axios: {
    baseURL: 'https://equidado-008c032b8ff0.herokuapp.com',
    proxyHeaders: false,
    credentials: false,
  },

  css: [{ src: '~/assets/styles/globals.scss', lang: 'sass' }],

  app: {
    head: {
      title: "Ebook Parking",
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js",
          integrity:
            "sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa",
          crossorigin: "anonymous",
        },
      ],
    }
  },

  modules: [
    '@nuxt/icon',
    '@nuxt/image'
  ],

  plugins: [
    '@/plugins/vue-datepicker',
    '~/plugins/date-fns'
  ],
  compatibilityDate: '2024-07-16'
})