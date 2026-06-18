<template>
  <div class="match-item" :class="{ 'clickable': isClickable }" @click="handleCardClick">
    <div class="match-header">
      <span class="match-date">{{ formattedDate }}</span>
      <span class="match-time">{{ match.time || match.matchTime }}</span>
    </div>

    <div class="match-teams">
      <!-- 主隊 -->
      <div class="team home" @click.stop="onTeamClick(match.homeCode)">
        <img :src="match.homeFlag" :alt="match.homeTeam" class="team-flag">
        <span class="team-name">{{ match.homeTeam }}</span>
      </div>

      <!-- 比分/VS 區域 -->
      <div class="score-or-vs">
        <div v-if="hasScore" class="match-score">
          <span class="score-num" :class="{ 'winner': match.homeScore > match.awayScore }">
            {{ match.homeScore }}
          </span>
          <span class="score-divider"> - </span>
          <span class="score-num" :class="{ 'winner': match.awayScore > match.homeScore }">
            {{ match.awayScore }}
          </span>
        </div>
        <div v-else class="vs">VS</div>
      </div>

      <!-- 客隊 -->
      <div class="team away" @click.stop="onTeamClick(match.awayCode)">
        <img :src="match.awayFlag" :alt="match.awayTeam" class="team-flag">
        <span class="team-name">{{ match.awayTeam }}</span>
      </div>
    </div>

    <div v-if="match.teamGroup" class="match-badge">{{ match.teamGroup }}組</div>
    <div v-if="match.stage" class="match-stage">{{ match.stage }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  match: {
    type: Object,
    required: true
  },
  isClickable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['team-click', 'card-click'])

const hasScore = computed(() =>
  props.match.homeScore !== undefined &&
  props.match.homeScore !== null &&
  props.match.awayScore !== null
)

const formattedDate = computed(() => {
  const dateStr = props.match.date || props.match.matchDate
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-TW', {
    month: '2-digit',
    day: 'numeric',
    weekday: 'short'
  })
})

const onTeamClick = (code) => {
  emit('team-click', code) // 移除條件判斷，確保事件總是發出
}

const handleCardClick = () => {
  if (props.isClickable) emit('card-click', props.match)
}
</script>

<style lang="scss" scoped>
/* 這裡移入原本在 GroupGameSchedule.vue 或 GameScheduleModal.vue 中 match-item 相關的樣式 */
.match-item {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  position: relative;
  transition: all 0.3s ease;

  &.clickable {
    cursor: pointer;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
}

.match-header {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 15px;

  .match-date {
    background: #e9e0fa;
    padding: 2px 10px;
    border-radius: 10px;
    font-weight: 600;
  }

  .match-time {
    background: #ffe5e5;
    color: #ef4444;
    padding: 2px 10px;
    border-radius: 10px;
    font-weight: 600;
  }
}

.match-teams {
  display: flex;
  align-items: center;
  justify-content: space-around;

  .team {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 2px solid transparent;

    &:hover {
      background: rgba(52, 152, 219, 0.05);
      border: 2px solid #3498db;
      transform: scale(1.05);
    }

    .team-flag {
      width: 48px;
      height: 32px;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .team-name {
      font-weight: 600;
    }
  }
}

.match-score {
  font-family: 'FIFA2026-NormalBlack', sans-serif;
  font-size: 22px;
  font-weight: 800;

  .winner {
    color: #2c3e50;
  }

  .score-num {
    color: #7f8c8d;
  }
}

.vs {
  font-weight: bold;
  color: #ef4444;
}

.match-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #3b82f6;
  color: white;
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 12px;
}

.match-stage {
  text-align: center;
  color: #7f8c8d;
  font-size: 13px;
  font-weight: 500;
  margin-top: 10px;
}
</style>