<template>
    <div class="knockout-container">
        <BackHome />
        <div class="knockout-header">
            <h1>淘汰賽</h1>
        </div>
        <div class="knockout-content">
            <div class="bracket-shell">
                <button class="bracket-nav prev" :disabled="!canPrev" @click="prevStages">
                    ‹
                </button>

                <TransitionGroup :name="direction" tag="div" mode="out-in">
                    <div :key="windowStart" class="bracket-viewport">
                        <div v-for="stage in visibleStages" :key="stage"
                            :class="['bracket-column', stage.toLowerCase()]">
                            <div class="stage-label">{{ stageText(stage) }}</div>

                            <div class="column-matches">
                                <div v-for="i in Math.ceil(matchesByStage[stage].length / 2)" :key="i"
                                    class="match-pair">
                                    <div v-if="matchesByStage[stage][(i - 1) * 2]" class="match-node">
                                        <MatchCard :match="formatMatchForCard(matchesByStage[stage][(i - 1) * 2])" />
                                    </div>

                                    <div v-if="matchesByStage[stage][(i - 1) * 2 + 1]" class="match-node">
                                        <MatchCard
                                            :match="formatMatchForCard(matchesByStage[stage][(i - 1) * 2 + 1])" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TransitionGroup>

                <button class="bracket-nav next" :disabled="!canNext" @click="nextStages">
                    ›
                </button>
            </div>

            <div class="worldcup">
                <img src="/public/img/FIFA_World_Cup_emblem.png" alt="World Cup" class="worldcup-image">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from "pinia";
import { useknockoutStore } from "~/store/knockoutStore";

const knockoutStore = useknockoutStore();
const { matchesByStage } = storeToRefs(knockoutStore);
const stageText = (stage: string) => {
    if (stage === 'R32') {
        return '32強賽'
    } else if (stage === 'R16') {
        return '16強賽'
    } else if (stage === 'QF') {
        return '8強賽'
    } else if (stage === 'SF') {
        return '4強賽'
    } else if (stage === 'Final') {
        return '總決賽'
    }
}

const stages = ['R32', 'R16', 'QF', 'SF', 'Final']
const windowStart = ref(0) // 目前可見的階段起始索引
const visibleCount = ref(3) // 目前可見的階段數量
if (import.meta.client) { // 確保在 Nuxt 客戶端環境下執行
    const updateVisibleCount = () => {
        if (window.innerWidth <= 480) {
            visibleCount.value = 2 // 超小螢幕一次看 1 欄
        } else if (window.innerWidth <= 768) {
            visibleCount.value = 2 // 手機/平板一次看 2 欄
        } else {
            visibleCount.value = 3 // 桌機一次看 3 欄
        }
    }

    // 初始化與監聽視窗改變
    onMounted(() => {
        updateVisibleCount()
        window.addEventListener('resize', updateVisibleCount)
    })
    onUnmounted(() => {
        window.removeEventListener('resize', updateVisibleCount)
    })
}

const visibleStages = computed(() =>
    stages.slice(windowStart.value, windowStart.value + visibleCount.value)
)

const canPrev = computed(() => windowStart.value > 0)
const canNext = computed(() => windowStart.value + visibleCount.value < stages.length)
const direction = ref('next') // 用於動畫方向判斷
const prevStages = () => {
    direction.value = 'prev'
    windowStart.value--
}

const nextStages = () => {
    direction.value = 'next'
    windowStart.value++
}

// 格式化資料，以便傳入 MatchCard 元件
const formatMatchForCard = (match) => {
    if (!match) return {
        homeTeam: '待定',
        awayTeam: '待定',
        homeFlag: '',
        awayFlag: '',
        homeScore: null,
        awayScore: null,
        homePenaltyScore: null,
        awayPenaltyScore: null,
    }; // 處理空資料
    return {
        matchTime: match.time,
        matchDate: match.date,
        homeTeam: match.homeTeam?.teamCode ? match.homeTeam?.teamName : '待定',
        homeCode: match.homeTeam?.teamCode || '',
        homeFlag: match.homeTeam?.teamFlag || '',
        homeScore: match.homeScore,
        homePenaltyScore: match.homePenaltyScore,
        awayTeam: match.awayTeam?.teamCode ? match.awayTeam?.teamName : '待定',
        awayCode: match.awayTeam?.teamCode || '',
        awayFlag: match.awayTeam?.teamFlag || '',
        awayScore: match.awayScore,
        awayPenaltyScore: match.awayPenaltyScore
    };
}
// 開發用：監控數據變化
watchEffect(() => {
    console.log("淘汰賽數據已更新");
});
</script>

