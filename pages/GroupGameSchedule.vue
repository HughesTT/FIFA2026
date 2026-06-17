<template>
  <div class="game-container">
    <BackHome />
    <Standings />
    <div class="game-card">
      <button class="back-home-btn" @click="goback">
        <span class="arrow">←</span>
        <span> 回上頁</span>
      </button>

      <div class="game-title">{{ group }} 組賽程</div>
      <div v-for="match in uniqueMatches" v-if="!countryCode" :key="match.matchId" class="match-item">
        <div class="match-header">
          <span class="match-date">{{ formatDate(match.matchDate) }}</span>
          <span class="match-time">{{ match.matchTime }}</span>
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
      </div>
      <div v-for="match in countryGameSchedule" v-else :key="match.matchId" class="match-item">
        <div class="match-header">
          <span class="match-date">{{ formatDate(match.date) }}</span>
          <span class="match-time">{{ match.time }}</span>
        </div>

        <div class="match-teams">
          <div v-if="match.homeAway" class="team home">
            <img :src="match.homeAway.flag" :alt="match.homeAway.name" class="team-flag">
            <span class="team-name">{{ match.homeAway.name }}</span>
            <span class="team-score">
              {{ enhancedMatches.homeScore }}
            </span>
          </div>

          <div class="vs">VS</div>

          <div v-if="!match.homeAway" class="team away">
            <img :src="match.awayTeam.flag" :alt="match.awayTeam.name" class="team-flag">
            <span class="team-name">{{ match.awayTeam.name }}</span>
            <span class="team-score">
              {{ enhancedMatches.awayScore }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTeamStore } from '~/store/teamStore' // 根據分組從 teamStore 中取得對應的球隊資料
import { useGroupStandings } from '~/composable/useGroupStandings' // 引入 useGroupStandings composable，獲取比賽資料

const teamStore = useTeamStore()
const route = useRoute()
const router = useRouter()
const group = computed(() => route.query.group || '組')

// 🌟 保留原本第 74 行的宣告，不再重複宣告 const countryCode
const countryCode = route.query.teamCode || ''

// 呼叫戰 useGroupStandings，傳入目前的組別
const { enhancedMatches } = useGroupStandings(group)

// 將 enhancedMatches，重新轉換成原本 Template 所期待的巢狀結構
const uniqueMatches = computed(() => {
  return enhancedMatches.value.map(match => {
    // 查詢主客隊的完整資訊（用來補齊點擊所需的國家代碼 code）
    const homeTeamInfo = teamStore.teams.find(t => t.teamName === match.homeTeam)
    const awayTeamInfo = teamStore.teams.find(t => t.teamName === match.awayTeam)

    return {
      matchId: match.matchId,
      matchDate: match.date, // 對齊樣板的 matchDate
      matchTime: match.time, // 對齊樣板的 matchTime
      homeScore: match.homeScore, // 注入主隊分數
      awayScore: match.awayScore, // 注入客隊分數
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

// 日期格式化
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-TW', {
    month: '2-digit',
    day: 'numeric',
    weekday: 'short'
  })
}

// 返回上一頁
const goback = () => {
  router.go(-1)
}
</script>

<style lang="scss" scoped>
body {
  font-family: 'Noto Sans TC', sans-serif;
  background: url('../public/img/8b3a7cbf-911c-4809-a084-368496c1d04c.webp') no-repeat center;
  background-size: cover;
  background-attachment: fixed;
  margin: 0;
  padding: 20px;
}

.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  /* 改為 top 對齊比較好 */
  padding: 20px;
  /* 🎯 讓戰績表在這邊也能獲得左右 20px 的安全間距 */
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
}

.game-card {
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  position: relative;

  /* 平板以下改成一列一個 */
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    padding: 20px;
  }

  @media (max-width: 768px) {
    padding: 15px;
    gap: 15px;
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

.game-title {
  grid-column: 1 / -1;
  text-align: left;
  color: #2c3e50;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  padding-left: 1.5rem;

  @media (max-width: 768px) {
    font-size: 24px;
    padding-left: 0;
  }
}

.match-item {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
}

.match-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #e0e0e0;
  color: #666;
  font-size: 14px;

  .match-date {
    font-size: 1rem;
    font-weight: 600;
    color: #2c3e50;
    background: #e9e0fa;
    text-align: center;
    padding: 2px 12px;
    border-radius: 12px;
  }

  .match-time {
    color: #e74c3c;
    font-weight: 600;
    background: #ffe5e5;
    padding: 4px 12px;
    border-radius: 12px;
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
      // 預設輸球或平手顏色稍微暗一點
      color: #7f8c8d;

      // 🌟 勝隊字體顏色變更為顯眼的深色/藍色
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
  font-size: 0.9rem;
  padding: 5px 16px;
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
</style>
