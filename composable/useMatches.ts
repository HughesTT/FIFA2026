import { useTeamStore } from '~/store/teamStore'
import { getCurrentDate, getTodayString } from '~/utils/dateHelper'

export const useMatches = (groupRef: Ref<string>) => {
  const teamStore = useTeamStore()

  return computed(() => {
    const group = groupRef.value
    const teamsToShow = group
    ? teamStore.teams.filter(team => team.teamGroup === group)
    : teamStore.teams

  const today = getTodayString() // 使用測試日期

  // 收集所有球隊的賽程，並過濾出即將開始的比賽（今天和未來1天內）
  const matchesMap = new Map() // 建立 Map 去除重複比賽
  const oneDaysLater = new Date(getCurrentDate()) // 使用測試日期
  oneDaysLater.setDate(oneDaysLater.getDate() + 30) // 調整為30天以顯示更多比賽
  const oneDaysLaterStr = oneDaysLater.toISOString().split('T')[0] // 轉換為 YYYY-MM-DD 格式
  const sequenceByGroup = { 'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8 } // 用於生成比賽ID的分組序列

  // 遍歷所有球隊的賽程，收集即將開始的比賽
  teamsToShow.forEach(team => {
    team.teamGameSchedule.forEach(match => {
      if (match.date >= today && match.date <= oneDaysLaterStr) {
        // 排序隊伍名稱保持一致性
        const teams = [team.teamName, match.opponent].sort()
        const matchKey = `${match.date}-${match.time}-${teams[0]}-vs-${teams[1]}` // 使用排序後的隊伍名稱作為唯一鍵

        if (!matchesMap.has(matchKey)) {
          const group = team.teamGroup
          // 查詢對手完整資訊
          if (!sequenceByGroup[group]) sequenceByGroup[group] = 1
          const seq = String(sequenceByGroup[group]).padStart(2, '0')
          const finalMatchId = `GS-${group}-${seq}`
          sequenceByGroup[group]++

          const team1 = teamStore.teams.find(t => t.teamName === teams[0])
          const team2 = teamStore.teams.find(t => t.teamName === teams[1])

          // 使用排序後的名稱確定穩定的主客場順序（第一個是主場，第二個是客場）
          matchesMap.set(matchKey, {
            matchId: finalMatchId,
            group: match.teamGroup,
            date: match.date,
            time: match.time,
            stage: match.stage,
            teamGroup: team.teamGroup,
            // 主場球隊（排序後的第一個）
            homeTeam: teams[0],
            homeFlag: team1?.teamFlag || '',
            // 客場球隊（排序後的第二個）
            awayTeam: teams[1],
            awayFlag: team2?.teamFlag || ''
          })
        }
      }
    })
  })

    return Array.from(matchesMap.values())
    .sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date)
      if (dateCompare !== 0) return dateCompare
      return a.time.localeCompare(b.time)
    })
    .slice(0, 100) // 只顯示前100場比賽
  })
}