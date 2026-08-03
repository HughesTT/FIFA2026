<template>
  <div class="home-page">
    <section class="hero-card">
      <div class="hero-copy">
        <h1 class="hero-title">
          <span>{{ titleA }}</span>
          <span>{{ titleB }}</span>
        </h1>
        <p class="hero-subtitle">
          掌握 FIFA World Cup 2026 完整賽程、小組賽與淘汰賽對戰資訊。
        </p>

        <div class="cta-row">
          <button type="button" class="cta-btn cta-primary" @click="goToKnockout">
            前往淘汰賽
          </button>
          <button type="button" class="cta-btn cta-secondary" @click="goToGroup">
            前往小組賽
          </button>
        </div>

        <div class="hero-metrics">
          <article class="metric-card">
            <span class="metric-value">104</span>
            <span class="metric-label">總場次</span>
          </article>
          <article class="metric-card">
            <span class="metric-value">48</span>
            <span class="metric-label">參賽隊伍</span>
          </article>
        </div>
      </div>

      <div class="hero-visual">
        <div class="visual-glow" />
        <h2>Champion</h2>
        <img src="/img/FIFA2026.png" alt="FIFA World Cup 2026" class="champion-image">
      </div>
    </section>

    <section class="quick-entry">
      <button type="button" class="entry-card" @click="goToKnockout">
        <h2>淘汰賽對戰圖表</h2>
        <p>從 32 強到決賽，追蹤每一輪戰況。</p>
      </button>
      <button type="button" class="entry-card" @click="goToGroup">
        <h2>小組賽總覽</h2>
        <p>查看分組排名與各組賽程結果。</p>
      </button>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const titleA = 'FIFA'
const titleB = 'World Cup 2026'

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
.home-page {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  gap: 1.5rem;
  animation: pageReveal 0.5s ease-out;
}

.hero-card {
  position: relative;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 1.5rem;
  padding: 2rem;
  border-radius: 28px;
  background: linear-gradient(140deg, rgba(13, 31, 76, 0.82) 0%, rgba(13, 15, 42, 0.72) 48%, rgba(98, 16, 28, 0.65) 100%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 26px 50px rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(3px);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 34%);
    pointer-events: none;
  }
}

.hero-copy {
  display: grid;
  gap: 1rem;
  align-content: start;
}

.hero-eyebrow {
  margin: 0;
  color: #ffdf8f;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.86rem;
}

.hero-title {
  margin: 0;
  display: grid;
  gap: 0.15rem;
  line-height: 0.94;

  span {
    font-family: 'FIFA2026-NormalBlack', sans-serif;
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    color: #ffffff;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  }
}

.hero-subtitle {
  margin: 0;
  max-width: 60ch;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  font-size: 1rem;
}

.hero-copy>* {
  opacity: 0;
  transform: translateY(10px);
  animation: riseIn 0.45s ease-out forwards;
}

.hero-copy>*:nth-child(1) {
  animation-delay: 0.05s;
}

.hero-copy>*:nth-child(2) {
  animation-delay: 0.1s;
}

.hero-copy>*:nth-child(3) {
  animation-delay: 0.16s;
}

.hero-copy>*:nth-child(4) {
  animation-delay: 0.22s;
}

.hero-copy>*:nth-child(5) {
  animation-delay: 0.28s;
}

.cta-row {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.25rem;
  flex-wrap: wrap;
}

.cta-btn {
  border: 0;
  border-radius: 999px;
  min-height: 48px;
  padding: 0 1.4rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.25s ease, background-color 0.25s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 3px solid rgba(255, 210, 104, 0.78);
    outline-offset: 2px;
  }
}

.cta-primary {
  color: #0d1f4c;
  background: linear-gradient(120deg, #ffd268 0%, #ffb347 100%);
  box-shadow: 0 10px 24px rgba(255, 178, 70, 0.38);
}

.cta-secondary {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.28);
}

.hero-metrics {
  margin-top: 0.3rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.6rem;
}

.metric-card {
  background: rgba(255, 255, 255, 0.09);
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 14px;
  padding: 0.7rem 0.75rem;
  display: grid;
  gap: 0.2rem;
}

.metric-value {
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 800;
}

.metric-label {
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.85rem;
}

.hero-visual {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 320px;
}

.visual-glow {
  position: absolute;
  width: min(100%, 360px);
  height: min(100%, 360px);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 198, 94, 0.65) 0%, rgba(255, 198, 94, 0.2) 38%, rgba(255, 198, 94, 0) 72%);
  filter: blur(8px);
}

.champion-image {
  position: relative;
  width: min(100%, 300px);
  height: auto;
  display: block;
  z-index: 1;
  filter: drop-shadow(0 18px 24px rgba(0, 0, 0, 0.42));
  animation: floatCup 4.2s ease-in-out infinite;
}

.quick-entry {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.entry-card {
  text-align: left;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 18px;
  background: linear-gradient(145deg, rgba(9, 25, 60, 0.74) 0%, rgba(31, 18, 48, 0.68) 100%);
  color: #ffffff;
  padding: 1.1rem 1.2rem;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

  h2 {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 800;
  }

  p {
    margin: 0.45rem 0 0;
    color: rgba(255, 255, 255, 0.84);
    line-height: 1.5;
    font-size: 0.95rem;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 210, 104, 0.75);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.22);
  }

  &:focus-visible {
    outline: 3px solid rgba(255, 210, 104, 0.75);
    outline-offset: 2px;
  }
}

@keyframes floatCup {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

@keyframes pageReveal {
  from {
    opacity: 0;
    transform: translateY(18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes riseIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {

  .home-page,
  .champion-image,
  .hero-copy>* {
    animation: none !important;
  }

  .cta-btn,
  .entry-card {
    transition: none;
  }
}

@media (max-width: 960px) {
  .hero-card {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }

  .hero-subtitle {
    max-width: unset;
  }

  .hero-visual {
    min-height: 260px;
  }
}

@media (max-width: 768px) {
  .home-page {
    gap: 1rem;
  }

  .hero-card {
    border-radius: 22px;
  }

  .hero-metrics {
    grid-template-columns: 1fr;
  }

  .quick-entry {
    grid-template-columns: 1fr;
  }

  .cta-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .hero-card {
    padding: 1.2rem;
  }

  .hero-eyebrow {
    font-size: 0.78rem;
  }

  .hero-subtitle {
    font-size: 0.94rem;
  }

  .entry-card {
    h2 {
      font-size: 1.04rem;
    }

    p {
      font-size: 0.9rem;
    }
  }
}
</style>