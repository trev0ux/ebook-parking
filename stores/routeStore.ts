import { defineStore } from 'pinia'
import { fetchRoutes, staticRoutes } from '../utils/fetchRoutes'

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
      this.routes = await fetchRoutes()
    },

    getRoutesByContentType(contentType: string): Route[] {
      return this.routes.filter(route => route.contentType === contentType)
    },

    getStaticRouteFile(contentType: string): string | undefined {
      return this.staticRouteFiles[contentType]
    }
  }
})