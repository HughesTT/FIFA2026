<template>
  <div>
    <div class="title-container">
      <h1>{{ titleA }}</h1>
      <h1>{{ titleB }}</h1>
    </div>
    <div class="topimg">
      <img src="/img/FIFA2026.png" class="fifacup">
    </div>
    <GameScheduleModal />
    <button class="gotoKO" @click="goToKnockout">淘汰賽對戰表</button>
    <GroupCard />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { teamStore } from '~/store/teamStore'
const router = useRouter()
const titleA = "FIFA";
const titleB = "World Cup 2026";
// SEO
useSeoMeta({
  title: 'FIFA World Cup 2026',
  description: 'FIFA World Cup 2026 全部小組賽賽程資訊'
})

const goToKnockout = () => {
  router.push('/knockoutMatches')
}
onMounted(async () => {
  document.title = 'FIFA World Cup 2026'
  await teamStore.fetchTeams()
})
</script>

<style lang="scss" scoped>
.title-container h1 {
  font-family: 'FIFA2026-NormalBlack', sans-serif;
}

.gotoKO {
  font-size: 1rem;
  position: fixed;
  top: 20px;
  right: 10px;
  width: 130px;
  height: 40px;
  font-family: 'FIFA2026-NormalBold', sans-serif;
  background-color: #e31d1a;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 100;
}
</style>