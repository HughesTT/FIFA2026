export interface Match {
  time: string
  date: string

  homeTeam: Team | null
  awayTeam: Team | null

  homeScore: number | null
  awayScore: number | null
  homePenaltyScore?: number | null
  awayPenaltyScore?: number | null
  winnerCode?: string | null
  isWinner?: string | null
  stage?: string
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
  homeScore: number | null
  awayScore: number | null
  homePenaltyScore: number | null
  awayPenaltyScore: number | null
  isWinner?: string | null
  stage?: string
}
