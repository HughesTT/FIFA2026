<template>
  <div class="game-container">
    <div class="game-card">
      <button class="back-home-btn" @click="router.push('/')">
        <span class="arrow">←</span>
        <span>返回首頁</span>
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
            <span class="team-name">{{ match.homeAway.name
            }}</span>
          </div>

          <div class="vs">VS</div>

          <div class="team away" @click="viewCountryGameSchedule(match.awayTeam.code)">
            <img :src="match.awayTeam.flag" :alt="match.awayTeam.name" class="team-flag">
            <span class="team-name">{{ match.awayTeam.name
            }}</span>
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
          </div>

          <div class="vs">VS</div>

          <div v-if="!match.homeAway" class="team away">
            <img :src="match.awayTeam.flag" :alt="match.awayTeam.name" class="team-flag">
            <span class="team-name">{{ match.awayTeam.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTeamStore } from '~/store/teamStore'

const teamStore = useTeamStore()
const route = useRoute()
const router = useRouter()
const group = route.query.group || '未知分組' // 如果沒有傳遞分組參數，則顯示 "未知分組"
const countryCode = route.query.teamCode || '' // 如果沒有傳遞球隊代碼參數，則使用空字串
const teamsInGroup = teamStore.teams.filter(team => team.teamGroup === group) // 根據分組從 teamStore 中取得對應的球隊資料

// 將所有比賽資料存儲在一個 Map 中，相同日期與相同對戰隊伍的比賽只保留一筆
const uniqueMatches = computed(() => {
  const matches = new Map() // 定義 matches 為 Map 物件，用於存儲唯一的比賽資料
  teamsInGroup.forEach(team => {
    team.teamGameSchedule.forEach(schedule => {
      // 使用日期和對戰隊伍作為唯一依據
      const teams = [team.teamName, schedule.opponent].sort()
      const matchKey = `${group}-${schedule.date}-${schedule.time}-${teams[0]}-vs-${teams[1]}` // 定義 matchKey 為唯一的比賽識別鍵，包含分組、日期、時間和對戰隊伍資訊

      if (!matches.has(matchKey)) { // 如果 matches 當中沒有比賽資料，則新增一筆
        const opponent = teamStore.teams.find(t => t.teamName === schedule.opponent) // 從 teamStore 中尋找對戰隊伍的資料

        matches.set(matchKey, { // 定義比賽資料物件，包含日期、時間、對戰隊伍、主客場資訊等
          matchDate: schedule.date, // 比賽日期
          matchTime: schedule.time, // 比賽時間
          opponent: schedule.opponent, // 對戰隊伍名稱
          homeAway: schedule.homeAway ? { // 主客場資訊，homeAway 為 true 表示主場，false 表示客場
            name: team.teamName, // 主場名稱
            flag: team.teamFlag, // 主場國旗
            code: team.teamCode // 主場代碼
          } : {
            name: opponent?.teamName || schedule.opponent, // 客場名稱，如果 opponent 物件存在則使用其 teamName，否則使用 schedule.opponent
            flag: opponent?.teamFlag || '', // 客場國旗，如果 opponent 物件存在則使用其 teamFlag，否則使用空字串
            code: opponent?.teamCode || '' // 客場代碼，如果 opponent 物件存在則使用其 teamCode，否則使用空字串
          },
          awayTeam: schedule.homeAway ? { // 客場資訊，homeAway 為 true 表示主場，false 表示客場
            name: opponent?.teamName || schedule.opponent, // 客場名稱，如果 opponent 物件存在則使用其 teamName，否則使用 schedule.opponent
            flag: opponent?.teamFlag || '', // 客場國旗，如果 opponent 物件存在則使用其 teamFlag，否則使用空字串
            code: opponent?.teamCode || '' // 客場代碼，如果 opponent 物件存在則使用其 teamCode，否則使用空字串
          } : {
            name: team.teamName, // 主場名稱
            flag: team.teamFlag, // 主場國旗
            code: team.teamCode // 主場代碼
          }
        })
      }
    })
  })

  // 將 matches 轉換為陣列並根據日期和時間排序後回傳
  return Array.from(matches.values()).sort((a, b) => {
    const dateTimeA = new Date(`${a.matchDate}T${a.matchTime}`)
    const dateTimeB = new Date(`${b.matchDate}T${b.matchTime}`)
    return dateTimeA - dateTimeB
  })
})

const countryGameSchedule = computed(() => {
  const teamCode = route.query.teamCode
  const team = teamStore.teams.find(t => t.teamCode === teamCode)
  return team ? team.teamGameSchedule : []
})

const viewCountryGameSchedule = (teamCode) => {
  console.log(`顯示 ${teamCode} 的比賽日程`)
  router.push({ path: '/CountryGameSchedule', query: { teamCode } }) // 導向到球隊賽程葉面，並傳遞球隊代碼參數
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

</script>

<style lang="scss" scoped>
body {
  font-family: Arial, sans-serif;
  background: url('../public/img/8b3a7cbf-911c-4809-a084-368496c1d04c.webp') no-repeat center;
  background-size: cover;
  background-attachment: fixed;
  margin: 0;
  padding: 20px;
}

.game-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;

  /* 平板以下 */
  @media (max-width: 768px) {
    padding: 10px;
  }
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
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
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
  text-align: center;
  color: #2c3e50;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  padding-right: 140px;

  @media (max-width: 768px) {
    font-size: 24px;
    padding-right: 0;
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
    font-size: 1.1rem;
    font-weight: 600;
    color: #2c3e50;
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
  justify-content: space-between;
  gap: 15px;

  @media (max-width: 480px) {
    gap: 8px;
  }
}

.team {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
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
    object-fit: cover;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    flex-shrink: 0;
    /* 防止圖片被壓縮 */
  }

  .team-name {
    font-size: 18px;
    font-weight: 600;
    color: #2c3e50;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &.home {
    /* justify-content: flex-end; */
    text-align: right;
    flex-direction: row-reverse;
  }

  &.away {
    justify-content: flex-start;
  }

  @media (max-width: 768px) {
    .team-name {
      font-size: 16px;
    }

    .team-flag {
      width: 40px;
      height: 28px;
    }
  }

  @media (max-width: 480px) {
    padding: 8px;
    gap: 8px;

    .team-name {
      font-size: 13px;
    }

    .team-flag {
      width: 32px;
      height: 22px;
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