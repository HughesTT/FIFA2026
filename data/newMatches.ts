import { useMatchesReturn } from '~/composable/useMatches'

export const useMatches = () => {
  const getRawMatches = useMatchesReturn()

  const formattedMatches = getRawMatches().map(match => {
    return {
      matchId: match.matchId,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      homeScore: match.homeScore,
      awayScore: match.awayScore,
      date: match.date,
    }
  })
  console.log('即將進行的比賽:', formattedMatches)
  return { formattedMatches }
}