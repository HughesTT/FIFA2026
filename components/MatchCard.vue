<template>
  <div v-if="match" class="match-item" :class="{ 'clickable': isClickable }" @click="handleCardClick">
    <div class="match-header">
      <span class="match-date">{{ formattedDate }}</span>
      <span class="match-time">{{ match.time || match.matchTime }}</span>
    </div>

    <div class="match-teams">
      <!-- 主隊 -->
      <div class="team home" @click.stop="onTeamClick(match.homeCode)">
        <img v-if="match.homeFlag" :src="match.homeFlag" :alt="match.homeTeam" class="team-flag">
        <div v-else class="flag-placeholder" />
        <span class="team-name" :class="{ 'notWinner': match.homeCode === match.isWinner }">{{ homeTeamName }}</span>
      </div>

      <!-- 比分/VS 區域 -->
      <div class="score-or-vs">
        <!-- 正規賽比數 -->
        <div class="regulartime">
          <div v-if="hasScore" class="match-score">
            <span class="score-num">
              {{ match.homeScore }}
            </span>
            <span class="score-divider"> - </span>
            <span class="score-num">
              {{ match.awayScore }}
            </span>
          </div>
          <div v-else class="vs">VS</div>
        </div>

        <!-- PK戰比數 -->
        <div class="penalty">
          <div v-if="match.homePenaltyScore !== null && match.awayPenaltyScore !== null" class="penalty-score">
            <span class="score-num">(
              {{ match.homePenaltyScore }}
            </span>
            <span class="score-divider"> - </span>
            <span class="score-num">
              {{ match.awayPenaltyScore }} )
            </span>
          </div>
        </div>
      </div>

      <!-- 客隊 -->
      <div class="team away" @click.stop="onTeamClick(match.awayCode)">
        <img v-if="match.awayFlag" :src="match.awayFlag" :alt="match.awayTeam" class="team-flag">
        <div v-else class="flag-placeholder" />
        <span class="team-name" :class="{ 'notWinner': match.awayCode === match.isWinner }"> {{ awayTeamName }}</span>
      </div>
    </div>
    <div class="match-stage">{{ stageText(match.stage) }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useMatchCard } from '~/composable/useMatchCard';

// component props
const props = defineProps({
  match: { type: Object, required: true },
  isClickable: { type: Boolean, default: false }
});
const emit = defineEmits(['team-click', 'card-click']);

// expose props for template
const { isClickable, match } = props;

// use composable
const { onTeamClick, hasScore, formattedDate, homeTeamName, awayTeamName, stageText } = useMatchCard(props, emit);

// card click handler
const handleCardClick = () => {
  if (isClickable) emit('card-click', match);
};
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

.flag-placeholder {
  width: 48px;
  /* 必須與 .team-flag 尺寸一致 */
  height: 32px;
  background-color: #e2e8f0;
  /* 淡灰色，代表待定 */
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 為了讓視覺更統一，可以在佔位符中間加個小圖標或文字 */
.flag-placeholder::after {
  content: '?';
  color: #94a3b8;
  font-size: 14px;
  font-weight: bold;
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

.penalty-score {
  justify-content: center;
  display: flex;

  .winner {
    color: #2c3e50;
  }

  .score-divider {
    margin: 0 4px;
    color: #7f8c8d;
  }
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

.notWinner {
  opacity: 0.3;
}

@media (max-width: 768px) {
  .match-item {
    padding: 14px 10px;
  }

  .match-header {
    gap: 8px;
    margin-bottom: 10px;

    .match-date,
    .match-time {
      font-size: 11px;
      padding: 2px 8px;
      white-space: nowrap;
    }
  }

  .match-teams {
    gap: 6px;

    .team {
      gap: 6px;
      padding: 6px;

      .team-flag {
        width: 34px;
        height: 24px;
      }

      .team-name {
        font-size: 12px;
        line-height: 1.2;
        text-align: center;
        word-break: break-word;
      }
    }
  }

  .match-score {
    font-size: 18px;
  }

  .vs {
    font-size: 14px;
  }

  .match-badge {
    top: 8px;
    right: 8px;
    font-size: 10px;
    padding: 2px 6px;
  }

  .match-stage {
    font-size: 11px;
    margin-top: 8px;
  }

  .flag-placeholder {
    width: 48px;
    height: 32px;
  }
}

@media (max-width: 480px) {
  .match-item {
    padding: 12px 8px;
  }

  .match-teams {
    .team {
      .team-flag {
        width: 30px;
        height: 20px;
      }

      .team-name {
        font-size: 12px;
      }
    }
  }

  .match-score {
    font-size: 16px;
  }

  .vs {
    font-size: 13px;
  }
}
</style>