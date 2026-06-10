// 測試用的日期覆蓋
// 在開發時可以設定這個變量來模擬特定日期
// 例如：TEST_DATE = '2026-06-11' 來模擬比賽當天

export const TEST_DATE = '2026-06-15' // 留空使用真實日期，填入日期字串來測試

/**
 * 獲取目前日期（可用於測試）
 * @returns Date 對象
 */
export function getCurrentDate(): Date {
  if (TEST_DATE) {
    return new Date(TEST_DATE)
  }
  return new Date()
}

/**
 * 獲取今天的日期字串（YYYY-MM-DD 格式）
 * @returns 日期字串
 */
export function getTodayString(): string {
  const date = getCurrentDate()
  return date.toISOString().split('T')[0]
}

/**
 * 檢查給定日期是否是今天
 * @param dateStr 日期字串（YYYY-MM-DD 格式）
 * @returns 是否是今天
 */
export function isToday(dateStr: string): boolean {
  return dateStr === getTodayString()
}

/**
 * 檢查給定日期是否在今天之前
 * @param dateStr 日期字串（YYYY-MM-DD 格式）
 * @returns 是否在今天之前
 */
export function isPast(dateStr: string): boolean {
  const today = getTodayString()
  return dateStr < today
}

/**
 * 檢查給定日期是否在今天之後
 * @param dateStr 日期字串（YYYY-MM-DD 格式）
 * @returns 是否在今天之後
 */
export function isFuture(dateStr: string): boolean {
  const today = getTodayString()
  return dateStr > today
}
