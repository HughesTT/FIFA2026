<template>
  <GameScheduleLayout>
    <template #header>
      <div v-if="currentTeam">
        <GoBack />

        <div class="header">
          <img :src="currentTeam.teamFlag" :alt="currentTeam.teamName" class="team-flag-large">
          <h2>{{ currentTeam.teamName }}國家隊賽程</h2>
        </div>
      </div>
    </template>

    <div v-if="!currentTeam" class="no-data">
      找不到球隊資料
    </div>
    <div v-else-if="uniqueMatches.length === 0" class="no-data">
      目前沒有賽程資料
    </div>
    <div v-else class="matches-list">
      <MatchCard
v-for="match in uniqueMatches" :key="match.matchId" :match="match"
        @team-click="viewCountryGameSchedule" />
    </div>
  </GameScheduleLayout>
</template>

<script setup>
import { useCountryGameSchedule } from '~/composable/useCountryGameSchedule';
import { useGotoSchedule } from '~/composable/useGotoSchedule';

const { uniqueMatches, currentTeam } = useCountryGameSchedule();
const { viewCountryGameSchedule } = useGotoSchedule();

</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  padding-top: 40px;
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
    padding-top: 50px;

    h2 {
      font-size: 24px;
    }
  }

  @media (max-width: 480px) {
    padding-top: 40px;
  }
}
</style>
