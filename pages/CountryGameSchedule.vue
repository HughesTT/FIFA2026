<template>
  <div class="game-container">
    <BackHome />
    <Standings />
    <div v-if="!currentTeam" class="schedule-container-inner">
      <div class="schedule-card">
        <div class="no-data">找不到球隊資料</div>
      </div>
    </div>

    <div v-else class="schedule-container">
      <div class="schedule-card">
        <button class="back-home-btn" @click="goback">
          <span class="arrow">←</span>
          <span> 回上頁</span>
        </button>

        <div class="header">
          <img :src="currentTeam.teamFlag" :alt="currentTeam.teamName" class="team-flag-large">
          <h2>{{ currentTeam.teamName }}國家隊賽程</h2>
        </div>

        <div v-if="countryGameSchedule.length === 0 && teamCode" class="no-data">目前沒有賽程資料</div>

        <div v-else class="matches-list">
          <div v-for="(match, index) in uniqueMatches" :key="match.matchId" class="match-item">
            <div class="match-number">第 {{ index + 1 }} 場</div>
            <div class="match-info">
              <div class="match-datetime">
                <span class="date">{{ formatDate(match.matchDate) }}</span>
                <span class="time">{{ match.matchTime }}</span>
              </div>

              <div class="match-teams">
                <div class="team home" @click="viewCountryGameSchedule(match.homeAway.code)">
                  <img :src="match.homeAway.flag" :alt="match.homeAway.name" class="team-flag">
                  <span class="team-name">{{ match.homeAway.name }}</span>
                </div>

                <div class="score-or-vs">
                  <div v-if="match.homeScore !== null && match.awayScore !== null" class="match-score">
                    <span class="score-num" :class="{ 'winner': match.homeScore > match.awayScore }">
                      {{ match.homeScore }}
                    </span>
                    <span class="score-divider">-</span>
                    <span class="score-num" :class="{ 'winner': match.awayScore > match.homeScore }">
                      {{ match.awayScore }}
                    </span>
                  </div>

                  <div v-else class="vs">VS</div>
                </div>

                <div class="team away" @click="viewCountryGameSchedule(match.awayTeam.code)">
                  <img :src="match.awayTeam.flag" :alt="match.awayTeam.name" class="team-flag">
                  <span class="team-name">{{ match.awayTeam.name }}</span>
                </div>
              </div>

              <div class="match-stage">{{ match.stage }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTeamStore } from '~/store/teamStore'
import { useGroupStandings } from '~/composable/useGroupStandings'

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
      matchDate: match.date,
      matchTime: match.time,
      homeScore: match.homeScore,
      awayScore: match.awayScore,
      homeAway: {
        name: match.homeTeam,
        flag: match.homeFlag,
        code: homeTeamInfo?.teamCode || ''
      },
      awayTeam: {
        name: match.awayTeam,
        flag: match.awayFlag,
        code: awayTeamInfo?.teamCode || ''
      }
    }
  })

  // 2. 🌟 關鍵過濾：只保留「主隊代碼」或「客隊代碼」等於當前網址 teamCode 的比賽
  return allGroupMatches.filter(match =>
    match.homeAway.code === route.query.teamCode ||
    match.awayTeam.code === route.query.teamCode
  )
})
// 取得目前球隊的賽程
const countryGameSchedule = computed(() => {
  const teamCode = route.query.teamCode
  const team = teamStore.teams.find(t => t.teamCode === teamCode)
  return team ? team.teamGameSchedule : []
})

// 將 teamCode 改為 computed，使其響應路由變化產生資料更新
const teamCode = computed(() => route.query.teamCode || '')

// 取得目前球隊資訊
const currentTeam = computed(() => {
  return teamStore.teams.find(team => team.teamCode === teamCode.value)
})
// 🌟 加入這行保險：如果網址沒傳 group，就用查到的球隊組別強行補上去給戰績表看
if (currentTeam.value && !route.query.group) {
  route.query.group = currentTeam.value.teamGroup
}
// 取得目前球隊的賽程
// const countryGameSchedule = computed(() => {
//   return currentTeam.value?.teamGameSchedule || [] // 如果 currentTeam 為 undefined，則回傳空陣列
// })