<style scoped lang="scss">
/* CSS 變數定義 */
:root {
    --primary-color: #4a1883;
    --accent-color: #3d9700;
    --bg-light: rgba(255, 255, 255, 0.95);
    --bg-dark: rgba(30, 30, 30, 0.05);
    --text-primary: #1e293b;
    --text-secondary: #64748b;
    --border-color: #e2e8f0;
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 12px rgba(74, 24, 131, 0.15);
    --shadow-lg: 0 12px 24px rgba(74, 24, 131, 0.1);
    --shadow-hover: 0 16px 32px rgba(74, 24, 131, 0.2);
    --connector-color: #94a3b8;
}

.knockout-container {
    max-width: 100vw;
    min-height: 100vh;
    margin: 0 auto;
    padding: 2rem 1rem;
    overflow-x: hidden;

    @media (max-width: 768px) {
        min-height: auto;
        padding: 1rem 0.5rem 0.5rem;
    }
}

.knockout-header {
    max-width: 1400px;
    margin: 0 auto 2rem;
    text-align: center;

    h1 {
        font-size: 2.5rem;
        font-weight: 700;
        color: #fff;
        margin: 0 0 0.5rem;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.05);

        @media (max-width: 768px) {
            font-size: 1.8rem;
        }
    }
}

.knockout-content {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    max-width: 1400px;
    margin: 0 auto;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        padding-bottom: 2rem;
    }
}

.bracket-wrapper {
    background: rgba(0, 0, 0, 0.45);
    display: flex;
    align-items: stretch;
    gap: 3rem;
    /* 欄位間距 */
    overflow-x: auto;
    overflow-y: hidden;
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
    scroll-behavior: smooth;
    cursor: grab;
    border-radius: 14px;

    &::-webkit-scrollbar {
        height: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background: var(--accent-color);
        border-radius: 5px;
    }

    &.is-dragging {
        cursor: grabbing;
        user-select: none;
    }
}

.bracket-wrapper.is-hovering .team-row:not(.is-highlighted) {
    opacity: 0.3;
    filter: grayscale(100%);
}

/* 各階段賽程區塊 */
.bracket-column {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-shrink: 0;
    width: 270px;
    position: relative;
    padding-top: 3rem;
    /* 留給 stage-label 空間 */
}

.stage-label {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    font-size: 0.95rem;
    font-weight: 700;
    color: white;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 0.6rem;
    background: var(--primary-color);
    border-radius: 6px;
    box-shadow: var(--shadow-sm);
    z-index: 10;
}

.stage-label.final-label {
    background: linear-gradient(135deg, #d4af37, #b8860b);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    letter-spacing: 2px;
}

/* 2. 負責樹狀對齊的魔法容器 */
.column-matches {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    /* 固定最小高度，確保不會被擠壓導致重疊 */
    position: relative;
}

.match-pair {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 1;
    /* 平分垂直空間 */

    /* 垂直連接線 */
    &::before {
        content: '';
        position: absolute;
        top: 25%;
        bottom: 25%;
        right: -2.3rem;
        /* 連接線畫在與下一列的中間 */
        width: 2px;
        background: #94a3b8;
        z-index: 0;
    }

    /* 從垂直線中央連向下一階段的水平線 */
    &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: -4.7rem;
        width: 2.5rem;
        height: 2px;
        background: #94a3b8;
        z-index: 0;
    }
}

/* 針對最後一階 (決賽)，隱藏所有向右的連接線 */
.bracket-column.final .match-pair::before,
.bracket-column.final .match-pair::after,
.bracket-column.final .match-node::after {
    display: none !important;
}

/* 當 match-pair 只有一個節點時 (如決賽)，調整連接線位置或隱藏 */
.bracket-column.final .match-pair {
    justify-content: center;
}

.match-node {
    margin: 5px 0;
    position: relative;
    width: 100%;
    z-index: 1;

    /* 單一比賽節點的水平短連線，連接到垂直線 */
    &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: -2.2rem;
        width: 2.2rem;
        height: 2px;
        background: #94a3b8;
        z-index: 0;
    }

    /* 確保組件有背景並蓋住後面的線 */
    background: var(--bg-light);
    border-radius: 8px;
    box-shadow: var(--shadow-sm);
}

.match-node .match-item {
    /* width: 100% !important; */
    display: flex;
    flex-direction: column;
    padding: 10px 0;
}

.bracket-shell {
    flex: 1;
    position: relative;
    width: 70%;
    overflow: hidden;
}

.worldcup {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: 25%;
    height: 100%;

    .worldcup-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }
}

.bracket-viewport {
    background: rgba(0, 0, 0, 0.5);
    display: grid;
    grid-template-columns: repeat(3, minmax(220px, 1fr));
    column-gap: 24px;
    align-items: stretch;
    padding: 12px 20px 24px;
}

.bracket-column {
    position: relative;
    min-width: 0;
    padding-top: 44px;
}

