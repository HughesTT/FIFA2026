import { useTeamStore } from '~/store/teamStore'
import { getCurrentDate, getTodayString } from '~/utils/dateHelper'

export const useMatches = (groupRef: Ref<string>) => {
  const teamStore = useTeamStore()

  return computed(() => {
    const group = groupRef.value
    const teamsToShow = group
    ? teamStore.teams.filter(team => team.teamGroup === group)
    : teamStore.teams

  // const today = getTodayString() // 使用測試日期

  // 收集所有球隊的賽程，並過濾出即將開始的比賽（今天和未來1天內）
  const matchesMap = new Map() // 建立 Map 去除重複比賽
  const oneDaysLater = new Date(getCurrentDate()) // 使用測試日期
  oneDaysLater.setDate(oneDaysLater.getDate() + 60) // 調整為1天以顯示更多比賽

  // 遍歷所有球隊的賽程，收集即將開始的比賽
  teamsToShow.forEach(team => {
    team.teamGameSchedule.forEach(match => {
      // Key 依然使用字母排序，確保不論從墨西哥還是南非出發，產生的 Key 都唯一，用來過濾重複
      const sortedTeamsForKey = [team.teamName, match.opponent].sort()
      const matchKey = `${match.date}-${match.time}-${sortedTeamsForKey[0]}-vs-${sortedTeamsForKey[1]}`  
      
      if (!matchesMap.has(matchKey)) {
        // 根據目前遍歷到的球隊 homeAway 設定，抓出「誰是主場、誰是客場」
        let homeTeamName = ''
        let awayTeamName = ''

        if (match.homeAway === true) {
          // 如果當前球隊 homeAway 是 true，代表當前球隊自己是主場，對手是客場
          homeTeamName = team.teamName
          awayTeamName = match.opponent
        } else {
          // 如果當前球隊 homeAway 是 false，代表當前球隊自己是客場，對手才是主場
          homeTeamName = match.opponent
          awayTeamName = team.teamName
        }

        if (!matchesMap.has(matchKey)) {
          // 根據找出的主客場名字，分別去 store 撈出對應的球隊完整資訊（為了取得國旗）
          const homeTeamInfo = teamStore.teams.find(t => t.teamName === homeTeamName)
          const awayTeamInfo = teamStore.teams.find(t => t.teamName === awayTeamName)

          // 資料精確寫入 Map，確保名字與國旗不會配對錯誤
          matchesMap.set(matchKey, {
            matchId: matchKey,
            group: team.teamGroup,
            date: match.date,
            time: match.time,
            stage: match.stage,
            teamGroup: team.teamGroup,
            // 主場配主場、客場配客場
            homeTeam: homeTeamName,
            homeFlag: homeTeamInfo?.teamFlag || '',
            homeCode: homeTeamInfo?.teamCode || '',
            awayTeam: awayTeamName,
            awayFlag: awayTeamInfo?.teamFlag || '',
            awayCode: awayTeamInfo?.teamCode || ''
          })
        }
      }
    })
  })

  const matchesArray = Array.from(matchesMap.values())
  // console.log('UmatchesArray:', matchesArray) // 呼叫用，檢查 matchesArray 是否正確
  return matchesArray
    .sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date)
      if (dateCompare !== 0) return dateCompare
      return a.time.localeCompare(b.time)
    })
    .slice(0, 100) // 只顯示前100場比賽
  })
}