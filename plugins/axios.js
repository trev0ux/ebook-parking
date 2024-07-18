import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const axiosInstance = axios.create({
    baseURL: config.public.apiBaseUrl,
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*'
    }
  })

  return {
    provide: {
      axios: axiosInstance
    }
  }
})