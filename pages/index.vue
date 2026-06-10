<template>
  <div>
    <h1>{{ title }}</h1>
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
  background: url('../public/img/8b3a7cbf-911c-4809-a084-368496c1d04c.webp') no-repeat top right;
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