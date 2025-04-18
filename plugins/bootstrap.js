export default defineNuxtPlugin(nuxtApp => {
    if (import.meta.client) {
        return Promise.all([
            import('bootstrap')
        ]).then(([{ Tooltip }]) => {
            nuxtApp.vueApp.directive('bs-tooltip', {
                mounted(el, binding) {
                    new Tooltip(el, {
                        title: binding.value,
                        placement: binding.arg || 'top',
                        trigger: 'hover'
                    })
                },
                unmounted(el) {
                    const tooltip = Tooltip.getInstance(el)
                    if (tooltip) {
                        tooltip.dispose()
                    }
                }
            })
        })
    }
})