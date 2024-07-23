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
  axiosInstance.defaults.withCredentials = true;
  return {
    provide: {
      axios: axiosInstance
    }
  }
})