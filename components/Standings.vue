<template>
  <div class="standings-container">
    <div class="standings-card">
      <div class="standings-header">
        <h2>🏆 {{ group }} 組</h2>
      </div>
      <table class="standings-table">
        <thead>
          <tr>
            <th>球隊</th>
            <th>場次</th>
            <th>勝</th>
            <th>平</th>
            <th>負</th>
            <th>淨勝球</th>
            <th>積分</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="team in filteredStandings" :key="team.teamName">
            <td class="team-info">
              <img :src="team.teamFlag" :alt="team.teamName" class="team-flag"> {{ team.teamName }}
            </td>
            <td>{{ team.played }}</td>
            <td>{{ team.won }}</td>
            <td>{{ team.drawn }}</td>
            <td>{{ team.lost }}</td>
            <td>{{ team.goalDifference }}</td>
            <td>{{ team.points }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useGroupStandings } from '~/composable/useGroupStandings'
import { computed } from 'vue'

const route = useRoute()
const group = route.query.group || '未知分組'

// 引入 useGroupStandings composable，並傳入 groupRef 以獲取該分組的戰績資料
const { standings } = useGroupStandings(group)
// console.log('standings:', standings) // 呼叫用，檢查 standings 是否正確

const filteredStandings = computed(() => {
  return standings.value.filter(team => team.teamGroup === group)
})
// console.log('filteredStandings:', filteredStandings.value) // 呼叫用，檢查 filteredStandings 是否正確

// 取得目前分組的球隊資料(測試用)
// const teams = teamStore.teams.filter(team => team.teamGroup === group)
// console.log('teams:', teams) // 呼叫用，檢查 teams 是否正確

</script>

<style lang="scss" scoped>
.standings-container {
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 20px;
}

.standings-card {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .standings-header {
    text-align: center;
    margin-bottom: 20px;

    h2 {
      margin: 0;
      color: #333;
    }
  }

  .no-standings {
    text-align: center;
    color: #666;
    font-size: 18px;
    padding: 40px;
  }

  .standings-table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 12px;
      text-align: center;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #f4f4f4;
      color: #333;
    }


    .team-info {
      display: flex;
      align-items: center;

      .team-flag {
        width: 30px;
        height: auto;
        margin-right: 10px;
        border-radius: 3px;
        border: 1px solid #ccc;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 15px;

    .standings-header h2 {
      font-size: 20px;
    }

    .standings-table th,
    .standings-table td {
      padding: 8px;
      font-size: 14px;
    }

    .team-info .team-flag {
      width: 24px;
      margin-right: 8px;
    }
  }
}
</style>