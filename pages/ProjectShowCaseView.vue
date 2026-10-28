<template>
  <main class="showcase">
    <header class="hero">
      <div class="hero-copy">
        <p class="eyebrow"><span class="eyebrow-mark"/> FIFA 2026 · 個人專案</p>
        <h1>把世界盃<br><span>變成一場探索。</span></h1>
        <p class="hero-description">
          不只呈現賽事，也呈現我是如何打造它。從小組到淘汰賽對戰圖，讓每場比賽都清楚地呈現。
        </p>
        <a class="explore-link" href="#project-features" @click.prevent="scrollToSection('project-features')">
          探索專案 <span aria-hidden="true">↓</span>
        </a>
      </div>
      <div class="hero-visual" aria-label="世界盃賽事介面預覽">
        <img
          src="/img/projectshowcase/screenshot-2.png"
          alt="世界盃小組積分表與賽程介面"
          fetchpriority="high"
        >
        <div class="visual-caption">
          <span class="caption-dot"/>
          賽事資訊，一目了然
        </div>
      </div>
      <div class="hero-index" aria-hidden="true">26</div>
    </header>

    <section id="project-features" class="section features-section">
      <div class="section-heading">
        <p class="eyebrow">01 / 專案功能</p>
        <p class="section-intro">把分散的賽事資訊整理成容易瀏覽的體驗，快速找到想看的賽程與比賽結果。</p>
      </div>

      <div class="feature-list">
        <article class="feature-card feature-card-wide">
          <div class="feature-copy">
            <span class="feature-number">I.</span>
            <h3>小組賽程與戰績排行</h3>
            <p>瀏覽各組賽程與排名，掌握勝負、進失球與積分變化。</p>
            <div class="feature-tags">
              <span>小組賽</span>
              <span>積分榜</span>
            </div>
          </div>
          <img
            src="/img/projectshowcase/screenshot-2.png"
            alt="小組賽積分排行與各場賽程畫面"
            loading="lazy"
          >
        </article>

        <article class="feature-card feature-card-reverse">
          <div class="feature-copy">
            <span class="feature-number">II.</span>
            <h3>淘汰賽對戰圖</h3>
            <p>沿著對戰路徑追蹤熱門隊伍，從八強一路到冠軍賽。</p>
            <div class="feature-tags">
              <span>淘汰賽</span>
              <span>對戰圖</span>
            </div>
          </div>
          <img
            src="/img/projectshowcase/screenshot-3.png"
            alt="世界盃淘汰賽對戰圖介面"
            loading="lazy"
          >
        </article>

        <article class="feature-card feature-card-compact">
          <div class="feature-copy">
            <span class="feature-number">III.</span>
            <h3>各國賽程</h3>
            <p>依照國家快速整理賽事，查看球隊接下來的比賽安排。</p>
            <div class="feature-tags">
              <span>國家賽程</span>
              <span>各組資訊</span>
            </div>
          </div>
          <img
            src="/img/projectshowcase/screenshot-0.png"
            alt="依小組呈現的國家比賽賽程"
            loading="lazy"
          >
        </article>
      </div>
    </section>

    <section class="section toolkit-section">
      <div class="section-heading">
        <p class="eyebrow">02 / 技術選擇</p>
      </div>
      <div class="toolkit-content">
        <p>以 Vue 生態系為核心，將畫面、型別與狀態管理組合成易於維護的專案。</p>
        <ul class="skill-list" aria-label="使用技術">
          <li class="skill-primary">Vue 3</li>
          <li class="skill-green">TypeScript</li>
          <li class="skill-purple">Pinia</li>
          <li class="skill-blue">Nuxt</li>
          <li class="skill-indigo">Bootstrap</li>
          <li class="skill-pink">SCSS</li>
        </ul>
      </div>
    </section>

    <section class="section architecture-section">
      <div class="section-heading">
        <p class="eyebrow">03 / 專案架構</p>
        <p class="section-intro">依照功能拆分頁面、共用元件與資料邏輯，讓專案結構更容易理解與擴充。</p>
      </div>
      <div class="architecture-panel">
        <div class="terminal-bar" aria-hidden="true">
          <span/><span/><span/>
          <small>專案結構</small>
        </div>
        <ul class="directory-list">
          <li class="directory-row"><code><span>pages/</span></code><p>頁面與路由</p></li>
          <li class="directory-entry">
            <button
              class="directory-toggle"
              type="button"
              aria-controls="components-children"
              :aria-expanded="expandedDirectories.components"
              @click="toggleDirectory('components')"
            >
              <span class="directory-label"><code><span>components/</span></code><p>共用介面元件</p></span>
              <span class="directory-chevron" aria-hidden="true"/>
            </button>
            <Transition name="directory-tree">
              <ul v-show="expandedDirectories.components" id="components-children" class="directory-children">
                <li><code><span>├── MatchCard.vue</span></code><p>比賽資訊卡片</p></li>
                <li><code><span>├── GroupCard.vue</span></code><p>小組資訊卡片（含積分與排名）</p></li>
                <li><code><span>├── BracketColumn.vue</span></code><p>淘汰賽樹狀圖欄位</p></li>
                <li><code><span>├── BracketMatchNode.vue</span></code><p>淘汰賽比賽節點</p></li>
                <li><code><span>└── Standings.vue</span></code><p>積分榜元件</p></li>
              </ul>
            </Transition>
          </li>
          <li class="directory-entry">
            <button
              class="directory-toggle"
              type="button"
              aria-controls="composables-children"
              :aria-expanded="expandedDirectories.composables"
              @click="toggleDirectory('composables')"
            >
              <span class="directory-label"><code><span>composable/</span></code><p>可重用的 Vue 邏輯</p></span>
              <span class="directory-chevron" aria-hidden="true"/>
            </button>
            <Transition name="directory-tree">
              <ul v-show="expandedDirectories.composables" id="composables-children" class="directory-children">
                <li><code><span>├── useMatches.ts</span></code><p>比賽資料邏輯</p></li>
                <li><code><span>├── useBracket.ts</span></code><p>淘汰賽階段切換邏輯</p></li>
                <li><code><span>├── useGameScheduleModal.ts</span></code><p>賽程互動視窗邏輯</p></li>
                <li><code><span>└── useGroupStandings.ts</span></code><p>積分排名計算</p></li>
              </ul>
            </Transition>
          </li>
          <li class="directory-entry">
            <button
              class="directory-toggle"
              type="button"
              aria-controls="store-children"
              :aria-expanded="expandedDirectories.store"
              @click="toggleDirectory('store')"
            >
              <span class="directory-label"><code><span>store/</span></code><p>Pinia 狀態管理</p></span>
              <span class="directory-chevron" aria-hidden="true"/>
            </button>
            <Transition name="directory-tree">
              <ul v-show="expandedDirectories.store" id="store-children" class="directory-children">
                <li><code><span>├── teamStore.ts</span></code><p>隊伍 & 小組賽資料</p></li>
                <li><code><span>└── knockoutStore.ts</span></code><p>淘汰賽資料</p></li>
              </ul>
            </Transition>
          </li>
          <li class="directory-entry">
            <button
              class="directory-toggle"
              type="button"
              aria-controls="types-children"
              :aria-expanded="expandedDirectories.types"
              @click="toggleDirectory('types')"
            >
              <span class="directory-label"><code><span>types/</span></code><p>TypeScript 型別定義</p></span>
              <span class="directory-chevron" aria-hidden="true"/>
            </button>
            <Transition name="directory-tree">
              <ul v-show="expandedDirectories.types" id="types-children" class="directory-children">
                <li><code><span>├── match.ts</span></code><p>賽事資料型別</p></li>
                <li><code><span>└── knockoutResults.ts</span></code><p>淘汰賽資料型別</p></li>
              </ul>
            </Transition>
          </li>
          <li class="directory-row"><code><span>assets/</span></code><p>樣式與靜態資源</p></li>
        </ul>
      </div>
    </section>

    <section class="reflection">
      <div>
        <p class="eyebrow">04 / 開發筆記</p>
      </div>
      <div class="reflection-copy">
        <p>開發過程中曾經碰到賽程顯示的國旗圖示與國家名稱對應錯誤的問題</p>
        <p>因為當時不是直接把Pinia的球隊資料拿來當成比賽清單，而是先取得戰績表的比賽清單，再對應球隊資料，導致國旗圖示與國家名稱出現錯誤。</p>
        <p>後來我調整了資料對應的邏輯，確保比賽清單中的球隊名稱能正確對應到 Pinia 中的球隊資料，解決了國旗圖示與國家名稱錯誤的問題。</p>
        <b>感想：</b>
        <p>這個過程讓我了解到，比賽資料與球隊資料之間的對應關係很重要。如果不同資料來源的球隊名稱不一致，就可能造成代碼對應失敗，進而影響賽程篩選。因此在規劃資料結構時，應該盡量使用一致且穩定的識別碼來建立關聯，降低後續維護的成本。</p>
      </div>
      <span class="reflection-star" aria-hidden="true">✳</span>
    </section>

    <footer class="showcase-footer">
      <span>FIFA 2026 PROJECT</span>
    </footer>
  </main>
