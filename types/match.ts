export interface Match {
  time: string
  date: string

  homeTeam: Team | null
  awayTeam: Team | null

  homeScore: number | null
  awayScore: number | null
}

export interface MatchCardData {
  matchTime: string
  matchDate: string
  homeTeam: string
  homeCode: string
  homeFlag: string
  awayTeam: string
  awayCode: string
  awayFlag: string
  homePaneltyScore: number | null
  awayPaneltyScore: number | null
}