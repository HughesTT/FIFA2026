import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useTeamStore } from '~/store/teamStore'

// 排名資料結構
interface TeamStanding {
  group: string
  teamName: string
  teamCode: string
  teamFlag: string
  rank: number
  played: number
  wins: number
  draws: number
  losses: number
  goalsFor: number
  goalsAgainst: number
  goalDiff: number
  points: number
}

// 對戰結果資料結構
interface MatchResult {
  key: string
  group: string
  date: string
  time: string
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  played: boolean
}

type StandingsByGroup = Record<string, TeamStanding[]>
type ResultsMap = Record<string, MatchResult>

interface TeamGameSchedule {
  date: string
  time: string
  homeAway: boolean
  opponent: string
  stage: '小組賽' | '淘汰賽'
}

interface TeamInfo {
  teamName: string
  teamCode: string
  teamFlag: string
  teamGameSchedule: TeamGameSchedule[]
}

export const useStandingsStore = defineStore('standings', () => {
  const teamStore = useTeamStore()
  const matchResults = ref<ResultsMap>({})

  const createMatchKey = (
    group: string,
    date: string,
    time: string,
    homeTeam: string,
    awayTeam: string
  ) => {
    const teams = [homeTeam, awayTeam].sort((a, b) => a.localeCompare(b, 'zh-TW'))
    return `${group}-${date}-${time}-${teams[0]}-vs-${teams[1]}`
  }

  const ensureFixtures = () => {
    const teamsByGroup = teamStore.teamsByGroup as Record<string, TeamInfo[]>

    Object.entries(teamsByGroup).forEach(([group, teams]) => {
      teams.forEach((team) => {
        team.teamGameSchedule
          .filter((match) => match.stage === '小組賽')
          .forEach((match) => {
            const homeTeam = match.homeAway ? team.teamName : match.opponent
            const awayTeam = match.homeAway ? match.opponent : team.teamName
            const key = createMatchKey(group, match.date, match.time, homeTeam, awayTeam)

            if (!matchResults.value[key]) {
              matchResults.value[key] = {
                key,
                group,
                date: match.date,
                time: match.time,
                homeTeam,
                awayTeam,
                homeScore: 0,
                awayScore: 0,
                played: false
              }
            }
          })
      })
    })
  }

  const buildStandings = (): StandingsByGroup => {
    const teamsByGroup = teamStore.teamsByGroup as Record<string, TeamInfo[]>
    const standingsByGroup: StandingsByGroup = {}

    Object.entries(teamsByGroup).forEach(([group, teams]) => {
      const table = teams.map((team) => ({
        group,
        teamName: team.teamName,
        teamCode: team.teamCode,
        teamFlag: team.teamFlag,
        rank: 0,
        played: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDiff: 0,
        points: 0
      }))

      const lookup = Object.fromEntries(table.map((item) => [item.teamName, item])) as Record<string, TeamStanding>

      Object.values(matchResults.value)
        .filter((match) => match.group === group && match.played)
        .forEach((match) => {
          const home = lookup[match.homeTeam]
          const away = lookup[match.awayTeam]

          if (!home || !away) {
            return
          }

          home.played += 1
          away.played += 1

          home.goalsFor += match.homeScore
          home.goalsAgainst += match.awayScore
          away.goalsFor += match.awayScore
          away.goalsAgainst += match.homeScore

          if (match.homeScore > match.awayScore) {
            home.wins += 1
            away.losses += 1
            home.points += 3
          } else if (match.homeScore < match.awayScore) {
            away.wins += 1
            home.losses += 1
            away.points += 3
          } else {
            home.draws += 1
            away.draws += 1
            home.points += 1
            away.points += 1
          }
        })

      table.forEach((item) => {
        item.goalDiff = item.goalsFor - item.goalsAgainst
      })

      table.sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points
        if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff
        if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor
        return a.teamName.localeCompare(b.teamName, 'zh-TW')
      })

      table.forEach((item, index) => {
        item.rank = index + 1
      })

      standingsByGroup[group] = table
    })

    return standingsByGroup
  }

  const standingsByGroup = computed(() => {
    ensureFixtures()
    return buildStandings()
  })

  const groupFixtures = computed(() => {
    ensureFixtures()
    const grouped: Record<string, MatchResult[]> = {}

    Object.values(matchResults.value).forEach((match) => {
      if (!grouped[match.group]) {
        grouped[match.group] = []
      }
      const groupMatches = grouped[match.group]
      if (groupMatches) {
        groupMatches.push(match)
      }
    })

    Object.keys(grouped).forEach((group) => {
      const groupMatches = grouped[group]
      if (!groupMatches) {
        return
      }

      groupMatches.sort((a, b) => {
        const dateCompare = a.date.localeCompare(b.date)
        if (dateCompare !== 0) return dateCompare
        return a.time.localeCompare(b.time)
      })
    })

    return grouped
  })

  const setMatchResult = (matchKey: string, homeScore: number, awayScore: number) => {
    ensureFixtures()
    const match = matchResults.value[matchKey]
    if (!match) {
      return
    }

    match.homeScore = Math.max(0, Math.floor(homeScore))
    match.awayScore = Math.max(0, Math.floor(awayScore))
    match.played = true
  }

  const setMatchResultByInfo = (
    group: string,
    date: string,
    time: string,
    homeTeam: string,
    awayTeam: string,
    homeScore: number,
    awayScore: number
  ) => {
    const matchKey = createMatchKey(group, date, time, homeTeam, awayTeam)
    setMatchResult(matchKey, homeScore, awayScore)
  }

  const clearMatchResult = (matchKey: string) => {
    ensureFixtures()
    const match = matchResults.value[matchKey]
    if (!match) {
      return
    }

    match.homeScore = 0
    match.awayScore = 0
    match.played = false
  }

  const resetAllResults = () => {
    ensureFixtures()
    Object.values(matchResults.value).forEach((match) => {
      match.homeScore = 0
      match.awayScore = 0
      match.played = false
    })
  }

  // 本機測試用：可快速產生一批已完賽的假資料
  const seedMockResults = (seed = 2026) => {
    ensureFixtures()

    const pseudoRandom = (input: string) => {
      let hash = seed
      for (let i = 0; i < input.length; i += 1) {
        hash = (hash * 31 + input.charCodeAt(i)) % 2147483647
      }
      return hash
    }

    Object.values(matchResults.value).forEach((match) => {
      const base = pseudoRandom(match.key)
      match.homeScore = base % 5
      match.awayScore = Math.floor(base / 7) % 5
      match.played = true
    })
  }

  ensureFixtures()

  return {
    matchResults,
    groupFixtures,
    standingsByGroup,
    setMatchResult,
    setMatchResultByInfo,
    clearMatchResult,
    resetAllResults,
    seedMockResults
  }
})