</template>
<script setup lang="ts">
import { ref } from 'vue'

type DirectoryKey = 'components' | 'composables' | 'store' | 'types'

const expandedDirectories = ref<Record<DirectoryKey, boolean>>({
  components: false,
  composables: false,
  store: false,
  types: false,
})

const scrollToSection = (id: string) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

const toggleDirectory = (directory: DirectoryKey) => {
  expandedDirectories.value[directory] = !expandedDirectories.value[directory]
}
</script>
<style scoped lang="scss">
.showcase {
  --showcase-ink: #f7f8fc;
  --showcase-muted: #b8c2d8;
  --showcase-gold: #ffd268;
  --showcase-line: rgba(255, 255, 255, 0.16);

  width: min(1200px, 100%);
  margin: 0 auto;
  padding: clamp(24px, 5vw, 72px) clamp(16px, 4vw, 48px) 28px;
  color: var(--showcase-ink);
}

.hero {
  min-height: 520px;
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  align-items: center;
  gap: clamp(32px, 6vw, 76px);
  position: relative;
  isolation: isolate;
  padding: 28px 0 84px;
}

.hero-copy,
.hero-visual {
  position: relative;
  z-index: 1;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 20px;
  color: var(--showcase-gold);
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.eyebrow-mark,
.caption-dot {
  width: 7px;
  height: 7px;
  flex: 0 0 7px;
  border-radius: 50%;
  background: var(--showcase-gold);
  box-shadow: 0 0 14px rgba(255, 210, 104, 0.8);
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

.hero h1 {
  margin-bottom: 22px;
  font-size: clamp(2.5rem, 5.2vw, 4.65rem);
  line-height: 1.16;
  letter-spacing: -0.055em;

  span {
    color: var(--showcase-gold);
  }
}

.hero-description,
.section-intro,
.toolkit-content > p,
.feature-copy > p,
.reflection-copy p {
  color: var(--showcase-muted);
  line-height: 1.9;
}

.hero-description {
  max-width: 440px;
  margin-bottom: 28px;
  font-size: 1rem;
}

.explore-link {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  color: var(--showcase-ink);
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
  transition: color 180ms ease, gap 180ms ease;

  span {
    color: var(--showcase-gold);
    font-size: 1.25rem;
  }

  &:hover {
    gap: 22px;
    color: var(--showcase-gold);
  }
}

.hero-visual {
  padding: 12px;
  border: 1px solid var(--showcase-line);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 28px 90px rgba(0, 0, 0, 0.32);
  transform: rotate(1.5deg);

  img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
}

.visual-caption {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 6px 2px;
  color: var(--showcase-muted);
  font-size: 0.82rem;
}

.caption-dot {
  width: 6px;
  height: 6px;
  flex-basis: 6px;
  background: #64d99b;
  box-shadow: 0 0 12px rgba(100, 217, 155, 0.7);
}

.hero-index {
  position: absolute;
  z-index: 0;
  right: -2%;
  bottom: 10px;
  color: rgba(255, 255, 255, 0.035);
  font-size: clamp(12rem, 30vw, 25rem);
  font-weight: 900;
  line-height: 0.8;
  pointer-events: none;
}

.section {
  padding: clamp(64px, 9vw, 112px) 0;
  border-top: 1px solid var(--showcase-line);
}

.section-heading {
  max-width: 680px;
  margin-bottom: 42px;

  h2 {
    margin-bottom: 16px;
    font-size: clamp(2rem, 4.3vw, 3.35rem);
    line-height: 1.25;
    letter-spacing: -0.04em;

    span {
      color: var(--showcase-gold);
    }
  }
}

.section-heading .eyebrow {
  margin-bottom: 18px;
}

.section-intro {
  max-width: 580px;
  margin-bottom: 0;
}

.feature-list {
  display: grid;
  gap: 22px;
}

.feature-card {
  display: grid;
  grid-template-columns: minmax(210px, 0.65fr) minmax(0, 1.35fr);
  align-items: center;
  gap: clamp(24px, 5vw, 60px);
  overflow: hidden;
  padding: clamp(20px, 3vw, 34px);
  border: 1px solid var(--showcase-line);
  border-radius: 16px;
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.035));

  > img {
    display: block;
    width: 100%;
    border-radius: 9px;
    box-shadow: 0 16px 38px rgba(0, 0, 0, 0.25);
  }
}

