/**
 * 判斷指定 teamCode 是否為本場比賽的勝者
 * @param match    比賽資料，必須包含 `isWinner`（勝者 teamCode）欄位
 * @param teamCode 當前要檢查的隊伍代碼
 * @returns true → 為勝者，false → 若不是晉級隊伍，使用CSS降低該隊伍的opacity
 */
export function isWinner(match: { isWinner: string }, teamCode: string): boolean {
  return match.isWinner === teamCode
}

/**
 * 可選：產生自訂透明度的 CSS 變數（如果想在模板上直接寫 style）
 * @param opacity 0 ~ 1 之間的透明度，預設 0.5
 * @returns CSS 文字，例如 `opacity: 0.5`
 */
export function loserStyle(opacity: number = 0.5): string {
  return `opacity: ${opacity}`
}
