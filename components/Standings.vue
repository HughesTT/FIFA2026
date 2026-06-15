<template>
  <div class="standings-container">
    <div class="standings-card">
      <div class="standings-header">
        <h2>🏆 小組戰績</h2>
      </div>
      <table class="standings-table">
        <thead>
          <tr>
            <th />
            <th>球隊</th>
            <th>場次</th>
            <th>勝</th>
            <th>平</th>
            <th>負</th>
            <th>積分</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="team in teams" :key="team.teamCode">
            <td>{{ team.rank }}</td>
            <td class="team-info">
              <img :src="team.teamFlag" :alt="team.teamName" class="team-flag">
              {{ team.teamName }}
            </td>
            <td>{{ team.session }}</td>
            <td>{{ team.wins }}</td>
            <td>{{ team.draws }}</td>
            <td>{{ team.losses }}</td>
            <td>{{ team.points }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useTeamStore } from '~/store/teamStore'
import { useStandingsStore } from '~/store/standingsStore'
import { useRoute } from 'vue-router'

const standingsStore = useStandingsStore()
const teamStore = useTeamStore()
const route = useRoute()
const group = route.query.group || '未知分組'

// 取得目前分組的球隊資料
const teams = teamStore.teams.filter(team => team.teamGroup === group)

console.log('teams:', teams) // 呼叫用，檢查 teams 是否正確

</script>

<style lang="scss" scoped>
.standings-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
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
}
</style>