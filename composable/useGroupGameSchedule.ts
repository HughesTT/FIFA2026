import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTeamStore } from '~/store/teamStore' // 根據分組從 teamStore 中取得對應的球隊資料
import { useGroupStandings } from '~/composable/useGroupStandings' // 引入 useGroupStandings composable，獲取比賽資料

export function useGroupGameSchedule () {
    const teamStore = useTeamStore()
    const route = useRoute()
    const router = useRouter()
    const group = computed(() => route.query.group || '組')

    // 🌟 保留原本第 74 行的宣告，不再重複宣告 const countryCode
    const countryCode = computed(() => route.query.teamCode || '')

    // 呼叫戰 useGroupStandings，傳入目前的組別
    const { enhancedMatches } = useGroupStandings(group)

    // 將 enhancedMatches，重新轉換成原本 Template 所期待的巢狀結構
    const uniqueMatches = computed(() => {
    return enhancedMatches.value.map(match => {
        // 查詢主客隊的完整資訊（用來補齊點擊所需的國家代碼 code）
        const homeTeamInfo = teamStore.teams.find(t => t.teamName === match.homeTeam)
        const awayTeamInfo = teamStore.teams.find(t => t.teamName === match.awayTeam)

        // 標準化結構，方便 MatchCard 使用
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
        awayScore: match.awayScore
        }
    })
    })

    const countryGameSchedule = computed(() => {
    const teamCode = route.query.teamCode
    const team = teamStore.teams.find(t => t.teamCode === teamCode)
    return team ? team.teamGameSchedule : []
    })

    const viewCountryGameSchedule = (teamCode) => {
    console.log(`顯示 ${teamCode} 的比賽日程`)
    router.push({ path: '/CountryGameSchedule', query: { teamCode } })
    }

    return {
        uniqueMatches,
        countryGameSchedule,
        viewCountryGameSchedule,
        group,
        countryCode
    }
}