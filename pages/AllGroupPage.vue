<template>
  <div>
    <div class="title-container">
      <h1>{{ titleA }}</h1>
      <h1>{{ titleB }}</h1>
    </div>
    <BackHome />
    <BtnGotoKnockoutMatches />
    <GroupCard />
  </div>
</template>

<script setup>
const titleA = "FIFA";
const titleB = "World Cup 2026";
// SEO
useSeoMeta({
  title: 'FIFA World Cup 2026',
  description: 'FIFA World Cup 2026 全部賽程與對戰結果資訊'
})
</script>

<style lang="scss" scoped>
.title-container h1 {
  font-family: 'FIFA2026-NormalBlack', sans-serif;
}

.fifacup {
  animation: fadeInBottom 2s;
}

@keyframes fadeInBottom {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>