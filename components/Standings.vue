<template>
  <div class="standings-container">
    <div class="standings-card">
      <div class="standings-header">
        <h2>🏆 小組戰績</h2>
      </div>
      <div v-if="standings.length === 0" class="no-standings">目前沒有積分榜資料</div>
      <table v-else class="standings-table">
        <thead>
          <tr>
            <th>排名</th>
            <th>球隊</th>
            <th>勝</th>
            <th>平</th>
            <th>負</th>
            <th>積分</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="team in standings" :key="team.teamCode">
            <td>{{ team.rank }}</td>
            <td class="team-info">
              <img :src="team.teamFlag" :alt="team.teamName" class="team-flag">
              {{ team.teamName }}
            </td>
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
import { useStandingsStore } from '~/store/standingsStore'

const props = defineProps({
  standings: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="scss" scoped></style>