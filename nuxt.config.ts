
export default defineNuxtConfig({
  devtools: { enabled: true },
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
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'available-places',
        path: '/available-places',
        component: resolve(__dirname, 'pages/available-places.vue')
      });
    }
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_URL
    }
  },

  modules: [
    '@nuxt/icon',
    '@nuxt/image',
  ],

  plugins: [
    '@/plugins/vue-datepicker',
    '@/plugins/axios',
    //'@/plugins/dynamic-routes'
  ],

  compatibilityDate: '2024-07-18',
})