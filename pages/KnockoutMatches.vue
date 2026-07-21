<template>
  <div class="knockout-container">
    <BackHome />
    <BtnGotoAllGroup />
    <PageTitle />
    <div class="knockout-content">
      <div class="bracket-shell">
        <BracketNav direction="prev" :disabled="!canPrev" @click="prevStage" />

        <TransitionGroup :name="direction" tag="div" mode="out-in">
          <div :key="windowStart" class="bracket-viewport">
            <BracketColumn
v-for="stage in visibleStages" :key="stage" :stage="stage"
              :matches="matchesByStage[stage] ?? []"
              :third-place-match="stage === 'Final' ? matchesByStage.ThirdPlace?.[0] : undefined"
              @team-click="handleTeamClick" />
          </div>
        </TransitionGroup>

        <BracketNav direction="next" :disabled="!canNext" @click="nextStage" />
      </div>

      <div class="worldcup">
        <img src="/public/img/champion.jpg" alt="World Cup" class="worldcup-image">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useknockoutStore } from "~/store/knockoutStore";
import { useResponsive } from "~/composable/useResponsive";
import { useBracket } from "~/composable/useBracket";
import BracketColumn from "~/components/BracketColumn.vue";
import BracketNav from "~/components/BracketNav.vue";

const { visibleCount } = useResponsive();

const stages = ["R32", "R16", "QF", "SF", "Final"] as const;
const { windowStart, visibleStages, canPrev, canNext, prevStage, nextStage, direction } = useBracket(stages, visibleCount);

const knockoutStore = useknockoutStore();
const { matchesByStage } = storeToRefs(knockoutStore);

const router = useRouter();

const handleTeamClick = (teamCode: string) => {
  router.push({ path: '/CountryGameSchedule', query: { teamCode } });
};
</script>

<style scoped lang="scss">
/* CSS 變數定義 */
:root {
  --primary-color: #4a1883;
  --accent-color: #3d9700;
  --bg-light: rgba(255, 255, 255, 0.95);
  --bg-dark: rgba(30, 30, 30, 0.05);
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --border-color: #e2e8f0;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 12px rgba(74, 24, 131, 0.15);
  --shadow-lg: 0 12px 24px rgba(74, 24, 131, 0.1);
  --shadow-hover: 0 16px 32px rgba(74, 24, 131, 0.2);
  --connector-color: #94a3b8;
}

.knockout-container {
  max-width: 100vw;
  min-height: 100vh;
  margin: 0 auto;
  /* padding: 2rem 1rem; */
  overflow-x: hidden;
  animation: fadeIn 0.5s ease-in-out;

  @media (max-width: 768px) {
    min-height: auto;
    padding: 0;
  }
}

.knockout-header {
  max-width: 1400px;
  margin: 0 auto 2rem;
  text-align: center;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #fff;
    margin: 0 0 0.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.05);

    @media (max-width: 768px) {
      font-size: 1.8rem;
    }
  }
}

.knockout-content {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding-bottom: 2rem;
  }
}

.bracket-shell {
  flex: 1;
  position: relative;
  width: 70%;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
  }
}

.worldcup {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 25%;
  height: 100%;

  .worldcup-image {
    max-width: 250px;
    max-height: 100%;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    display: none;
  }
}

.bracket-viewport {
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  grid-template-columns: repeat(3, minmax(220px, 1fr));
  column-gap: 24px;
  align-items: stretch;
  padding: 12px 20px 24px;

  @media (max-width: 768px) {
    display: flex;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x proximity;
    gap: 1.5rem;
    padding: 0.75rem;
  }
}

/* 行動裝置切換賽階動態 */
.next-enter-active,
.next-leave-active,
.prev-enter-active,
.prev-leave-active {
  transition: all 0.35s ease;
}

.next-enter-from {
  opacity: 0;
  transform: translateX(60px);
}

.next-leave-to {
  opacity: 0;
  transform: translateX(-60px);
}

.prev-enter-from {
  opacity: 0;
  transform: translateX(-60px);
}

.prev-leave-to {
  opacity: 0;
  transform: translateX(60px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
  
}
</style>
