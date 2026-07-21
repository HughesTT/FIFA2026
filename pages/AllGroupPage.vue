<template>
  <div>
    <PageTitle />
    <BackHome />
    <BtnGotoKnockoutMatches />
    <GroupCard />
  </div>
</template>

<script setup>
// SEO
useSeoMeta({
  title: 'FIFA World Cup 2026',
  description: 'FIFA World Cup 2026 全部賽程與對戰結果資訊'
})
</script>

<style lang="scss" scoped>
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