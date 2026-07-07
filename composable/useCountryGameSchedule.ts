import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTeamStore } from '~/store/teamStore'
import { useGroupStandings } from '~/composable/useGroupStandings'

export function useCountryGameSchedule() {
  const route = useRoute()
  const router = useRouter()
  const teamStore = useTeamStore()

  const group = computed(() => route.query.group || '') // 取得目前的組別參數，若沒有則為空字串
  const { enhancedMatches } = useGroupStandings(group) // 呼叫戰績表，傳入目前的組別

  const uniqueMatches = computed(() => {
    // 1. 先用原本的邏輯從更完整的資料來源對齊、map 出包含比數與代碼的陣列
    const allGroupMatches = enhancedMatches.value.map(match => {
      const homeTeamInfo = teamStore.teams.find(t => t.teamName === match.homeTeam)
      const awayTeamInfo = teamStore.teams.find(t => t.teamName === match.awayTeam)

      return {
        matchId: match.matchId,
        date: match.date,
        time: match.time,
        homeTeam: match.homeTeam,
        homeFlag: match.homeFlag,
        homeCode: homeTeamInfo?.teamCode || '',
        awayTeam: match.awayTeam,
        awayFlag: match.awayFlag,
        awayCode: awayTeamInfo?.teamCode || '',
        homeScore: match.homeScore,
        awayScore: match.awayScore,
        teamGroup: match.teamGroup,
        stage: match.stage
      }
    })

    return allGroupMatches.filter(match =>
      match.homeCode === route.query.teamCode ||
      match.awayCode === route.query.teamCode
    )
  })

  // 取得目前球隊資訊
  const currentTeam = computed(() => {
    return teamStore.teams.find(team => team.teamCode === route.query.teamCode)
  })
  // 🌟 加入這行保險：如果網址沒傳 group，就用查到的球隊組別強行補上去給戰績表看
  if (currentTeam.value && !route.query.group) {
    route.query.group = currentTeam.value.teamGroup
  }

  // 點擊球隊時顯示比賽日程
  const viewCountryGameSchedule = (teamCode) => {
    console.log(`顯示 ${teamCode} 的比賽日程`)
    router.push({
      path: '/CountryGameSchedule',
      query: {
        teamCode,
        group: group.value
      }
    })
  }

  return {
    uniqueMatches,
    currentTeam,
    viewCountryGameSchedule
  }
}