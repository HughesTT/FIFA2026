import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useTeamStore } from '~/store/teamStore'
import type { knockoutMatch } from '~/types/knockoutResults'

export const useknockoutStore = defineStore('knockoutStore', () => {
    const teamStore = useTeamStore()
    
    // 將對戰資料與 teamStore 進行動態資訊綁定
    const matchesWithInfo = computed(() => {
        return matches.value.map(match => ({
            ...match,
            // 透過 code 去 teamStore 尋找對應的球隊資訊
            homeTeam: {
                ...match.homeTeam,
                ...(teamStore.teams.find(t => t.teamCode === match.homeTeam.teamCode) || {})
            },
            awayTeam: {
                ...match.awayTeam,
                ...(teamStore.teams.find(t => t.teamCode === match.awayTeam.teamCode) || {})
            }
        }))
    })

    const matches = ref<knockoutMatch[]>([
        // 32強對戰組合
        {
            matchId: 'R32-1',
            stage: 'R32',
            fifaMatchId: '73',
            stageLabel: '32強',
            date: '2026-06-29',
            time: '03:00',
            homeTeam: { teamName: '2A', teamCode: 'ZA', teamFlag: ''},
            awayTeam: { teamName: '2B', teamCode: 'CA', teamFlag: ''},
            homeScore: 0,
            awayScore: 1,
            homePenaltyScore: null,
            awayPenaltyScore: null,
            nextMatchId: 'R16-2',
            nextMatchSlot: 'home',
            side: 'left',
            isWinner: 'CA'
        },
        {
            matchId: 'R32-2',
            stage: 'R32',
            fifaMatchId: '75',
            stageLabel: '32強',
            date: '2026-06-30',
            time: '09:00',
            homeTeam: { teamName: '1F', teamCode: 'NL', teamFlag: ''},
            awayTeam: { teamName: '2C', teamCode: 'MA', teamFlag: ''},
            homeScore: 1,
            awayScore: 1,
            homePenaltyScore: 2,
            awayPenaltyScore: 3,
            nextMatchId: 'R16-2',
            nextMatchSlot: 'away',
            side: 'left',
            isWinner: 'MA'
        },
        
        {
            matchId: 'R32-3',
            stage: 'R32',
            fifaMatchId: '74',
            stageLabel: '32強',
            date: '2026-06-30',
            time: '04:30',
            homeTeam: { teamName: '1E', teamCode: 'DE', teamFlag: ''},
            awayTeam: { teamName: '3ABCDF', teamCode: 'PY', teamFlag: ''},
            homeScore: 1,
            awayScore: 1,
            homePenaltyScore: 3,
            awayPenaltyScore: 4,
            nextMatchId: 'R16-2',
            nextMatchSlot: 'home',
            side: 'left',
            isWinner: 'PY'
        },
        {
            matchId: 'R32-4',
            stage: 'R32',
            fifaMatchId: '77',
            stageLabel: '32強',
            date: '2026-07-01',
            time: '05:00',
            homeTeam: { teamName: '1I', teamCode: 'FR', teamFlag: ''},
            awayTeam: { teamName: '3CDFGH', teamCode: 'SE', teamFlag: ''},
            homeScore: 3,
            awayScore: 0,
            homePenaltyScore: null,
            awayPenaltyScore: null,
            nextMatchId: 'R16-4',
            nextMatchSlot: 'away',
            side: 'left',
            isWinner: 'FR'
        },
        {
            matchId: 'R32-5',
            stage: 'R32',
            fifaMatchId: '83',
            stageLabel: '32強',
            date: '2026-07-03',
            time: '07:00',
            homeTeam: { teamName: '2K', teamCode: 'PT', teamFlag: ''},
            awayTeam: { teamName: '2L', teamCode: 'HR', teamFlag: ''},
            homeScore: 2,
            awayScore: 1,
            homePenaltyScore: null,
            awayPenaltyScore: null,
            nextMatchId: 'R16-4',
            nextMatchSlot: 'home',
            side: 'right',
            isWinner: 'PT'
        },
        {
            matchId: 'R32-6',
            stage: 'R32',
            fifaMatchId: '84',
            stageLabel: '32強',
            date: '2026-07-03',
            time: '03:00',
            homeTeam: { teamName: '1H', teamCode: 'ES', teamFlag: ''},
            awayTeam: { teamName: '2J', teamCode: 'AT', teamFlag: ''},
            homeScore: 3,
            awayScore: 0,
            homePenaltyScore: null,
            awayPenaltyScore: null,
            nextMatchId: 'R16-3',
            nextMatchSlot: 'away',
            side: 'right',
            isWinner: 'ES'
        },
        {
            matchId: 'R32-7',
            stage: 'R32',
            fifaMatchId: '81',
            stageLabel: '32強',
            date: '2026-07-02',
            time: '08:00',
            homeTeam: { teamName: '1D', teamCode: 'US', teamFlag: ''},
            awayTeam: { teamName: '3BEFIJ', teamCode: 'BA', teamFlag: ''},
            homeScore: 2,
            awayScore: 0,
            homePenaltyScore: null,
            awayPenaltyScore: null,
            nextMatchId: 'R16-2',
            nextMatchSlot: 'home',
            side: 'right',
            isWinner: 'US'
        },
        {
            matchId: 'R32-8',
            stage: 'R32',
            fifaMatchId: '82',
            stageLabel: '32強',
            date: '2026-07-02',
            time: '04:00',
            homeTeam: { teamName: '1G', teamCode: 'BE', teamFlag: ''},
            awayTeam: { teamName: '3AEHIJ', teamCode: 'SN', teamFlag: ''},
            homeScore: 3,
            awayScore: 2,
            homePenaltyScore: null,
            awayPenaltyScore: null,
            nextMatchId: 'R16-1',
            nextMatchSlot: 'away',
            side: 'right',
            isWinner: 'BE'
        },
        {
            matchId: 'R32-9',
            stage: 'R32',
            fifaMatchId: '76',
            stageLabel: '32強',
            date: '2026-06-30',
            time: '01:00',
            homeTeam: { teamName: '1C', teamCode: 'BR', teamFlag: ''},
            awayTeam: { teamName: '2F', teamCode: 'JP', teamFlag: ''},
            homeScore: 2,
            awayScore: 1,
            homePenaltyScore: null,
            awayPenaltyScore: null,
            nextMatchId: 'R16-3',
            nextMatchSlot: 'away',
            side: 'left',
            isWinner: 'BR'
        },
        {
            matchId: 'R32-10',
            stage: 'R32',
            fifaMatchId: '78',
            stageLabel: '32強',
            date: '2026-07-01',
            time: '01:00',
            homeTeam: { teamName: '2E', teamCode: 'CI', teamFlag: ''},
            awayTeam: { teamName: '2I', teamCode: 'NO', teamFlag: ''},
            homeScore: 1,
            awayScore: 2,
            homePenaltyScore: null,
            awayPenaltyScore: null,
            nextMatchId: 'R16-4',
            nextMatchSlot: 'away',
            side: 'left',
            isWinner: 'NO'
        },
        {
            matchId: 'R32-11',
            stage: 'R32',
            fifaMatchId: '79',
            stageLabel: '32強',
            date: '2026-07-01',
            time: '09:00',
            homeTeam: { teamName: '1A', teamCode: 'MX', teamFlag: ''},
            awayTeam: { teamName: '3CEFHI', teamCode: 'EC', teamFlag: ''},
            homeScore: 2,
            awayScore: 0,
            homePenaltyScore: null,
            awayPenaltyScore: null,
            nextMatchId: 'R16-4',
            nextMatchSlot: 'home',
            side: 'left',
            isWinner: 'MX'
        },
        {
            matchId: 'R32-12',
            stage: 'R32',
            fifaMatchId: '80',
            stageLabel: '32強',
            date: '2026-07-02',
            time: '00:00',
            homeTeam: { teamName: '1L', teamCode: 'GB', teamFlag: ''},
            awayTeam: { teamName: '3EHIJK', teamCode: 'CD', teamFlag: ''},
            homeScore: 2,
            awayScore: 1,
            homePenaltyScore: null,
            awayPenaltyScore: null,
            nextMatchId: 'R16-4',
            nextMatchSlot: 'away',
            side: 'left',
            isWinner: 'GB'
        },
        {
            matchId: 'R32-13',
            stage: 'R32',
            fifaMatchId: '86',
            stageLabel: '32強',
            date: '2026-07-04',
            time: '06:00',
            homeTeam: { teamName: '1J', teamCode: 'AR', teamFlag: ''},
            awayTeam: { teamName: '2H', teamCode: 'CV', teamFlag: ''},
            homeScore: null,
            awayScore: null,
            homePenaltyScore: null,
            awayPenaltyScore: null,
            nextMatchId: 'R16-7',
            nextMatchSlot: 'home',
            side: 'right',
            isWinner: ''
        },    
        {
            matchId: 'R32-14',
            stage: 'R32',
            fifaMatchId: '88',
            stageLabel: '32強',
            date: '2026-07-04',
            time: '02:00',
            homeTeam: { teamName: '2D', teamCode: 'AU', teamFlag: ''},
            awayTeam: { teamName: '2G', teamCode: 'EG', teamFlag: ''},
            homeScore: null,
            awayScore: null,
            homePenaltyScore: null,
            awayPenaltyScore: null,
            nextMatchId: 'R16-6',
            nextMatchSlot: 'away',
            side: 'right',
            isWinner: ''
        },
        {
            matchId: 'R32-16',
            stage: 'R32',
            fifaMatchId: '85',
            stageLabel: '32強',
            date: '2026-07-03',
            time: '11:00',
            homeTeam: { teamName: '1B', teamCode: 'CH', teamFlag: ''},
            awayTeam: { teamName: '3EFGIJ', teamCode: 'DZ', teamFlag: ''},
            homeScore: 2,
            awayScore: 0,
            homePenaltyScore: null,
            awayPenaltyScore: null,
            nextMatchId: 'R16-5',
            nextMatchSlot: 'home',
            side: 'right',
            isWinner: 'CH'
        },
        {
            matchId: 'R32-15',
            stage: 'R32',
            fifaMatchId: '87',
            stageLabel: '32強',
            date: '2026-07-04',
            time: '09:30',
            homeTeam: { teamName: '1K', teamCode: 'CO', teamFlag: ''},
            awayTeam: { teamName: '3DEIJL', teamCode: 'GH', teamFlag: ''},
            homeScore: null,
            awayScore: null,
            homePenaltyScore: null,
            awayPenaltyScore: null,
            nextMatchId: 'R16-8',
            nextMatchSlot: 'away',
            side: 'right',
            isWinner: ''
        },
        // 16強對戰組合
        {
            matchId: 'R16-1',
            stage: 'R16',
            fifaMatchId: '90',
            stageLabel: '16強',
            date: '2026-07-05',
            time: '01:00',
            homeTeam: { teamName: 'W73', teamCode: 'CA', teamFlag: ''},
            awayTeam: { teamName: 'W75', teamCode: 'MA', teamFlag: ''},
            homeScore: 0,
            awayScore: 3,
            homePenaltyScore: null,
            awayPenaltyScore: null,
            nextMatchId: 'QF-1',
            nextMatchSlot: 'home',
            side: 'left',
            isWinner: ''
        },
        {
            matchId: 'R16-2',
            stage: 'R16',
            fifaMatchId: '89',
            stageLabel: '16強',
            date: '2026-07-05',
            time: '05:00',
            homeTeam: { teamName: 'W74', teamCode: 'PY', teamFlag: ''},
            awayTeam: { teamName: 'W77', teamCode: 'FR', teamFlag: ''},
            homeScore: 0,
            awayScore: 1,
            homePenaltyScore: null,
            awayPenaltyScore: null,
            nextMatchId: 'QF-1',
            nextMatchSlot: 'away',
            side: 'left',
            isWinner: ''
        },
        {
            matchId: 'R16-3',
            stage: 'R16',
            fifaMatchId: '93',
            stageLabel: '16強',
            date: '2026-07-07',
            time: '03:00',
            homeTeam: { teamName: 'W83', teamCode: 'PT', teamFlag: ''},
            awayTeam: { teamName: 'W84', teamCode: 'ES', teamFlag: ''},
            homeScore: 0,
            awayScore: 1,
            homePenaltyScore: null,
            awayPenaltyScore: null,
            nextMatchId: 'QF-1',
            nextMatchSlot: 'home',
            side: 'right',
            isWinner: ''
        },
        {
            matchId: 'R16-4',
            stage: 'R16',
            fifaMatchId: '94',
            stageLabel: '16強',
            date: '2026-07-07',
            time: '08:00',
            homeTeam: { teamName: 'W81', teamCode: 'US', teamFlag: ''},
            awayTeam: { teamName: 'W82', teamCode: 'BE', teamFlag: ''},
            homeScore: 1,
            awayScore: 4,
            homePenaltyScore: null,
            awayPenaltyScore: null,
            nextMatchId: 'QF-1',
            nextMatchSlot: 'away',
            side: 'right',
            isWinner: ''
        },
        {
            matchId: 'R16-5',
            stage: 'R16',
            fifaMatchId: '93',
            stageLabel: '16強',
            date: '2026-07-06',
            time: '04:00',
            homeTeam: { teamName: 'W76', teamCode: 'BR', teamFlag: ''},
            awayTeam: { teamName: 'W78', teamCode: 'NO', teamFlag: ''},
            homeScore: 1,
            awayScore: 2,
            homePenaltyScore: null,
            awayPenaltyScore: null,
            nextMatchId: 'QF-1',
            nextMatchSlot: 'home',
            side: 'left',
            isWinner: ''
        },
        {
            matchId: 'R16-6',
            stage: 'R16',
            fifaMatchId: '92',
            stageLabel: '16強',
            date: '2026-07-06',
            time: '08:00',
            homeTeam: { teamName: 'W79', teamCode: 'MX', teamFlag: ''},
            awayTeam: { teamName: 'W80', teamCode: 'GB', teamFlag: ''},
            homeScore: 2,
            awayScore: 3,
            homePenaltyScore: null,
            awayPenaltyScore: null,
            nextMatchId: 'QF-1',
            nextMatchSlot: 'away',
            side: 'left',
            isWinner: ''
        },
        {
            matchId: 'R16-7',
            stage: 'R16',
            fifaMatchId: '95',
            stageLabel: '16強',
            date: '2026-07-08',
            time: '00:00',
            homeTeam: { teamName: 'W86', teamCode: 'AR', teamFlag: ''},
            awayTeam: { teamName: 'W88', teamCode: 'EG', teamFlag: ''},
            homeScore: null,
            awayScore: null,
            homePenaltyScore: null,
            awayPenaltyScore: null,
            nextMatchId: 'QF-1',
            nextMatchSlot: 'home',
            side: 'right',
            isWinner: ''
        },
        {
            matchId: 'R16-8',
            stage: 'R16',
            fifaMatchId: '96',
            stageLabel: '16強',
            date: '2026-07-08',
            time: '04:00',
            homeTeam: { teamName: 'W85', teamCode: 'CH', teamFlag: ''},
            awayTeam: { teamName: 'W87', teamCode: 'CO', teamFlag: ''},
            homeScore: null,
            awayScore: null,
            homePenaltyScore: null,
            awayPenaltyScore: null,
            nextMatchId: 'QF-1',
            nextMatchSlot: 'away',
            side: 'right',
            isWinner: ''
        },
        // 8強對戰組合
        {
            matchId: 'QF-1',
            stage: 'QF',
            fifaMatchId: '97',
            stageLabel: '8強',
            date: '2026-07-10',
            time: '04:00',
            homeTeam: { teamName: 'W89', teamCode: 'FR', teamFlag: ''},
            awayTeam: { teamName: 'W90', teamCode: 'MA', teamFlag: ''},
            homeScore: null,
            awayScore: null,
            homePenaltyScore: null,
            awayPenaltyScore: null,
            nextMatchId: 'SF-1',
            nextMatchSlot: 'home',
            side: 'left',
            isWinner: ''
        },
        {
            matchId: 'QF-2',
            stage: 'QF',
            fifaMatchId: '98',
            stageLabel: '8強',
            date: '2026-07-11',
            time: '03:00',
            homeTeam: { teamName: 'W93', teamCode: 'ES', teamFlag: ''},
            awayTeam: { teamName: 'W94', teamCode: 'BE', teamFlag: ''},
            homeScore: null,
            awayScore: null,
            homePenaltyScore: null,
            awayPenaltyScore: null,
            nextMatchId: 'SF-1',
            nextMatchSlot: 'away',
            side: 'left',
            isWinner: ''
        },
        {
            matchId: 'QF-3',
            stage: 'QF',
            fifaMatchId: '99',
            stageLabel: '8強',
            date: '2026-07-12',
            time: '05:00',
            homeTeam: { teamName: 'W91', teamCode: 'NO', teamFlag: ''},
            awayTeam: { teamName: 'W92', teamCode: 'GB', teamFlag: ''},
            homeScore: null,
            awayScore: null,
            homePenaltyScore: null,
            awayPenaltyScore: null,
            nextMatchId: 'SF-2',
            nextMatchSlot: 'home',
            side: 'right',
            isWinner: ''
        },
        {
            matchId: 'QF-4',
            stage: 'QF',
            fifaMatchId: '100',
            stageLabel: '8強',
            date: '2026-07-12',
            time: '09:00',
            homeTeam: { teamName: 'W95', teamCode: '', teamFlag: ''},
            awayTeam: { teamName: 'W96', teamCode: '', teamFlag: ''},
            homeScore: null,
            awayScore: null,
            homePenaltyScore: null,
            awayPenaltyScore: null,
            nextMatchId: 'SF-2',
            nextMatchSlot: 'away',
            side: 'right',
            isWinner: ''
        },
        // 4強對戰組合
        {
            matchId: 'SF-1',
            stage: 'SF',
            fifaMatchId: '101',
            stageLabel: '4強',
            date: '2026-07-15',
            time: '03:00',
            homeTeam: { teamName: 'W97', teamCode: '', teamFlag: ''},
            awayTeam: { teamName: 'W98', teamCode: '', teamFlag: ''},
            homeScore: null,
            awayScore: null,
            homePenaltyScore: null,
            awayPenaltyScore: null,
            nextMatchId: 'Final',
            nextMatchSlot: 'home',
            side: 'left',
            isWinner: ''
        },
        {
            matchId: 'SF-2',
            stage: 'SF',
            fifaMatchId: '102',
            stageLabel: '4強',
            date: '2026-07-16',
            time: '03:00',
            homeTeam: { teamName: 'W99', teamCode: '', teamFlag: ''},
            awayTeam: { teamName: 'W100', teamCode: '', teamFlag: ''},
            homeScore: null,
            awayScore: null,
            homePenaltyScore: null,
            awayPenaltyScore: null,
            nextMatchId: 'Final',
            nextMatchSlot: 'away',
            side: 'left',
            isWinner: ''
        },
        // 季軍戰
        {
            matchId: 'ThirdPlace',
            stage: 'ThirdPlace',
            fifaMatchId: '103',
            stageLabel: '季軍戰',
            date: '2026-07-19',
            time: '05:00',
            homeTeam: { teamName: 'L101', teamCode: '', teamFlag: ''},
            awayTeam: { teamName: 'L102', teamCode: '', teamFlag: ''},
            homeScore: null,
            awayScore: null,
            homePenaltyScore: null,
            awayPenaltyScore: null,
            nextMatchId: null,
            side: 'left',
            isWinner: ''
        },
        // 決賽
        {
            matchId: 'Final',
            fifaMatchId: '104',
            stage: 'Final',
            stageLabel: '決賽',
            date: '2026-07-20',
            time: '03:00',
            homeTeam: { teamName: 'W101', teamCode: '', teamFlag: ''},
            awayTeam: { teamName: 'W102', teamCode: '', teamFlag: ''},
            homeScore: null,
            awayScore: null,
            homePenaltyScore: null,
            awayPenaltyScore: null,
            nextMatchId: null,
            side: 'left',
            isWinner: ''
        }
    ])

    // 整理成 UI 渲染的結構
    const matchesByStage = computed(() => {
        const stages: Record<string, knockoutMatch[]> = { // 定義每個階段的比賽陣列
            R32: [],
            R16: [],
            QF: [],
            SF: [],
            Final: [],
            ThirdPlace: []
        }
        matchesWithInfo.value.forEach(m => { // 使用 forEach 檢查所有比賽，將依據條件放入對應階段的陣列
            if (stages[m.stage]) stages[m.stage].push(m) // stages[m.stage] 動態分配
        })
        return stages
    })

    // 更新比賽結果並自動傳遞晉級隊伍
    const updateMatchResult = (
        matchId: string,
        homeScore: number,
        awayScore: number,
        homePenalty?: number,
        awayPenalty?: number,
    ) => {
        const match = matches.value.find(m => m.matchId === matchId) // match 為符合 matchId 的比賽
        if (!match) return

        match.homeScore = homeScore
        match.awayScore = awayScore
        match.homePenaltyScore = homePenalty ?? null
        match.awayPenaltyScore = awayPenalty ?? null

        // 判定勝隊
        let winner: typeof match.homeTeam | null = null
        if (homeScore > awayScore) {
            winner = match.homeTeam
        } else if (awayScore > homeScore) {
            winner = match.awayTeam
        } else if (homePenalty !== undefined && awayPenalty !== undefined) {
            winner = homePenalty > awayPenalty ? match.homeTeam : match.awayTeam
        }
        if (winner && match.winnerCode !== winner.teamCode) {
            match.winnerCode = winner.teamCode

            // 自動晉級
            if (match.nextMatchId && match.nextMatchSlot) {
                const nextMatch = matches.value.find(m => m.matchId === match.nextMatchId)
                if (nextMatch) {
                    if (match.nextMatchSlot === 'home') {
                        nextMatch.homeTeam = { ...winner }
                    } else {
                        nextMatch.awayTeam = { ...winner }
                    }
                }
            }
        }
    }

    // 日期格式化
    const formatDate = (dateStr) => {
        const date = new Date(dateStr) // 將日期字串轉換
        return date.toLocaleDateString('zh-TW', {
        month: '2-digit', // 顯示兩位數的月份
        day: 'numeric', // 顯示數字的日期
        weekday: 'short', // 顯示簡短的星期幾名稱
        timeZone: 'Asia/Taipei' // 強制前後端時區一致
        })
    }
    
    return {
        matchesByStage,
        updateMatchResult,
        matchesWithInfo,
        matches,
        formatDate
    }
})
