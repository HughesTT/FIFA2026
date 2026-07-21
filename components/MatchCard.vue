<template>
  <div v-if="match" class="match-item" :class="{ 'clickable': isClickable }" @click="handleCardClick">
    <div class="match-header">
      <span class="match-date">{{ formattedDate }}</span>
      <span class="match-time">{{ match.time || match.matchTime }}</span>
    </div>

    <div class="match-teams">
      <!-- 主場 -->
      <div class="team home" @click.stop="onTeamClick(match.homeCode)">
        <img
v-if="match.homeFlag" :src="match.homeFlag" :alt="match.homeTeam" class="team-flag"
          :class="{ loser: match.isWinner && match.homeCode !== match.isWinner }">
        <div v-else class="flag-placeholder" />
        <span class="team-name" :class="{ loser: match.isWinner && match.homeCode !== match.isWinner }">{{ homeTeamName
          }}</span>
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

        <!-- 淘汰賽 PK 戰比數 -->
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
        <img
v-if="match.awayFlag" :src="match.awayFlag" :alt="match.awayTeam" class="team-flag"
          :class="{ loser: match.isWinner && match.awayCode !== match.isWinner }">
        <div v-else class="flag-placeholder" />
        <span class="team-name" :class="{ loser: match.isWinner && match.awayCode !== match.isWinner }"> {{ awayTeamName
          }}</span>
      </div>
    </div>
    <div class="match-stage">{{ stageText(match.stage) }}</div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import { useMatchCard } from '~/composable/useMatchCard'

// 定義 props 與 emits
const props = defineProps({
  match: { type: Object, required: true },
  isClickable: { type: Boolean, default: false }
});
const emit = defineEmits(['team-click', 'card-click']);

// Props 解構
const { isClickable, match } = toRefs(props);
  
// 引用 useMatchCard composable
const emitMatchCard = ((event: string, payload?: unknown) => {
  emit(event as 'team-click' | 'card-click', payload);
}) as (event: string, payload?: unknown) => void;

const { onTeamClick, hasScore, formattedDate, homeTeamName, awayTeamName, stageText } = useMatchCard(props, emitMatchCard);

// 點擊card的觸發事件
const handleCardClick = () => {
  if (isClickable.value) emit('card-click', match.value);
};
</script>

<style lang="scss" scoped>
/* 這裡移入原本在 GroupGameSchedule.vue 或 GameScheduleModal.vue 中 match-item 相關的樣式 */
.match-item {
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.96) 0%, rgba(244, 248, 255, 0.94) 100%);
  border-radius: 14px;
  padding: 10px 0;
  position: relative;
  border: 1px solid rgba(108, 131, 176, 0.2);
  box-shadow: 0 10px 30px rgba(23, 37, 84, 0.08);
  backdrop-filter: blur(2px);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;

  &.clickable {
    cursor: pointer;
  }

  &.clickable:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 179, 71, 0.5);
    box-shadow: 0 14px 28px rgba(15, 23, 42, 0.16);
  }
  .match-header {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 15px;

    .match-date {
      background: linear-gradient(145deg, #edf2ff, #e5ebff);
      color: #324a9a;
      padding: 3px 10px;
      border-radius: 999px;
      border: 1px solid #d8e2ff;
      font-weight: 600;
      font-size: 13px;
    }

    .match-time {
      background: linear-gradient(145deg, #fff0ee, #ffe3de);
      color: #c6322d;
      padding: 3px 10px;
      border-radius: 999px;
      border: 1px solid #ffd2cb;
      font-weight: 600;
      font-size: 13px;
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
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      border: 1px solid transparent;

      &:hover {
        background: rgba(51, 87, 170, 0.07);
        border-color: rgba(51, 87, 170, 0.35);
        transform: scale(1.03);
      }

      &.loser {
        opacity: .35;
      }

      .team-flag {
        width: 40px;
        height: 28px;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
        border: 1px solid rgba(15, 23, 42, 0.08);
      }

      .team-name {
        color: #1f2f43;
        font-weight: 600;
        font-size: 0.8rem;
      }

      .loser {
        opacity: 0.35;
        max-width: 43px;
        /* 過長直接省略 */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .flag-placeholder {
      width: 48px;
      /* 必須與 .team-flag 尺寸一致 */
      height: 32px;
      background-color: #ecf1f9;
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
      font-size: 24px;
      font-weight: 800;
      letter-spacing: 0.02em;

      .winner {
        color: #22314a;
      }

      .score-num {
        color: #3b4d68;
      }
    }

    .score-or-vs .score-divider {
      margin: 0 4px;
      color: #7f8c8d;
    }

    .vs {
      font-weight: bold;
      color: #c6322d;
    }

    .penalty-score {
      justify-content: center;
      display: flex;

      .winner {
        color: #2c3e50;
      }

      .score-num {
        color: #4a5a74;
      }

      .score-divider {
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
      color: #4a5a74;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      margin-top: 10px;
    }

    @media (max-width: 768px) {
      .match-item {
        padding: 14px 10px;
        border-radius: 12px;
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
            width: 30px;
            height: 20px;
          }

          .team-name {
            font-size: 11px;
            line-height: 1.2;
            text-align: center;
            word-break: break-word;
          }
        }
      }

      .match-score {
        font-size: 16px;
      }

      .vs {
        font-size: 12px;
      }

      .penalty-score {
        font-size: 12px;
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
        width: 30px;
        height: 20px;

        &::after {
          font-size: 11px;
        }
      }
    }

    @media (max-width: 480px) {
      .match-item {
        padding: 12px 8px;
      }

      .match-teams {
        .team {
          .team-flag {
            width: 26px;
            height: 17px;
          }

          .team-name {
            font-size: 10px;
          }
        }
      }

      .match-score {
        font-size: 14px;
      }

      .vs {
        font-size: 11px;
      }

      .penalty-score {
        font-size: 11px;
      }

      .flag-placeholder {
        width: 26px;
        height: 17px;

        &::after {
          font-size: 10px;
        }
      }
    }
  }
}


</style>
