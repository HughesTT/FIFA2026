import type { Match, MatchCardData } from "~/types/match"

export function formatMatchForCard(match?: Match): MatchCardData {
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
      homePaneltyScore: null,
      awayPaneltyScore: null
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
    homePaneltyScore: match.homePenaltyScore,
    awayPaneltyScore: match.awayPenaltyScore,
  }
}