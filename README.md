# FIFA 2026 世界盃賽程表

## 專案簡介
提供 2026 FIFA 世界盃足球賽相關賽程資訊。具使用者友善的介面，快速查詢各組小組賽程、即時比數，以及各國家隊的詳細賽程等功能。

## 主要功能
*   **淘汰賽**：新增淘汰賽對戰組合與比賽日期。
*   **小組賽程一覽**：顯示所有分組的比賽日程與結果。
*   **即時比數更新**：提供比賽的最新比分。
*   **國家隊賽程查詢**：點擊特定國家隊，即可查看該隊伍的所有比賽安排。
*   **即將進行的比賽**：透過彈窗快速瀏覽近期即將開打的賽事。
*   **響應式設計**：在桌機與行動裝置上皆提供良好的瀏覽體驗。

## 使用技術
*   **前端框架**：Vue 3 (搭配 Nuxt 3)
*   **狀態管理**：Pinia
*   **路由**：Vue Router
*   **樣式預處理器**：SCSS
*   **語言**：JavaScript、TypeScript


## 專案設定與執行

### 安裝依賴
```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 開發模式
```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```
在開發模式下運行應用程式，並啟用熱重載。

### 建構生產版本
```bash
npm run build
# 或
yarn build
# 或
pnpm build
```
為生產環境建構應用程式。

### 預覽生產版本
```bash
npm run preview
# 或
yarn preview
# 或
pnpm preview
```
在本地預覽生產環境建構的應用程式。

## 專案結構 (簡要)
*   `components/`: 存放可重用的 Vue 元件，例如 `MatchCard.vue`。
*   `pages/`: 存放應用程式的路由頁面，例如 `index.vue` (首頁)、`GroupGameSchedule.vue` (分組賽程)。
*   `composable/`: 存放可複用的邏輯函數，例如 `useGroupStandings.js`。
*   `store/`: 存放 Pinia 狀態管理模組，例如 `teamStore.js`。
*   `public/`: 存放靜態資源，例如圖片 (`img/`)、字體 (`font/`)。