// 點擊球隊時顯示比賽日程
const viewCountryGameSchedule = (teamCode) => {
  console.log(`顯示 ${teamCode} 的比賽日程`)
  // 🌟 修改這裡：在 query 中多帶入 group 參數
  router.push({
    path: '/CountryGameSchedule',
    query: {
      teamCode,
      group: group.value
    }
  })
}

// 日期格式化
const formatDate = (dateStr) => {
  const date = new Date(dateStr) // 將日期字串轉換
  return date.toLocaleDateString('zh-TW', {
    month: '2-digit', // 顯示兩位數的月份
    day: 'numeric', // 顯示數字的日期
    weekday: 'short' // 顯示簡短的星期幾名稱
  })
}

// 返回上一頁
const goback = () => {
  router.go(-1) // 返回上一頁
}

</script>

<style lang="scss" scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
}

.schedule-container-inner {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

.schedule-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;

  @media (max-width: 768px) {
    padding: 20px;
  }
}

.back-home-btn {
  position: absolute;
  z-index: 10;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 10px;
  background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
  z-index: 10;

  .arrow {
    font-size: 20px;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.5);

    .arrow {
      transform: translateX(-4px);
    }
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    top: 15px;
    right: 15px;
    padding: 8px 16px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 13px;
    gap: 6px;

    .arrow {
      font-size: 16px;
    }

    span:last-child {
      display: none;
    }
  }
}

.header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  padding-top: 40px;
  border-bottom: 2px solid #e0e0e0;

  .team-flag-large {
    width: 80px;
    height: 54px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  h2 {
    font-size: 28px;
    color: #2c3e50;
    margin: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding-top: 50px;

    h2 {
      font-size: 24px;
    }
  }

  @media (max-width: 480px) {
    padding-top: 40px;
  }
}

.no-data {
  text-align: center;
  padding: 40px;
  color: #999;
  font-size: 18px;
}

.matches-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    gap: 15px;
  }
}

.match-item {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
}

.match-number {
  position: absolute;
  top: 15px;
  right: 20px;
  background: #3498db;
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
}

.match-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.match-datetime {
  display: flex;
  gap: 15px;
  align-items: center;

  .date {
    font-size: 1rem;
    font-weight: 600;
    color: #2c3e50;
    background: #e9e0fa;
    text-align: center;
    padding: 2px 12px;
    border-radius: 12px;
  }

  .time {
    background: #ffe5e5;
    color: #e74c3c;
    padding: 4px 12px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }
}

.match-teams {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 15px;
  width: 100%;

  @media (max-width: 480px) {
    gap: 8px;
  }
}

.score-or-vs {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;

  .match-score {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 22px;
    font-weight: 700;
    color: #2c3e50;
    background: #f8f9fa;
    padding: 4px 12px;
    border-radius: 6px;
    border: 1px solid #e9ecef;

    .score-divider {
      color: #95a5a6;
      font-size: 16px;
    }

    .score-num {
      color: #7f8c8d;

      &.winner {
        color: #2c3e50;
        font-weight: 800;
      }
    }
  }

  .vs {
    font-size: 18px;
    font-weight: bold;
    color: #95a5a6;
  }
}

.team {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-width: 80px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;

  &:hover {
    background: rgba(52, 152, 219, 0.05);
    border: 2px solid #3498db;
    transform: scale(1.02);
  }

  .team-flag {
    width: 48px;
    height: 32px;
    display: block;
    /* object-fit: cover; */
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    flex-shrink: 0;
    /* 防止圖片被壓縮 */
  }

  .team-name {
    font-size: 18px;
    font-weight: 600;
    color: #2c3e50;
    /* white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; */
  }

  &.home {
    text-align: center;
  }

  &.away {
    text-align: center;
  }

  @media (max-width: 768px) {
    .team-name {
      font-size: 18px;
    }

    .team-flag {
      width: 48px;
      height: 32px;
    }
  }

  @media (max-width: 480px) {
    padding: 8px;
    gap: 8px;

    .team-name {
      font-size: 18px;
    }

    .team-flag {
      width: 48px;
      height: 32px;
    }
  }
}

.vs {
  font-weight: bold;
  color: #e74c3c;
  font-size: 20px;
  padding: 8px 16px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 6px 12px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 4px 8px;
  }
}

.match-stage {
  text-align: center;
  color: #7f8c8d;
  font-size: 14px;
  font-weight: 500;
}
</style>
