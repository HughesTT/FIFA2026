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
    <GroupCard />
  </div>
</template>

<script setup>
const titleA = "FIFA";
const titleB = "World Cup 2026";
// SEO
useSeoMeta({
  title: 'FIFA World Cup 2026',
  description: 'FIFA World Cup 2026 全部小組賽賽程資訊'
})
onMounted(() => {
  document.title = 'FIFA World Cup 2026'
})
</script>

<style lang="scss"></style>