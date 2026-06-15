import { defineStore } from 'pinia'
import { useTeamStore } from '~/store/teamStore'


export const useStandingsStore = defineStore('standings', {
  state: () => ({
    matches: [], // 藉由 store 取得原始比賽資料
    teams: [],   // 各隊伍資料
  }),
  getters: {
    // 即時計算小組排名：篩選該組 -> 計算積分 -> 排序
    groupStandings: (state) => {
      const teamStore = useTeamStore()
      const teams = teamStore.teams
      const standings = teams.map(team => {
        const teamMatches = state.matches.filter(match => match.homeTeam === team.name || match.awayTeam === team.name)
        let points = 0
        teamMatches.forEach(match => {
          if (match.homeTeam === team.name) {
            if (match.homeScore > match.awayScore) points += 3
            else if (match.homeScore === match.awayScore) points += 1
          } else {
            if (match.awayScore > match.homeScore) points += 3
            else if (match.awayScore === match.homeScore) points += 1
          }
        })
        return { ...team, points }
      })
      return standings.sort((a, b) => b.points - a.points)
    }
  },
})