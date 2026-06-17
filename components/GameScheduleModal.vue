<template>
  <div v-if="isVisible" class="modal-container">
    <div class="modal-header">
      <h3>🔥 即將進行的比賽</h3>
      <button class="close-btn" title="關閉" @click="closeModal">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
    <div v-if="isVisible" class="modal-container">
      <div v-if="upcomingMatches.length === 0" class="no-matches">沒有即將進行的比賽</div>
      <div v-else class="matches-list">
        <div v-for="match in upcomingMatches" :key="match.matchId" class="match-item">
          <div class="match-badge">{{ match.teamGroup }}組</div>

          <div class="match-info">
            <div class="match-datetime">
              <span class="date">{{ formatDate(match.date) }}</span>
              <span class="time">{{ match.time }}</span>
            </div>

            <div class="match-teams">
              <div class="team">
                <img :src="match.homeFlag" :alt="match.homeTeam" class="team-flag">
                <span class="team-name">{{ match.homeTeam }}</span>
              </div>

              <div class="vs">VS</div>

              <div class="team">
                <img :src="match.awayFlag" :alt="match.awayTeam" class="team-flag">
                <span class="team-name">{{ match.awayTeam }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useTeamStore } from '~/store/teamStore'
import { useGroupStandings } from '~/composable/useGroupStandings'

// 控制 Modal 顯示/隱藏
const isVisible = ref(true)
const closeModal = () => {
  isVisible.value = false
}
const groupRef = ref('')
const { enhancedMatches } = useGroupStandings(groupRef) // 呼叫戰績表，空字串 ref 代表不過濾分組
const teamStore = useTeamStore()

// 篩選出今天或明天的比賽，且只顯示未開始的比賽
const upcomingMatches = computed(() => {
  const now = new Date() // 獲取當前時間
  const tomorrowEnd = new Date()
  tomorrowEnd.setDate(tomorrowEnd.getDate() + 1) // 設定為明天的結束時間
  tomorrowEnd.setHours(23, 59, 59, 999) // 設定為明天的結束時間
  // 篩選今天或明天日期的比賽，若時間已過，則隱藏
  return enhancedMatches.value
    .filter(match => {
      const matchDateTime = new Date(`${match.date}T00:00:00`) // 將比賽日期轉換為 Date 物件
      return matchDateTime >= now && matchDateTime <= tomorrowEnd
    })
    .map(match => {
      const homeTeamInfo = teamStore.teams.find(t => t.teamName === match.homeTeam)
      const awayTeamInfo = teamStore.teams.find(t => t.teamName === match.awayTeam)
      return {
        ...match,
        homeFlag: homeTeamInfo ? homeTeamInfo.teamFlag : '',
        awayFlag: awayTeamInfo ? awayTeamInfo.teamFlag : ''
      }
    })
})

// 日期格式化
const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-TW', {
    month: '2-digit',
    day: 'numeric',
    weekday: 'short'
  })
}
</script>

<style lang="scss" scoped>
.modal-container {
  max-width: 1400px;
  margin: 40px auto 20px;
  padding: 30px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 249, 250, 0.98) 100%);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  position: relative;
  animation: slideDown 0.4s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    margin: 20px 15px 10px;
    padding: 20px 15px;
  }

  @media (max-width: 480px) {
    margin: 15px 10px 10px;
    padding: 15px 10px;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  gap: 15px;

  h3 {
    text-align: center;
    font-size: 28px;
    color: #2c3e50;
    margin: 0;
    font-weight: 700;
    flex: 1;
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;

    h3 {
      font-size: 22px;
    }
  }

  @media (max-width: 480px) {
    margin-bottom: 15px;

    h3 {
      font-size: 18px;
    }
  }
}

.close-btn {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
}

.no-matches {
  text-align: center;
  padding: 60px 20px;
  color: #7f8c8d;
  font-size: 18px;
  background: #f8f9fa;
  border-radius: 12px;
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
}

.match-item {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #f59e0b 0%, #ef4444 100%);
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
}

.match-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.match-info {
  margin-top: 10px;
}

.match-datetime {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 15px;

  .date {
    font-size: 16px;
    font-weight: 600;
    color: #2c3e50;
  }

  .time {
    background: #ffe5e5;
    color: #ef4444;
    padding: 4px 10px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
}

.match-teams {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;

  .team {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;

    .team-flag {
      width: 40px;
      height: 28px;
      object-fit: cover;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      flex-shrink: 0;
    }

    .team-name {
      font-size: 16px;
      font-weight: 600;
      color: #2c3e50;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    @media (max-width: 480px) {
      .team-name {
        font-size: 14px;
      }

      .team-flag {
        width: 32px;
        height: 22px;
      }
    }
  }

  .vs {
    font-weight: bold;
    color: #ef4444;
    font-size: 14px;
    padding: 4px 10px;
    background: #f8f9fa;
    border-radius: 8px;
    flex-shrink: 0;
  }

  @media (max-width: 480px) {
    gap: 8px;

    .vs {
      font-size: 12px;
      padding: 3px 8px;
    }
  }
}

.match-stage {
  text-align: center;
  color: #7f8c8d;
  font-size: 13px;
  font-weight: 500;
  padding: 6px;
  background: #f8f9fa;
  border-radius: 6px;
}
</style>