<template>
  <div v-if="isVisible" class="modal-container">
    <div class="modal-header">
      <h3>即將進行的比賽</h3>
      <button class="close-btn" title="關閉" @click="closeModal">
        <svg
xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
    <div class="modal-content">
      <div v-if="upcomingMatches.length === 0" class="no-matches">沒有即將進行的比賽</div>
      <div v-else class="matches-list">
        <MatchCard
v-for="match in upcomingMatches" :key="match.matchId" :match="match"
          @team-click="viewCountryGameSchedule" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGameScheduleModal } from '~/composable/useGameScheduleModal';

const {
  isVisible,
  closeModal,
  groupRef,
  enhancedMatches,
  upcomingMatches,
  viewCountryGameSchedule,
} = useGameScheduleModal();
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

.team-flag {
  width: 48px !important;
  height: 24px;
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
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
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
</style>