<template>
  <div class="index-container">
    <div class="title-container">
      <h1>{{ titleA }}</h1>
      <h1>{{ titleB }}</h1>
    </div>
    <div class="left-container">
      <div class="knockoutmatches" @click="goToKnockout">淘汰賽</div>
      <div class="allgroup" @click="goToGroup">小組賽</div>
    </div>
    <div class="right-container">
      <GameScheduleModal />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const titleA = "FIFA";
const titleB = "World Cup 2026";
// SEO
useSeoMeta({
  title: 'FIFA World Cup 2026',
  description: 'FIFA World Cup 2026 全部賽程與對戰結果資訊'
})

const goToKnockout = () => {
  router.push('/knockoutMatches')
}
const goToGroup = () => {
  router.push('/allgrouppage')
}
</script>

<style lang="scss" scoped>
.title-container h1 {
  font-family: 'FIFA2026-NormalBlack', sans-serif;
  font-size: 60px;
  margin: 0;
}

.left-container {
  float: left;
  display: flex;
  width: 40%;
  justify-content: right;
  align-items: center;
  padding-top: 10%;
  animation: slideDown 0.4s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .knockoutmatches {
    font-size: 1.5rem;
    width: 150px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background-color: #4d00a5;
    border: solid #fff 5px;
    color: #fff;
    padding: 5px 0;
    margin-right: 1rem;
    border-radius: 25px;
    cursor: pointer;
    z-index: 100;
    transition: all 0.3s;
  }

  .allgroup {
    font-size: 1.5rem;
    width: 150px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background-color: #e31d1a;
    border: solid #fff 5px;
    color: #fff;
    padding: 5px 0;
    border-radius: 25px;
    cursor: pointer;
    z-index: 100;
    transition: all 0.3s;
  }
}

.right-container {
  width: 40%;
  float: right;
  margin-right: 1rem;
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

@media (max-width: 768px) {
  .title-container h1 {
    font-size: 3rem;
  }

  .left-container {
    width: 100%;
    justify-content: center;
    padding-top: 5%;
    flex-direction: column;

    .knockoutmatches,
    .allgroup {
      width: 200px;
      margin-bottom: 1rem;
    margin-right: 0;
    }
  }

  .right-container {
    width: 100%;
    margin-right: 0;
    margin-top: 2rem;
  }
}
</style>