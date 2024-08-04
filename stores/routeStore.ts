import { defineStore } from 'pinia'
import { fetchRoutes, staticRoutes } from '../utils/fetchRoutes'
import { useRuntimeConfig } from '#app'

interface Route {
  name: string
  path: string
  contentType: string
}

export const useRouteStore = defineStore('route', {
  state: () => ({
    routes: [] as Route[],
    staticRouteFiles: staticRoutes
  }),

  actions: {
    async initializeRoutes() {
      const config = useRuntimeConfig()
      this.routes = await fetchRoutes(config.public.apiBaseUrl)
    },

    getRoutesByContentType(contentType: string): Route[] {
      return this.routes.filter(route => route.contentType === contentType)
    },

    getStaticRouteFile(contentType: string): string | undefined {
      return this.staticRouteFiles[contentType]
    }
  }
})