
import axios from 'axios'

const fetchRoutes = async () => {

  try {
    const response = await axios.get(process.env.NUXT_PUBLIC_API_URL + '/umbraco/delivery/api/v2/content?fetch=descendants%3A%2F&skip=0&take=10&fields=properties%5Burl%5D');
    return response.data.items.map((item: any) => ({
      name: item.name,
      path: item.route.path
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

const staticRouteFiles: string[] = [
  '~/pages/index.vue',
  '~/pages/available-places.vue',
  '~/pages/additional-services.vue',
  '~/pages/thank-you.vue',
  '~/pages/reservation-form.vue'
];

const staticRouteNames: string[] = [
  'reservation',
  'available-places',
  'additional-services',
  'thank-you',
  'reservation-form',
];

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
  nitro: {
    prerender: {
      routes: ['/reserveer-nu']
    }
  },
  redirects: [
    {
      source: '/',
      destination: '/reserveer-nu',
      statusCode: 301
    }
  ],
  hooks: {
    'pages:extend': async (pages) => {
      const cmsRoutes = await fetchRoutes();

      pages.splice(0, pages.length);

      cmsRoutes.forEach((route: any, index: any) => {
        const file = staticRouteFiles[index];
        const name = staticRouteNames[index]
        const routeConfig: any = {
          name: name,
          path: route.path,
          file: file
        };

        if (index === 0) {
          const firstRoute: any = {
            name: staticRouteNames[1],
            path: '/',
            file: staticRouteFiles[1],
            redirect: route.path
          };
          pages.push(firstRoute);
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

      console.log('Final routes:', pages);
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