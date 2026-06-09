<template>
  <div>
    <div class="schedule-container">
      <div class="schedule-card">
        <div class="header">
          <img :src="currentTeam?.teamFlag || ''" :alt="currentTeam?.teamName || '未知球隊'" class="team-flag-large">
          <h2>{{ currentTeam?.teamName || '未知球隊' }}國家隊賽程</h2>
        </div>

        <div v-if="countryGameSchedule.length === 0" class="no-data">目前沒有賽程資料</div>

        <div v-else class="matches-list">
          <div v-for="(match, index) in countryGameSchedule" :key="match.matchId" class="match-item">
            <div class="match-number">第 {{ index + 1 }} 場</div>
            <div class="match-info">
              <div class="match-datetime">
                <span class="date">{{ formatDate(match.date) }}</span>
                <span class="time">{{ match.time }}</span>
              </div>

              <div class="match-teams">
                <!-- 主場：名稱在左、國旗在右 -->
                <div class="team home" :class="{ 'current': match.homeAway }">
                  <img :src="match.homeAway ? currentTeam.teamFlag : getOpponentFlag(match.opponent)"
                    :alt="match.homeAway ? currentTeam.teamName : match.opponent" class="team-flag">
                  <span class="team-name">{{ match.homeAway ? currentTeam.teamName : match.opponent }}</span>
                </div>

                <span class="vs">VS</span>

                <!-- 客場：國旗在左、名稱在右 -->
                <div class="team away" :class="{ 'current': !match.homeAway }">
                  <img :src="match.homeAway ? getOpponentFlag(match.opponent) : currentTeam.teamFlag"
                    :alt="match.homeAway ? match.opponent : currentTeam.teamName" class="team-flag">
                  <span class="team-name">{{ match.homeAway ? match.opponent : currentTeam.teamName }}</span>
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
import { useRoute } from 'vue-router'
import { useTeamStore } from '~/store/teamStore'

const route = useRoute()
const teamStore = useTeamStore()
const teamCode = route.query.teamCode || '' // 從路由參數中取得 teamCode，如果沒有則使用空字串

// 取得目前球隊資訊
const currentTeam = computed(() => {
  return teamStore.teams.find(team => team.teamCode === teamCode)
})

// 取得目前球隊的賽程
const countryGameSchedule = computed(() => {
  return currentTeam.value?.teamGameSchedule || [] // 如果 currentTeam 為 undefined，則回傳空陣列
})

// 根據對戰國名稱取得對戰國國旗
const getOpponentFlag = (opponentName) => {
  const opponent = teamStore.teams.find(team => team.teamName === opponentName)
  return opponent?.teamFlag || ''
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
.schedule-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
}

.schedule-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 20px;
  }
}

.header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  padding-bottom: 20px;
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

    h2 {
      font-size: 24px;
    }
  }
}

.no-data {
  text-align: center;
  padding: 40px;
  color: #999;
  font-size: 18px;
}

.matches-list {
  display: flex;
  flex-direction: column;
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
    font-size: 1.1rem;
    font-weight: 600;
    color: #2c3e50;
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
  justify-content: space-between;
  gap: 15px;
  margin: 10px 0;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
  }
}

.team {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
  min-width: 0; // 防止 flex 子元素溢出

  &.current {
    background: rgba(52, 152, 219, 0.1);
    border: 2px solid #3498db;
  }

  .team-flag {
    width: 48px;
    height: 32px;
    object-fit: cover;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    flex-shrink: 0; // 防止圖片被壓縮
  }

  .team-name {
    font-size: 18px;
    font-weight: 600;
    color: #2c3e50;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  // 主場：名稱在左、國旗在右
  &.home {
    text-align: right;
    flex-direction: row-reverse;
  }

  // 客場：國旗在左、名稱在右
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
    width: 100%;
    justify-content: center !important;
    flex-direction: row !important;
    text-align: center !important;

    .team-name {
      font-size: 14px;
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
}

.match-stage {
  text-align: center;
  color: #7f8c8d;
  font-size: 14px;
  font-weight: 500;
}
</style>
