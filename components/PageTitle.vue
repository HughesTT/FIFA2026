<template>
  <div class="title-container">
    <h1>{{ titleA }}</h1>
    <h1>{{ titleB }}</h1>
  </div>
</template>

<script setup>
const titleA = "FIFA";
const titleB = "World Cup 2026";
</script>
<style lang="scss" scoped>
.title-container h1 {
  font-family: 'FIFA2026-NormalBlack', sans-serif;
}
</style>