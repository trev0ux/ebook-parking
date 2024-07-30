import { onMounted, onUnmounted } from 'vue'

export function useTooltip(el, options = {}) {
  const { $bootstrap } = useNuxtApp()
  let tooltip

  onMounted(() => {
    if ($bootstrap && $bootstrap.Tooltip) {
      tooltip = new $bootstrap.Tooltip(el, options)
    }
  })

  onUnmounted(() => {
    if (tooltip) {
      tooltip.dispose()
    }
  })
}