<template>
  <div>
    <h1>{{ title }}</h1>
    <GameScheduleModal />
    <GroupCard />
  </div>
</template>

<script setup>
const title = "FIFA World Cup 2026";
// SEO
useSeoMeta({
  title: 'FIFA World Cup 2026',
  description: 'FIFA World Cup 2026 全部小組賽賽程資訊'
})
</script>

<style lang="scss">
body {
  font-family: 'Noto Sans TC', sans-serif;
  background: url('../public/img/FIFA-unveils-Official-FIFA-World-Cup-2026-Album-squad.avif') no-repeat fixed top center;
  background-size: cover;
  margin: 0;
  padding: 20px;

  h1 {
    text-align: center;
    color: #fff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
    margin-bottom: 40px;
  }
}
</style>