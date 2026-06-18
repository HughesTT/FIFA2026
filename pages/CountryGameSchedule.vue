<template>
  <div class="game-container">
    <BackHome />
    <Standings />
    <div v-if="!currentTeam" class="game-card">
      <div class="no-data">找不到球隊資料</div>
    </div>

    <div v-else class="game-card">
      <button class="back-home-btn" @click="goback">
        <span class="arrow">←</span>
        <span> 回上頁</span>
      </button>

      <div class="header">
        <img :src="currentTeam.teamFlag" :alt="currentTeam.teamName" class="team-flag-large">
        <h2>{{ currentTeam.teamName }}國家隊賽程</h2>
      </div>

      <div v-if="uniqueMatches.length === 0" class="no-data">目前沒有賽程資料</div>

      <div v-else class="matches-list">
        <MatchCard v-for="match in uniqueMatches" :key="match.matchId" :match="match"
          @team-click="viewCountryGameSchedule" />
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

  // 2. 🌟 關鍵過濾：只保留「主隊代碼」或「客隊代碼」等於當前網址 teamCode 的比賽
  return allGroupMatches.filter(match =>
    match.homeCode === route.query.teamCode ||
    match.awayCode === route.query.teamCode
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

// 返回上一頁
const goback = () => {
  router.go(-1) // 返回上一頁
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
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  @media (max-width: 480px) {
    gap: 12px;
  }

  @media (max-width: 768px) {
    gap: 15px;
  }
}
</style>
