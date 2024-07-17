import { format, parseISO } from 'date-fns'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('format', format)
  nuxtApp.provide('parseISO', parseISO)
})