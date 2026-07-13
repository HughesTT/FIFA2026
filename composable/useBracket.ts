import { ref, computed } from "vue"

export function useBracket(
  stages: readonly string[],
  visibleCount: Ref<number>,
) {
  // 目前可見的階段起始索引，預設為R32，可隨賽程階段自行調整
  const defaultStartIndex = stages.findIndex(stage => stage === 'QF');
  const windowStart = ref(defaultStartIndex >= 0 ? defaultStartIndex : 0)

  // 記錄滑動方向
  const direction = ref<'next' | 'prev'>('next')

  const visibleStages = computed(() =>
    stages.slice(windowStart.value, windowStart.value + visibleCount.value)
  )

  // 是否可以前進後退
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