.feature-card-reverse {
  grid-template-columns: minmax(0, 1.35fr) minmax(210px, 0.65fr);

  .feature-copy {
    grid-column: 2;
    grid-row: 1;
  }

  > img {
    grid-column: 1;
    grid-row: 1;
  }
}

.feature-card-compact {
  grid-template-columns: minmax(210px, 0.65fr) minmax(0, 1.35fr);

  > img {
    max-height: 310px;
    object-fit: cover;
    object-position: top;
  }
}

.feature-number {
  display: block;
  margin-bottom: 14px;
  color: var(--showcase-gold);
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.feature-copy h3 {
  margin-bottom: 12px;
  font-size: clamp(1.25rem, 2vw, 1.6rem);
}

.feature-copy > p {
  margin-bottom: 18px;
  font-size: 0.92rem;
}

.feature-tags,
.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}

.feature-tags span,
.skill-list li {
  padding: 7px 12px;
  border: 1px solid rgba(255, 210, 104, 0.3);
  border-radius: 999px;
  background: rgba(255, 210, 104, 0.08);
  color: #ffe3a0;
  font-size: 0.76rem;
}

.toolkit-section {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  align-items: center;
  gap: clamp(32px, 8vw, 100px);
}

.toolkit-section .section-heading {
  margin-bottom: 0;
}

