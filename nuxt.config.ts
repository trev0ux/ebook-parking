// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  render: {
    csp: {
      reportOnly: false,
      policies: {
        'script-src': [
          "'self'",
          'https:',
          "'unsafe-inline'",
          "'unsafe-eval'", // Add this line
          "'strict-dynamic'",
          "'nonce-lYJC0UCk24D6+PTa1yON6g=='"
        ]
      }
    }
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
        {
          src: "https://player.vimeo.com/api/player.js",
        },
      ],
    }
  },
  modules: [
    '@nuxt/icon',
    '@nuxt/image'
  ],
})
