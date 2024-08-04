
import { fetchRoutes, staticRoutes } from './utils/fetchRoutes'


export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    { src: '~/assets/styles/globals.scss', lang: 'sass' },
  ],
  app: {
    head: {
      title: 'Parkeren-harlingen.nl | Parkeren op loopafstand van de boten',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no',
      meta: [
        { name: 'description', content: 'Onze parkeerfaciliteit bevindt zich op slechts 300m lopen vanaf de veerterminal naar Terschelling en Vlieland. Reserveren noodzakelijk: Reserveer Online!' },
        { name: 'keywords', content: 'parkeerfaciliteit,Terschelling,Vlieland' },
        { name: 'author', content: 'Double Design & Development' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ]
    }
  },
  build: {
    transpile: ['bootstrap']
  },
  hooks: {
    'pages:extend': async (pages) => {
      const cmsRoutes = await fetchRoutes(process.env.NUXT_PUBLIC_API_URL);

      pages.splice(0, pages.length);

      cmsRoutes.forEach((route: any, index: number) => {
        const file = staticRoutes[route.contentType];
        const routeConfig: any = {
          name: route.name,
          path: route.path,
          file: file,
        };

        if (index === 0) {
          const rootRoute = {
            name: "home",
            path: '/',
            file: staticRoutes[0],
            redirect: route.path
          };

          pages.push(rootRoute);
        }

        pages.push(routeConfig);
      });

      function removePagesMatching(pattern: RegExp, pages: any[] = []) {
        const pagesToRemove = []
        for (const page of pages) {
          if (pattern.test(page.file)) {
            pagesToRemove.push(page)
          } else {
            removePagesMatching(pattern, page.children)
          }
        }
        for (const page of pagesToRemove) {
          pages.splice(pages.indexOf(page), 1)
        }
      }
      removePagesMatching(/\.ts$/, pages);
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
    '@pinia/nuxt',
  ],

  plugins: [
    '@/plugins/vue-datepicker',
    '@/plugins/axios',
    '@/plugins/bootstrap.js'
  ],

  compatibilityDate: '2024-07-18',
})