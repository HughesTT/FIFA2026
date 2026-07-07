<template>
  <div class="game-container">
    <BackHome />
    <Standings />
    <div v-if="!currentTeam" class="game-card">
      <div class="no-data">找不到球隊資料</div>
    </div>

    <div v-else class="game-card">
      <GoBack />

      <div class="header">
        <img :src="currentTeam.teamFlag" :alt="currentTeam.teamName" class="team-flag-large">
        <h2>{{ currentTeam.teamName }}國家隊賽程</h2>
      </div>

      <div v-if="uniqueMatches.length === 0" class="no-data">目前沒有賽程資料</div>

      <div v-else class="matches-list">
        <MatchCard v-for="match in uniqueMatches" :key="match.matchId" :match="match"
          @team-click="viewCountryGameSchedule" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCountryGameSchedule } from '~/composable/useCountryGameSchedule';

const { uniqueMatches, currentTeam, viewCountryGameSchedule } = useCountryGameSchedule();

</script>

<style lang="scss">
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
}

.game-card {
  max-width: 850px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;

  @media (max-width: 768px) {
    padding: 20px;
  }
}

.back-home-btn {
  position: absolute;
  z-index: 10;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 10px;
  background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
  z-index: 10;

  .arrow {
    font-size: 20px;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.5);

    .arrow {
      transform: translateX(-4px);
    }
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    top: 15px;
    right: 15px;
    padding: 8px 16px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 13px;
    gap: 6px;

    .arrow {
      font-size: 16px;
    }

    span:last-child {
      display: none;
    }
  }
}

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

.no-data {
  text-align: center;
  padding: 40px;
  color: #999;
  font-size: 18px;
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

  @media (max-width: 768px) {
    gap: 15px;
  }
}
</style>
