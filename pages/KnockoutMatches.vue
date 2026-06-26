<template>
    <div class="knockout-container">
        <BackHome />
        <div class="knockout-header">
            <h1>淘汰賽</h1>
        </div>

        <div ref="bracketRef" class="bracket-wrapper" :class="{ 'is-hovering': hoveredTeamId !== null }"
            @mousedown="startDrag" @mouseleave="stopDrag" @mouseup="stopDrag" @mousemove="doDrag">
            <!-- 使用動態陣列，減少重複程式碼 -->
            <div v-for="stage in ['R32', 'R16', 'QF', 'SF', 'Final']" :key="stage"
                :class="['bracket-column', stage.toLowerCase()]">
                <div class="stage-label" :class="{ 'final-label': stage === 'Final' }">{{ stageText(stage) }}</div>
                <div class="column-matches">
                    <div v-for="i in Math.ceil(matchesByStage[stage].length / 2)" :key="i" class="match-pair">
                        <div v-if="matchesByStage[stage][(i - 1) * 2]" class="match-node">
                            <MatchCard :match="formatMatchForCard(matchesByStage[stage][(i - 1) * 2])" />
                        </div>
                        <div v-if="matchesByStage[stage][(i - 1) * 2 + 1]" class="match-node">
                            <MatchCard :match="formatMatchForCard(matchesByStage[stage][(i - 1) * 2 + 1])" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
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
const hoveredTeamId = ref<string | null>(null);
const bracketRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)
const startDrag = (e: MouseEvent) => {
    if (!bracketRef.value) return
    isDragging.value = true
    startX.value = e.pageX - bracketRef.value.offsetLeft
    scrollLeft.value = bracketRef.value.scrollLeft
}
const stopDrag = () => {
    isDragging.value = false
}
const doDrag = (e: MouseEvent) => {
    if (!isDragging.value || !bracketRef.value) return
    e.preventDefault() // 防止選取文字
    const x = e.pageX - bracketRef.value.offsetLeft
    const walk = (x - startX.value) * 1.5 // 1.5 是捲動速度倍率
    bracketRef.value.scrollLeft = scrollLeft.value - walk
}

// 格式化資料，以便傳入 MatchCard 元件
const formatMatchForCard = (match) => {
    if (!match) return {
        homeTeam: '待定',
        awayTeam: '待定',
        homeFlag: '',
        awayFlag: '',
    }; // 處理空資料
    return {
        matchTime: match.time,
        matchDate: match.date,
        homeTeam: match.homeTeam?.teamCode ? match.homeTeam?.teamName : '待定',
        homeCode: match.homeTeam?.teamCode || '',
        homeFlag: match.homeTeam?.teamFlag || '',
        awayTeam: match.awayTeam?.teamCode ? match.awayTeam?.teamName : '待定',
        awayCode: match.awayTeam?.teamCode || '',
        awayFlag: match.awayTeam?.teamFlag || ''
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

.bracket-column {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-shrink: 0;
    width: 220px;
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
        right: -2.2rem;
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
        right: -3.6rem;
        /* 終點，剛好碰到下一列 */
        width: 1.5rem;
        /* 起點在 -1.5rem 處 */
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
    padding: 10px;
}

@media (max-width: 1024px) {

    .bracket-wrapper {
        gap: 2rem;
    }

    .bracket-column {
        width: 180px;
    }

    .match-pair::before {
        right: -1rem;
    }

    .match-pair::after {
        right: -2rem;
        width: 1rem;
    }

    .match-node::after {
        right: -1rem;
        width: 1rem;
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

    .bracket-column {
        width: 172px;
        scroll-snap-align: start;
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
}

@media (max-width: 480px) {
    .bracket-wrapper {
        gap: 0.75rem;
        padding: 0.6rem;
    }

    .bracket-column {
        width: 190px;
        padding-top: 2.5rem;
    }

    .stage-label {
        font-size: 0.76rem;
        letter-spacing: 0.5px;
    }

    .match-pair::before {
        right: -0.5rem;
    }

    .match-pair::after {
        right: -1rem;
        width: 0.5rem;
    }

    .match-node::after {
        right: -0.5rem;
        width: 0.5rem;
    }

    .column-matches {
        min-height: 860px;
    }
}

.match-date,
.match-time {
    background: rgba(0, 0, 0, 0.4) !important;
}
</style>
