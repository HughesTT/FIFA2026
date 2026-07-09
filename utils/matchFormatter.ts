import type { Match, MatchCardData } from "~/types/match"
import type { knockoutMatch } from "~/types/knockoutResults"

export function formatMatchForCard(match?: Match | knockoutMatch): MatchCardData {
  if (!match) {
    return {
      matchTime: '',
      matchDate: '',
      homeTeam: '待定',
      homeCode: '',
      homeFlag: '',
      awayTeam: '待定',
      awayCode: '',
      awayFlag: '',
      homeScore: null,
      awayScore: null,
      homePenaltyScore: null,
      awayPenaltyScore: null
    }
  }

  return {
    matchTime: match.time,
    matchDate: match.date,
    homeTeam: match.homeTeam?.teamName ?? '待定',
    homeCode: match.homeTeam?.teamCode ?? '',
    homeFlag: match.homeTeam?.teamFlag ?? '',
    awayTeam: match.awayTeam?.teamName ?? '待定',
    awayCode: match.awayTeam?.teamCode ?? '',
    awayFlag: match.awayTeam?.teamFlag ?? '',
    homeScore: match.homeScore,
    awayScore: match.awayScore,
    homePenaltyScore: match.homePenaltyScore,
    awayPenaltyScore: match.awayPenaltyScore,
    isWinner: match.winnerCode ?? match.isWinner ?? null,
    stage: match.stage,
  }
}
