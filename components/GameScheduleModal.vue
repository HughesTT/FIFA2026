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
            <span class="vs">VS</span>
            <div class="team">
              <img :src="match.awayFlag" :alt="match.awayTeam" class="team-flag">
              <span class="team-name">{{ match.awayTeam }}</span>
            </div>
          </div>
          <div class="match-stage">{{ match.stage }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useTeamStore } from '~/store/teamStore'
import { useRoute } from 'vue-router'
import { getCurrentDate, getTodayString } from '~/utils/dateHelper'

// 控制顯示/隱藏
const isVisible = ref(true)

const closeModal = () => {
  isVisible.value = false
}

const teamStore = useTeamStore()
const route = useRoute()

// 取得即將開始的比賽
const upcomingMatches = computed(() => {
  const group = route.query.group

  // 如果沒有分組參數，顯示所有球隊的即將開始的比賽
  const teamsToShow = group
    ? teamStore.teams.filter(team => team.teamGroup === group)
    : teamStore.teams

  const today = getTodayString() // 使用測試日期

  // 收集所有球隊的賽程，並過濾出即將開始的比賽（今天和未來1天內）
  const matchesMap = new Map() // 使用 Map 去重
  const oneDaysLater = new Date(getCurrentDate())
  oneDaysLater.setDate(oneDaysLater.getDate() + 0)
  const oneDaysLaterStr = oneDaysLater.toISOString().split('T')[0]

  teamsToShow.forEach(team => {
    team.teamGameSchedule.forEach(match => {
      if (match.date >= today && match.date <= oneDaysLaterStr) {
        // 排序隊伍名稱確保一致性
        const teams = [team.teamName, match.opponent].sort()
        const matchKey = `${match.date}-${match.time}-${teams[0]}-vs-${teams[1]}`

        if (!matchesMap.has(matchKey)) {
          // 查找對手完整資訊
          const team1 = teamStore.teams.find(t => t.teamName === teams[0])
          const team2 = teamStore.teams.find(t => t.teamName === teams[1])

          // 使用排序後的名稱確定穩定的主客場順序（第一個是主場，第二個是客場）
          matchesMap.set(matchKey, {
            matchId: matchKey,
            date: match.date,
            time: match.time,
            stage: match.stage,
            teamGroup: team.teamGroup,
            // 主場球隊（排序後的第一個）
            homeTeam: teams[0],
            homeFlag: team1?.teamFlag || '',
            // 客場球隊（排序後的第二個）
            awayTeam: teams[1],
            awayFlag: team2?.teamFlag || ''
          })
        }
      }
    })
  })

  // 轉換為陣列並排序
  return Array.from(matchesMap.values())
    .sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date)
      if (dateCompare !== 0) return dateCompare
      return a.time.localeCompare(b.time)
    })
    .slice(0, 10) // 只顯示前10場比賽
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