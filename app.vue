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

:root {
  --brand-blue-900: #07142f;
  --brand-blue-700: #0d1f4c;
  --brand-gold-400: #ffd268;
  --brand-red-500: #e31d1a;
  --text-primary: #ffffff;
}

body {
  font-family: 'Noto Sans TC', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  color: var(--text-primary);
  margin: 0;
  min-height: 90vh;
  padding: 50px 12px;
  position: relative;
  background: linear-gradient(150deg, #04112b 0%, #0c1d48 52%, #1f1129 100%);
  overflow-x: hidden;

  &::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: linear-gradient(rgba(2, 10, 28, 0.66), rgba(11, 20, 53, 0.72)), url('/img/FIFA-unveils-Official-FIFA-World-Cup-2026-Album-squad.avif');
    background-repeat: no-repeat;
    background-position: center top;
    background-size: cover;
    z-index: -2;
  }

  &::after {
    content: '';
    position: fixed;
    inset: 0;
    z-index: -1;
    background:
      radial-gradient(circle at 14% 12%, rgba(255, 210, 104, 0.26), rgba(255, 210, 104, 0) 44%),
      radial-gradient(circle at 88% 80%, rgba(227, 29, 26, 0.2), rgba(227, 29, 26, 0) 42%);
    pointer-events: none;
  }

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
    padding: 64px 8px 20px;

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

::selection {
  background: rgba(255, 210, 104, 0.35);
  color: #ffffff;
}
</style>
