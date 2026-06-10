<template>
  <div class="group-container">
    <div class="group-card">
      <div v-for="group in teamGroups" :key="group" class="group-card-container">
        <div class="group-title">{{ group }}組</div>
        <div v-for="team in getTeamsByGroup(group)" :key="team.teamName" class="team-card"
          @click="viewCountryGameSchedule(team.teamCode)">
          <h3>{{ team.teamName }}</h3>
          <img :src="team.teamFlag" :alt="team.teamName">
        </div>
        <div class="view-schedule-btn" @click="viewGameSchedule(group)">
          <span class="btn-icon">⚽</span>
          <span class="btn-text">完整賽程</span>
          <span class="btn-arrow">→</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTeamStore } from '~/store/teamStore'
import { useRouter } from 'vue-router'

const teamStore = useTeamStore()
const router = useRouter()

// 取得所有不重複的分組
const teamGroups = computed(() => {
  const groups = teamStore.teams.map(team => team.teamGroup) // 定義 groups 為所有球隊的分組陣列
  return [...new Set(groups)].sort() // 使用 Set 去除重複的分組，並排序後回傳
})

// 根據分組取得球隊
const getTeamsByGroup = (group) => {
  return teamStore.teams.filter(team => team.teamGroup === group)
}

// 點擊分組時顯示賽程
const viewGameSchedule = (group) => {
  console.log(`顯示 ${group} 組的賽程`)
  router.push({ path: '/GroupGameSchedule', query: { group } }) // 導航到賽程頁面，並傳遞分組參數
}

// 點擊球隊時顯示賽程
const viewCountryGameSchedule = (teamCode) => {
  console.log(`顯示 ${teamCode} 的賽程`)
  router.push({ path: '/CountryGameSchedule', query: { teamCode } }) // 導向到球隊賽程頁面，並傳遞球隊代碼參數
}
</script>

<style lang="scss" scoped>
.group-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 1440px) {
    max-width: 1200px;
  }

  @media (max-width: 1024px) {
    max-width: 960px;
    padding: 15px;
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
}

.group-card {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}

.group-card-container {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: none;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3498db, #2ecc71, #f39c12, #e74c3c);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);

    &::before {
      opacity: 1;
    }

    .group-title {
      background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
      color: white;
    }
  }

  &:active {
    transform: translateY(-4px) scale(1.01);
  }

  @media (max-width: 768px) {
    border-radius: 12px;

    &:hover {
      transform: translateY(-4px) scale(1.01);
    }
  }
}

.group-title {
  font-size: 1.5rem;
  text-align: center;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: white;
  font-weight: 700;
  padding: 1.25rem 0;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  position: relative;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 1.3rem;
    padding: 1rem 0;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    padding: 0.875rem 0;
  }
}

.team-card {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 12px 16px;
  gap: 12px;
  border-bottom: 1px solid #e8ecef;
  transition: all 0.2s ease;
  position: relative;

  &:last-child {
    border-bottom: none;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, #3498db, #2ecc71);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover {
    background-color: rgba(52, 152, 219, 0.05);
    padding-left: 20px;

    &::before {
      opacity: 1;
    }

    h3 {
      color: #3498db;
      font-weight: 600;
    }

    img {
      transform: scale(1.15);
    }
  }

  h3 {
    font-size: 1rem;
    font-weight: 500;
    color: #34495e;
    margin: 0;
    transition: all 0.2s ease;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }

    @media (max-width: 480px) {
      font-size: 0.85rem;
    }
  }

  img {
    width: 40px;
    height: 28px;
    object-fit: cover;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    transition: transform 0.2s ease;
    flex-shrink: 0;

    @media (max-width: 768px) {
      width: 36px;
      height: 24px;
    }

    @media (max-width: 480px) {
      width: 32px;
      height: 22px;
    }
  }

  @media (max-width: 768px) {
    padding: 10px 14px;
    gap: 10px;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    gap: 8px;
  }
}

.view-schedule-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 20px;
  margin: 12px 16px 16px 16px;
  background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.5);

    &::before {
      width: 300px;
      height: 300px;
    }

    .btn-arrow {
      transform: translateX(4px);
    }
  }

  &:active {
    transform: translateY(0);
  }

  .btn-icon,
  .btn-text,
  .btn-arrow {
    position: relative;
    z-index: 1;
  }

  .btn-icon {
    font-size: 1.2rem;
  }

  .btn-arrow {
    transition: transform 0.3s ease;
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    padding: 12px 16px;
    margin: 10px 14px 14px 14px;
    font-size: 0.95rem;

    .btn-icon {
      font-size: 1.1rem;
    }
  }

  @media (max-width: 480px) {
    padding: 10px 14px;
    margin: 8px 12px 12px 12px;
    font-size: 0.9rem;
    gap: 6px;

    .btn-icon {
      font-size: 1rem;
    }

    .btn-arrow {
      font-size: 1rem;
    }
  }
}

// 載入動畫
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.group-card-container {
  animation: fadeInUp 0.5s ease-out backwards;

  @for $i from 1 through 12 {
    &:nth-child(#{$i}) {
      animation-delay: #{$i * 0.05}s;
    }
  }
}
</style>