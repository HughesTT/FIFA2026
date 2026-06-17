import type { Ref } from 'vue';
import { computed } from 'vue'
import { useMatches } from '~/composable/useMatches'
import { matchResults } from '~/data/matchResults'

// 定義包含比數的新比賽資料結構
export interface EnhancedMatch {
  matchId: string
  group: string
  date: string
  time: string
  stage: string
  teamGroup: string
  homeTeam: string
  homeFlag: string
  awayTeam: string
  awayFlag: string
  homeScore: number | null
  awayScore: number | null
}

// 定義戰績表欄位結構
export interface TeamStanding {
  teamName: string
  teamFlag: string
  teamGroup: string
  played: number // 已比賽場次
  won: number // 勝場數
  drawn: number // 和局數
  lost: number // 負場數
  goalsFor: number // 進球數
  goalsAgainst: number // 失球數
  goalDifference: number // 淨勝球數
  points: number // 積分
}

export const useGroupStandings = (groupRef: Ref<string>) => {
  // 在 Composable 內部呼叫 useMatches，取得該分組的賽程
  const matchesArray = useMatches(groupRef)

  // 結合比分，生成包含比數的新資料陣列
  const enhancedMatches = computed<EnhancedMatch[]>(() => {
    return matchesArray.value.map(match => {
      const resultKey = `${match.matchId}` // matchId 已經是按照日期、時間、隊伍排序的唯一 Key

      // 根據動態生成的 resultKey 去比分庫搜尋
      const result = matchResults[resultKey]

      // 使用比賽真正的主客場來還原正確的分數配對
      let homeScore: number | null = null
      let awayScore: number | null = null
      
      if (result && result.homeScore !== null && result.awayScore !== null) {
        // 將比賽隊伍名稱按中文筆畫/英文字母排序，組成與 matchResults 相同 Key
        const sortedTeam = [match.homeTeam, match.awayTeam].sort()
        // 判斷 matchResults 排序第一的隊伍，是否為主場隊伍
        if (sortedTeam[0] === match.homeTeam) {
          homeScore = result.homeScore
          awayScore = result.awayScore
        } else { // 如果相反，將比數對調
          homeScore = result.awayScore
          awayScore = result.homeScore
        }
      }

      return {
        ...match,
        homeScore,
        awayScore
      }
    })
  })

  // 3. 根據帶有比數的比賽，動態計算該組的戰績表 (Standings)
  const standings = computed<TeamStanding[]>(() => {
    const statsMap = new Map<string, TeamStanding>()

    // 初始化：先把這組比賽中出現過的所有隊伍建立到統計表中
    enhancedMatches.value.forEach(match => {
      if (!statsMap.has(match.homeTeam)) {
        statsMap.set(match.homeTeam, createEmptyStanding(match.homeTeam, match.homeFlag, match.teamGroup))
      }
      if (!statsMap.has(match.awayTeam)) {
        statsMap.set(match.awayTeam, createEmptyStanding(match.awayTeam, match.awayFlag, match.teamGroup))
      }
    })

    // 開始根據比數計算戰績
    enhancedMatches.value.forEach(match => {
      const { homeTeam, awayTeam, homeScore, awayScore } = match

      // 確保雙方隊伍都已在戰績表中
      if (!statsMap.has(homeTeam)) {
        statsMap.set(homeTeam, createEmptyStanding(homeTeam, match.homeFlag, match.teamGroup))
      }
      if (!statsMap.has(awayTeam)) {
        statsMap.set(awayTeam, createEmptyStanding(awayTeam, match.awayFlag, match.teamGroup))
      }

      // 只有當雙方都有分數時（代表已完賽），才納入積分計算
      if (homeScore !== null && awayScore !== null) {
        const homeStats = statsMap.get(homeTeam)!
        const awayStats = statsMap.get(awayTeam)!

        // 增加已賽場次
        homeStats.played++
        awayStats.played++

        // 累加進球與失球
        homeStats.goalsFor += homeScore
        homeStats.goalsAgainst += awayScore
        awayStats.goalsFor += awayScore
        awayStats.goalsAgainst += homeScore

        // 計算勝負與積分 (勝得3分、和得1分、敗得0分)
        if (homeScore > awayScore) {
          homeStats.won++
          homeStats.points += 3
          awayStats.lost++
        } else if (homeScore < awayScore) {
          awayStats.won++
          awayStats.points += 3
          homeStats.lost++
        } else {
          homeStats.drawn++
          homeStats.points += 1
          awayStats.drawn++
          awayStats.points += 1
        }

        // 更新淨勝球
        homeStats.goalDifference = homeStats.goalsFor - homeStats.goalsAgainst
        awayStats.goalDifference = awayStats.goalsFor - awayStats.goalsAgainst
      }
    })

    // 將 Map 轉為陣列，並依據「國際足總標準」進行排序：積分 -> 淨勝球 -> 進球數
    return Array.from(statsMap.values()).sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference
      return b.goalsFor - a.goalsFor
    })
  })

  return {
    enhancedMatches, // 帶有分數的賽程，可以直接給賽程卡片用
    standings        // 算好的戰績排名，可以直接給 <Standings /> 元件用
  }
}

// 輔助函數：建立初始空白的戰績資料
function createEmptyStanding(name: string, flag: string, group: string): TeamStanding {
  return {
    teamName: name,
    teamFlag: flag,
    teamGroup: group, // 從參數獲取分組資訊
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0, // 進球數
    goalsAgainst: 0, // 失球數
    goalDifference: 0, // 淨勝球數
    points: 0
  }
}