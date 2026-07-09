// 測試用的日期覆蓋
// 開發時可以設定這個變數來模擬特定日期
// 例如：TEST_DATE = '2026-06-11' 來模擬比賽當天

export const TEST_DATE = ''  // 留空使用真實日期，填入日期字串來測試

/**
 * 取得目前日期（用於測試）
 * @returns Date 對象
 */
export function getCurrentDate(): Date {
  if (TEST_DATE) {
    return new Date(TEST_DATE)
  }
  return new Date()
}

/**
 * 取得今天的日期字串（YYYY-MM-DD 格式）
 * @returns 日期字串
 */
export function getTodayString(): string {
  const date = getCurrentDate()
  return date.toISOString().split('T')[0] // 日期轉換為 YYYY-MM-DD 格式
}

/**
 * 檢查比賽日期是否是今天
 * @param dateStr 日期字串（YYYY-MM-DD 格式）
 * @returns 是否是今天
 */
export function isToday(dateStr: string): boolean {
  return dateStr === getTodayString()
}

/**
 * 檢查比賽日期是否在今天之前
 * @param dateStr 日期字串（YYYY-MM-DD 格式）
 * @returns 是否在今天之前
 */
export function isPast(dateStr: string): boolean {
  const today = getTodayString()
  return dateStr < today
}

/**
 * 檢查比賽日期是否在今天之後
 * @param dateStr 日期字串（YYYY-MM-DD 格式）
 * @returns 是否在今天之後
 */
export function isFuture(dateStr: string): boolean {
  const today = getTodayString()
  return dateStr > today
}

/**
 * 格式化日期
 * @param dateStr 日期字串（YYYY-MM-DD 格式）
 * @returns 格式化後的日期字串（例如：06/11 週三）
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr) // 將日期字串轉換
  return date.toLocaleDateString('zh-TW', {
    month: '2-digit', // 顯示兩位數的月份
    day: 'numeric', // 顯示數字的日期
    weekday: 'short', // 顯示簡短的星期幾名稱
    timeZone: 'Asia/Taipei' // 強制前後端時區一致
  })
}