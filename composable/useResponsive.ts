import { ref, onMounted, onUnmounted } from "vue";

export function useResponsive() {
  const visibleCount = ref(3)

  const updateVisibleCount = () => {
    if (window.innerWidth <= 768) {
      visibleCount.value = 2
    } else {
      visibleCount.value = 3
    }
  }
  
  if (import.meta.client) {
    onMounted(() => {
      updateVisibleCount()
      window.addEventListener('resize', updateVisibleCount)
    })
    onUnmounted(() => {
      window.removeEventListener('resize', updateVisibleCount)
    })
  }
  return {
    visibleCount
  }
}