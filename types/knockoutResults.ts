export interface knockoutTeam {
    teamCode?: string // 勝出隊伍代碼(例: 'MX')
    teamName?: string // 勝出隊伍名稱(例: '墨西哥')
    teamFlag?: string // 勝出隊伍旗幟
}

export interface knockoutMatch {
    matchId: string // 比賽編號(例: 'R16-1')
    stageLabel: string
    fifaMatchId: string
    stage: 'R32' | 'R16' | 'QF' | 'SF' | 'Final' | 'ThirdPlace' // 賽程階段
    date: string // 比賽日期(YYYY-MM-DD)
    time: string // 比賽時間(HH:MM)
    homeTeam: knockoutTeam // 主場資訊
    awayTeam: knockoutTeam // 客場資訊
    homeScore: number | null // 主場進球數
    awayScore: number | null // 客場進球數
    homePenaltyScore?: number | null // 主場PK進球數
    awayPenaltyScore?: number | null // 客場PK進球數
    winnerCode?: string // 勝出隊伍代碼(例: 'MX')
    nextMatchId: string | null // 下一場比賽編號(例: 'QF-1')
    nextMatchSlot?: 'home' | 'away' // 下一場比賽是主或客場
    side: 'left' | 'right' // 比賽在圖表上的位置(左半區或右半區)
}