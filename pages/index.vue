<template>
  <div>
    <div class="title-container">
      <h1>{{ titleA }}</h1>
      <h1>{{ titleB }}</h1>
    </div>
    <div class="topimg">
      <img src="/public/img/FIFA2026.png" class="fifacup">
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

<style lang="scss">
@font-face {
  font-family: 'FIFA2026-NormalBlack';
  src: url('/public/font/FWC2026-NormalBlack.2bd896c8.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

body {
  font-family: 'FIFA2026-NormalBlack', 'Noto Sans TC', sans-serif;
  background: url('../public/img/FIFA-unveils-Official-FIFA-World-Cup-2026-Album-squad.jpg') no-repeat fixed top center;
  background-size: cover;
  margin: 0;
  padding: 50px 10px;

  .title-container {
    margin-bottom: 30px;

    h1 {
      font-size: 60px;
      text-align: center;
      color: #fff;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
      margin: 0;
    }
  }

  .topimg {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;

    .fifacup {
      max-width: 400px;
      height: auto;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }
    }
  }

  @media(max-width: 768px) {
    .title-container h1 {
      font-size: 46px;
    }

    .fifacup {
      width: 300px;
    }
  }
}
</style>