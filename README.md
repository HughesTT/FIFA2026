# ⚽ FIFA 2026 世界盃賽程表

> 2026 FIFA 世界盃足球賽賽程、小組積分、淘汰賽對戰一覽，支援響應式設計，部署於 GitHub Pages。

---

## 🌐 線上預覽

👉 [https://hughestt.github.io/FIFA2026/](https://hughestt.github.io/FIFA2026/)

---

## ✨ 主要功能

| 功能 | 說明 |
|------|------|
| 📋 **小組賽程一覽** | 顯示全部分組的比賽日期、比分與結果 |
| 🏆 **小組積分榜** | 即時呈現各組隊伍積分、勝負差 |
| 🌍 **國家隊賽程查詢** | 點擊任一國旗，查看該隊伍的完整賽程 |
| 🥊 **淘汰賽對戰表** | 視覺化呈現 16 強至決賽的完整對戰樹狀圖 |
| 🗓️ **賽程彈窗詳情** | 點擊比賽卡片，開啟詳細賽程資訊 Modal |
| 📱 **響應式設計** | 桌機與行動裝置皆提供良好瀏覽體驗 |

---

## 🛠️ 技術使用

| 分類 | 技術 |
|------|------|
| **框架** | Nuxt 4 + Vue 3 (Composition API) |
| **語言** | TypeScript |
| **狀態管理** | Pinia(`@pinia/nuxt`) |
| **UI 元件庫** | @nuxt/ui |
| **CSS 框架** | Tailwind CSS v4 + SCSS |
| **路由** | Vue Router（Nuxt File-based Routing）|
| **Linting** | ESLint (`@nuxt/eslint`) |
| **部署** | GitHub Pages（靜態匯出） |

---

## 📁 專案結構

```
FIFA2026/
├── pages/                      # 頁面路由（Nuxt File-based Routing）
│   ├── index.vue               # 首頁：小組賽程總覽
│   ├── AllGroupPage.vue        # 所有小組一覽
│   ├── GroupGameSchedule.vue   # 單一小組賽程
│   ├── CountryGameSchedule.vue # 國家隊賽程查詢
│   └── KnockoutMatches.vue     # 淘汰賽對戰表
├── components/                 # 共用元件
│   ├── MatchCard.vue           # 比賽卡片
│   ├── GroupCard.vue           # 小組卡片（含積分與排名）
│   ├── GameScheduleModal.vue   # 賽程詳情互動視窗
│   ├── BracketColumn.vue       # 淘汰賽樹狀圖欄位
│   ├── BracketMatchNode.vue    # 淘汰賽比賽節點
│   ├── BracketNav.vue          # 淘汰賽導覽列
│   ├── Standings.vue           # 積分榜元件
│   └── ...
├── composable/                 # Vue Composables
│   ├── useMatches.ts           # 比賽資料邏輯
│   ├── useBracket.ts           # 淘汰賽邏輯
│   ├── useGameScheduleModal.ts # 賽程互動視窗邏輯
│   ├── useGroupStandings.ts    # 積分排名計算
│   ├── useCountryGameSchedule.ts
│   └── ...
├── store/                      # Pinia 狀態管理
│   ├── teamStore.ts            # 隊伍 & 小組賽資料
│   └── knockoutStore.ts        # 淘汰賽資料
├── types/                      # TypeScript 型別定義
│   ├── match.ts
│   └── knockoutResults.ts
├── assets/                     # 靜態資源（SCSS、圖片等）
├── public/                     # 公開靜態檔案
├── nuxt.config.ts              # Nuxt 設定
├── package.json
└── tsconfig.json
```

## 📜 授權

本專案僅供個人學習與展示用途。賽事資料版權屬於 FIFA。