.toolkit-content > p {
  margin-bottom: 24px;
}

.skill-list {
  padding: 0;
  margin: 0;
  list-style: none;

  li {
    padding: 10px 16px;
    color: var(--showcase-ink);
    font-size: 0.86rem;
    cursor: pointer;

    &.skill-primary {
      background: rgba(0, 123, 255, 0.4);
      border-color: rgba(0, 123, 255, 0.8);
      color: #fff;

      &:hover {
        background: rgba(0, 123, 255, 0.6);
        border-color: rgba(0, 123, 255, 1);
      }
    }
    &.skill-green {
      background: rgba(40, 167, 69, 0.4);
      border-color: rgba(40, 167, 69, 0.8);
      color: #fff;

      &:hover {
        background: rgba(40, 167, 69, 0.6);
        border-color: rgba(40, 167, 69, 1);
      }
    }
    &.skill-purple {
      background: rgba(111, 66, 193, 0.4);
      border-color: rgba(111, 66, 193, 0.8);
      color: #fff;
      
      &:hover {
        background: rgba(111, 66, 193, 0.6);
        border-color: rgba(111, 66, 193, 1);
      }
    }
    &.skill-blue {
      background: rgba(0, 123, 255, 0.4);
      border-color: rgba(0, 123, 255, 0.8);
      color: #fff;

      &:hover {
        background: rgba(0, 123, 255, 0.6);
        border-color: rgba(0, 123, 255, 1);
      }
    }
    &.skill-indigo {
      background: rgba(75, 0, 130, 0.5);
      border-color: rgba(75, 0, 130, 0.8);
      color: #fff;

      &:hover {
        background: rgba(75, 0, 130, 0.6);
        border-color: rgba(75, 0, 130, 1);
      }
    }
    &.skill-pink {
      background: rgba(255, 192, 203, 0.4);
      border-color: rgba(255, 192, 203, 0.8);
      color: #fff;

      &:hover {
        background: rgba(255, 192, 203, 0.6);
        border-color: rgba(255, 192, 203, 1);
      }
    }
  }
}

.architecture-section {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  align-items: center;
  gap: clamp(32px, 8vw, 100px);
}

.architecture-section .section-heading {
  margin-bottom: 0;
}

.architecture-panel {
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 14px;
  background: rgba(4, 12, 31, 0.76);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.24);
}

.terminal-bar {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 15px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ff6b63;

    &:nth-child(2) {
      background: #ffd268;
    }

    &:nth-child(3) {
      background: #63d995;
    }
  }

  small {
    margin-left: auto;
    color: rgba(255, 255, 255, 0.42);
    font-size: 0.63rem;
    letter-spacing: 0.12em;
  }
}

