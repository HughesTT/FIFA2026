<template>
  <GameScheduleLayout>
    <template #header>
      <GoBack />
      <div class="game-title">{{ group }} 組賽程</div>
    </template>

    <div class="matches-list">
      <MatchCard v-for="match in (countryCode ? countryGameSchedule : uniqueMatches)" :key="match.matchId"
        :match="match" @team-click="viewCountryGameSchedule" />
    </div>
  </GameScheduleLayout>
</template>

<script setup>
// 處理分組賽程的邏輯
import { useGroupGameSchedule } from '~/composable/useGroupGameSchedule';
// 處理導向賽程頁面的邏輯
import { useGotoSchedule } from '~/composable/useGotoSchedule';

const { uniqueMatches, countryGameSchedule, group, countryCode } = useGroupGameSchedule();
const { viewCountryGameSchedule } = useGotoSchedule();
</script>

<style lang="scss" scoped>
.game-title {
  text-align: left;
  color: #2c3e50;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  padding-left: 1.5rem;

  @media (max-width: 768px) {
    font-size: 24px;
  }
}
</style>
