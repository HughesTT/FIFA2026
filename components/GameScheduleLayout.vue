<template>
  <div class="game-container">
    <BackHome />
    <PageTitle />
    <Standings />

    <div class="game-card">
      <slot name="header" />
      <slot />
    </div>
  </div>
</template>

<script setup>
// Shared layout wrapper for game schedule pages
</script>

<style lang="scss">
@import "~/assets/css/game-schedule.scss";
</style>