.match-node {
    width: 100%;
    background: #f1f3f5;
    border: 1px solid #d6d9de;
    border-radius: 14px;
    box-shadow: none;
}

.match-pair {
    min-height: 180px;
}

.bracket-nav {
    position: relative;
    /* top: 12px; */
    z-index: 20;
    width: 38px;
    height: 38px;
    border-radius: 999px;
    border: 1px solid #d1d5db;
    background: #fff;
    font-size: 24px;
    cursor: pointer;
}

.bracket-nav.prev {
    position: fixed;
    top: 60%;
    transform: translateY(-50%);
    left: 4px;
}

.bracket-nav.next {
    position: fixed;
    top: 60%;
    transform: translateY(-50%);
    right: 4px;
}

.bracket-nav:disabled {
    opacity: 0.35;
    cursor: default;
}

@media (max-width: 768px) {
    .bracket-viewport {
        grid-template-columns: repeat(2, 1fr);
        column-gap: 18px;
        padding-inline: 14px;
    }
}

@media (max-width: 520px) {
    /* .bracket-viewport {
        grid-template-columns: minmax(220px, 1fr);
    } */
}

@media (max-width:1366px) {
    .bracket-wrapper {
        gap: 2rem;
    }

    .bracket-column {
        width: 240px;
    }

    .match-pair::before {
        right: -2.1rem;
    }

    .match-pair::after {
        right: -4.8rem;
        width: 2.8rem;
    }

    .match-node::after {
        right: -2rem;
        width: 2rem;
    }
}

@media (max-width:1280px) {
    .bracket-wrapper {
        gap: 2rem;
    }

    .match-pair::before {
        right: -1.8rem;
    }

    .match-pair::after {
        right: -3.7rem;
        width: 2rem;
    }

    .match-node::after {
        right: -1.6rem;
        width: 1.5rem;
    }
}

@media (max-width: 1024px) {

    .bracket-wrapper {
        gap: 2rem;
    }

    .bracket-column {
        width: 200px;
    }

    .match-pair::before {
        right: -1.8rem;
    }

    .match-pair::after {
        right: -3.7rem;
        width: 2rem;
    }

    .match-node::after {
        right: -1.6rem;
        width: 1.5rem;
    }
}

@media (max-width: 768px) {
    .bracket-wrapper {
        gap: 1.5rem;
        padding: 0.75rem;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scroll-snap-type: x proximity;
    }

    .bracket-viewport {
        display: flex;
        /*gap: 1rem;
        display: grid;
        grid-template-columns: repeat(3, 1fr); */
    }

    .bracket-column {
        width: 172px;
        scroll-snap-align: start;
        flex-shrink: 0;
    }

    .stage-label {
        font-size: 0.82rem;
        padding: 0.45rem;
    }

    .match-pair::before {
        right: -0.75rem;
    }

    .match-pair::after {
        right: -1.5rem;
        width: 0.75rem;
    }

    .match-node::after {
        right: -0.75rem;
        width: 0.75rem;
    }

    .column-matches {
        min-height: 980px;
    }

    .bracket-shell {
        width: 100%;
        overflow: hidden;
    }

    .bracket-nav.prev {
        top: 40%;
    }

    .bracket-nav.next {
        top: 40%;
    }

    .worldcup {
        display: none;
    }
}

@media (max-width: 480px) {
    .bracket-wrapper {
        gap: 0.75rem;
        padding: 0.6rem;
    }

    .bracket-column {
        width: 180px;
        padding-top: 2.5rem;
    }

    .stage-label {
        font-size: 0.76rem;
        letter-spacing: 0.5px;
    }

    .match-pair::before {
        right: -0.8rem;
    }

    .match-pair::after {
        right: -1.7rem;
        width: 1rem;
    }

    .match-node::after {
        right: -0.7rem;
        width: 0.6rem;
    }

    .column-matches {
        min-height: 450px;
    }
}

.match-date,
.match-time {
    background: rgba(0, 0, 0, 0.4) !important;
}

/* 行動裝置切換賽階動態 */
.stage-slide-enter-active,
.stage-slide-leave-active {
    transition: all .35s ease;
}

.stage-slide-enter-from {
    opacity: 0;
    transform: translateX(60px);
}

.stage-slide-leave-to {
    opacity: 0;
    transform: translateX(-60px);
}

.stage-slide-move {
    transition: transform .35s ease;
}

.next-enter-active,
.next-leave-active,
.prev-enter-active,
.prev-leave-active {
    transition: all .35s ease;
}

.next-enter-from {
    opacity: 0;
    transform: translateX(60px);
}

.next-leave-to {
    opacity: 0;
    transform: translateX(-60px);
}

.prev-enter-from {
    opacity: 0;
    transform: translateX(-60px);
}

.prev-leave-to {
    opacity: 0;
    transform: translateX(60px);
}
</style>
