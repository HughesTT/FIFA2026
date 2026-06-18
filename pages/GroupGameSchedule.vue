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

      <div class="matches-list">
        <MatchCard v-for="match in (countryCode ? countryGameSchedule : uniqueMatches)" :key="match.matchId"
          :match="match" @team-click="viewCountryGameSchedule" />
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

// 返回上一頁
const goback = () => {
  router.go(-1)
}
</script>

<style lang="scss">
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

.game-card {
  max-width: 850px;
  width: 100%;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;

  /* 平板以下改成一列一個 */
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    padding: 20px;
  }

  @media (max-width: 768px) {
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

.matches-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.game-title {
  text-align: left;
  color: #2c3e50;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  padding-left: 1.5rem;

  @media (max-width: 768px) {
    font-size: 24px;
  }
}
</style>
