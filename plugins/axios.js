import { defineNuxtPlugin, useRuntimeConfig } from '#app';

import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const axiosInstance = axios.create({
    baseURL: config.public.apiBaseUrl,
    headers: {
      'Accept': '*/*'
    },
    withCredentials: true
  })

  return {
    provide: {
      axios: axiosInstance
    }
  }
})