.directory-list {
  padding: 10px 22px 18px;
  margin: 0;
  list-style: none;

  > li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);

    &:last-child {
      border-bottom: 0;
    }
  }

  .directory-entry {
    display: block;
    padding: 0;
  }

  .directory-toggle {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    padding: 10px 0;
    border: 0;
    background: transparent;
    color: inherit;
    text-align: left;
    cursor: pointer;

    &:hover .directory-label code span,
    &:focus-visible .directory-label code span {
      color: #fff;
    }

    &:focus-visible {
      outline: 2px solid var(--showcase-gold);
      outline-offset: 3px;
    }
  }

  .directory-label {
    display: flex;
    min-width: 0;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
  }

  .directory-chevron {
    width: 8px;
    height: 8px;
    flex: 0 0 auto;
    margin-right: 4px;
    border-right: 1px solid var(--showcase-muted);
    border-bottom: 1px solid var(--showcase-muted);
    transform: rotate(45deg);
    transition: transform 180ms ease;
  }

  .directory-toggle[aria-expanded='true'] .directory-chevron {
    transform: rotate(225deg);
  }

  .directory-children {
    overflow: hidden;
    padding: 0 0 10px 20px;
    margin: 0;
    list-style: none;

    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 18px;
      padding: 7px 0;
    }
  }

  .directory-tree-enter-active,
  .directory-tree-leave-active {
    max-height: 400px;
    overflow: hidden;
    transition: max-height 240ms ease, opacity 180ms ease;
  }

  .directory-tree-enter-from,
  .directory-tree-leave-to {
    max-height: 0;
    opacity: 0;
  }

  code {
    color: #f1f3f8;
    font-size: 0.88rem;
  }

  code span {
    color: var(--showcase-gold);
  }

  p {
    margin: 0;
    color: var(--showcase-muted);
    font-size: 0.8rem;
    text-align: right;
  }
}

@media (prefers-reduced-motion: reduce) {
  .directory-list .directory-chevron {
    transition: none;
  }

  .directory-list .directory-tree-enter-active,
  .directory-list .directory-tree-leave-active {
    transition: none;
  }
}

.reflection {
  position: relative;
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: clamp(32px, 8vw, 100px);
  overflow: hidden;
  padding: clamp(36px, 6vw, 72px);
  border: 1px solid rgba(255, 210, 104, 0.28);
  border-radius: 18px;
  background:
    radial-gradient(circle at 90% 15%, rgba(227, 29, 26, 0.16), transparent 34%),
    linear-gradient(125deg, rgba(255, 210, 104, 0.1), rgba(255, 255, 255, 0.035));

  .eyebrow {
    margin-bottom: 18px;
  }

  h2 {
    position: relative;
    z-index: 1;
    margin-bottom: 0;
    font-size: clamp(1.8rem, 3.8vw, 2.8rem);
    line-height: 1.3;

    span {
      color: var(--showcase-gold);
    }
  }
}

.reflection-copy {
  position: relative;
  z-index: 1;

  p:last-child {
    margin-bottom: 0;
  }
}

.reflection-star {
  position: absolute;
  right: 12px;
  bottom: -96px;
  color: rgba(255, 210, 104, 0.07);
  font-size: 18rem;
  line-height: 1;
}

.showcase-footer {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 28px 0 4px;
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.72rem;
  letter-spacing: 0.06em;
}

@media (max-width: 760px) {
  .hero {
    min-height: auto;
    grid-template-columns: 1fr;
    gap: 40px;
    padding-top: 16px;
    padding-bottom: 64px;
  }

  .hero-copy {
    max-width: 600px;
  }

  .hero-visual {
    width: min(100% - 12px, 620px);
    justify-self: center;
  }

  .hero-index {
    right: 0;
    bottom: 0;
  }

  .feature-card,
  .feature-card-reverse,
  .feature-card-compact {
    grid-template-columns: 1fr;
    gap: 22px;
  }

  .feature-card-reverse .feature-copy,
  .feature-card-reverse > img {
    grid-column: auto;
    grid-row: auto;
  }

  .toolkit-section,
  .architecture-section,
  .reflection {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .toolkit-section .section-heading,
  .architecture-section .section-heading {
    margin-bottom: 0;
  }
}

@media (max-width: 480px) {
  .showcase {
    padding-right: 14px;
    padding-left: 14px;
  }

  .hero h1 {
    font-size: clamp(2.25rem, 11vw, 3.25rem);
  }

  .section {
    padding: 64px 0;
  }

  .section-heading {
    margin-bottom: 30px;
  }

  .feature-card {
    padding: 18px;
  }

  .reflection {
    padding: 28px 22px;
  }

  .directory-list {
    padding-right: 16px;
    padding-left: 16px;

    li {
      gap: 10px;
    }

    code {
      font-size: 0.8rem;
    }

    p {
      font-size: 0.72rem;
    }
  }

  .showcase-footer {
    flex-direction: column;
    gap: 8px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
