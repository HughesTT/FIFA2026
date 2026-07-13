<template>
  <NuxtPage />
</template>

<style lang="scss">
@font-face {
  font-family: 'FIFA2026-NormalBlack';
  src: url('/font/FWC2026-NormalBlack.2bd896c8.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

body {
  font-family: 'Noto Sans TC', sans-serif;
  background: url('/img/FIFA-unveils-Official-FIFA-World-Cup-2026-Album-squad.jpg') no-repeat top center;
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
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }
    }
  }

  @media(max-width: 768px) {
    background-attachment: scroll;
    padding: 64px 8px 18px;

    .title-container h1 {
      font-size: 46px;
    }

    .fifacup {
      width: 300px;
    }
  }

  @media(max-width: 480px) {
    padding: 60px 6px 14px;

    .title-container {
      margin-bottom: 20px;

      h1 {
        font-size: 36px;
        line-height: 1.05;
      }
    }

    .topimg {
      margin-bottom: 24px;

      .fifacup {
        width: min(88vw, 260px);
      }
    }
  }
}
</style>
