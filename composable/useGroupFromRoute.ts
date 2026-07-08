import { useRoute } from 'vue-router'
import { computed } from 'vue'

/**
 * 回傳路由參數，預設為 A
 * @param defaultGroup 當群組參數不存在時的預設值
 * @returns 返回一個包含 `group` computed ref 的物件
 */
export const useGroupFromRoute = (defaultGroup: string = 'A') => {
  const route = useRoute() // 獲取目前路由資訊
  const group = computed(() => {
    const q = route.query.group as string | undefined // 預設獲取資訊參數
    return q ?? defaultGroup // 如果q不存在則回傳預設值
  })
  return { group }
}
