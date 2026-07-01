import { ref, computed } from "vue"

export function useBracket(
  stages: readonly string[],
  visibleCount: Ref<number>,
) {
  const windowStart = ref(0) // 目前可見的階段起始索引

  const direction = ref<'next' | 'prev'>('next') // 記錄滑動方向

  const visibleStages = computed(() => 
    stages.slice(windowStart.value, windowStart.value + visibleCount.value)
  )
  const canPrev = computed(() => windowStart.value > 0)
  const canNext = computed(() => windowStart.value + visibleCount.value < stages.length)

  const prevStage = () => {
    if (!canPrev.value) return
    direction.value = 'prev'
    windowStart.value--
  }

  const nextStage = () => {
    if (!canNext.value) return
    direction.value = 'next'
    windowStart.value++
  }

  return {
    windowStart,
    visibleStages,
    canPrev,
    canNext,
    prevStage,
    nextStage,
    direction,
  }
}