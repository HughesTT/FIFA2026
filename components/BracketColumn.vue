<template>
  <div :class="['bracket-column', stage.toLowerCase()]">
    <div class="stage-label">{{ stageText(stage) }}</div>

    <div class="column-matches">
      <!-- 每隊比賽 -->
      <div v-for="i in Math.ceil(matches.length / 2)" :key="i" class="match-pair">
        <BracketMatchNode :match="matches[(i - 1) * 2]"
          @team-click="$emit('team-click', $event)" />
        <BracketMatchNode :match="matches[(i - 1) * 2 + 1]"
          @team-click="$emit('team-click', $event)" />
      </div>

      <!-- 僅 Final 欄顯示季軍戰 -->
      <div v-if="stage === 'Final' && thirdPlaceMatch" class="third-place-block">
        <div class="stage-label third-place-label">季軍賽</div>
        <div class="match-node third-place-node">
          <MatchCard :match="formatMatchForCard(thirdPlaceMatch)" @team-click="$emit('team-click', $event)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import BracketMatchNode from '~/components/BracketMatchNode.vue'
import MatchCard from '~/components/MatchCard.vue'
import { formatMatchForCard } from '~/utils/matchFormatter'
import { getStageLabel } from '~/utils/getStageLabel'
import type { knockoutMatch } from '~/types/knockoutResults'

defineProps({
  stage: { type: String, required: true },
  matches: { type: Array as PropType<knockoutMatch[]>, required: true },
  thirdPlaceMatch: { type: Object as PropType<knockoutMatch | undefined>, default: undefined }
})

defineEmits<{ 'team-click': [teamCode: string] }>()

const { stageText } = getStageLabel()
</script>

<style scoped lang="scss">
.bracket-column {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-shrink: 0;
  width: 270px;
  position: relative;
  padding-top: 44px;
}

.stage-label {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: white;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.6rem;
  background: var(--primary-color, #4a1883);
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  z-index: 10;
}

.stage-label.final-label {
  background: linear-gradient(135deg, #d4af37, #b8860b);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  letter-spacing: 2px;
}

.column-matches {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  position: relative;
}

.match-pair {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 1;
  min-height: 180px;

  /* 垂直連接線 */
  &::before {
    content: "";
    position: absolute;
    top: 25%;
    bottom: 25%;
    right: -2.3rem;
    width: 2px;
    background: #94a3b8;
    z-index: 0;
  }

  /* 從垂直線中央連向下一階段的水平線 */
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: -4.7rem;
    width: 2.5rem;
    height: 2px;
    background: #94a3b8;
    z-index: 0;
  }
}

/* 針對最後一階 (決賽)，隱藏所有向右的連接線 */
.bracket-column.final {
  .match-pair {
    justify-content: center;
    &::before,
    &::after {
      display: none !important;
    }
  }
  :deep(.match-node::after) {
    display: none !important;
  }
}

/* 季軍戰樣式 */
.third-place-block {
  width: 100%;
  position: absolute;
  margin-top: 500px;
}

.third-place-label {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.85rem;
  font-weight: 700;
  color: white;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.4rem;
  background: linear-gradient(135deg, #20b164, #2e7d32);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
}

.match-node {
  width: 100%;
  background: #f1f3f5;
  border: 1px solid #d6d9de;
  border-radius: 14px;
  box-shadow: none;
  margin: 5px 0;
  position: relative;
  z-index: 1;

  &.third-place-node::after {
    display: none !important;
  }
}

@media (max-width: 1366px) {
  .bracket-column {
    width: 240px;
  }
  .match-pair::before {
    right: -2.1rem;
  }
  .match-pair::after {
    right: -4.8rem;
    width: 2.8rem;
  }
}

@media (max-width: 1280px) {
  .match-pair::before {
    right: -1.8rem;
  }
  .match-pair::after {
    right: -3.7rem;
    width: 2rem;
  }
}

@media (max-width: 1024px) {
  .bracket-column {
    width: 200px;
  }
  .match-pair::before {
    right: -1.8rem;
  }
  .match-pair::after {
    right: -3.7rem;
    width: 2rem;
  }
}

@media (max-width: 768px) {
  .bracket-column {
    width: 172px;
    scroll-snap-align: start;
    flex-shrink: 0;
  }
  .stage-label {
    font-size: 0.82rem;
    padding: 0.45rem;
  }
  .match-pair::before {
    right: -0.75rem;
  }
  .match-pair::after {
    right: -1.5rem;
    width: 0.75rem;
  }
  .column-matches {
    min-height: 980px;
  }
}

@media (max-width: 480px) {
  .bracket-column {
    width: 180px;
    padding-top: 2.5rem;
  }
  .stage-label {
    font-size: 0.76rem;
    letter-spacing: 0.5px;
  }
  .match-pair::before {
    right: -0.8rem;
  }
  .match-pair::after {
    right: -1.7rem;
    width: 1rem;
  }
  .column-matches {
    min-height: 600px;
  }
}
</style>
