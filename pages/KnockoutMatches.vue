<template>
    <div class="knockout-container">
        <BackHome />
        <div class="knockout-header">
            <h1>淘汰賽</h1>
        </div>

        <div class="bracket-wrapper" ref="bracketRef" @mousedown="startDrag" @mouseleave="stopDrag" @mouseup="stopDrag"
            @mousemove="doDrag" :class="{ 'is-hovering': hoveredTeamId !== null }">
            <!-- 32強 -->
            <div class="bracket-column">
                <div class="stage-label">32 強賽</div>
                <div class="column-matches">
                    <div v-for="match in matchesByStage.R32" :key="match.matchId" class="match-node">
                        <div class="match-content">
                            <div class="match-time">
                                {{ formatDate(match.date) }} {{ match.time }}
                            </div>
                            <div class="team-row" @mouseenter="setHoverTeam(match.homeTeam?.teamCode)"
                                @mouseleave="clearHoverTeam"
                                :class="{ 'is-highlighted': hoveredTeamId === match.homeTeam?.teamCode && match.homeTeam?.teamCode }">
                                <img v-if="match.homeTeam?.teamFlag" :src="match.homeTeam.teamFlag"
                                    :alt="match.homeTeam.teamName" class="flag-icon" />
                                <div v-else class="flag-placeholder" />
                                <div class="team-code">
                                    <span v-if="!match.homeTeam">待定</span>
                                    <span v-else>{{ match.homeTeam.teamName }}</span>
                                </div>
                            </div>
                            <div class="vs-badge">VS</div>
                            <div class="team-row" @mouseenter="setHoverTeam(match.awayTeam?.teamCode)"
                                @mouseleave="clearHoverTeam"
                                :class="{ 'is-highlighted': hoveredTeamId === match.awayTeam?.teamCode && match.awayTeam?.teamCode }">
                                <img v-if="match.awayTeam?.teamFlag" :src="match.awayTeam.teamFlag"
                                    :alt="match.awayTeam.teamName" class="flag-icon" />
                                <div v-else class="flag-placeholder" />
                                <div class="team-code">
                                    <span v-if="!match.awayTeam">待定</span>
                                    <span v-else>{{ match.awayTeam.teamName }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 16強 -->
            <div class="bracket-column">
                <div class="stage-label">16 強賽</div>
                <div class="column-matches">
                    <div v-for="match in matchesByStage.R16" :key="match.matchId" class="match-node">
                        <div class="match-content">
                            <div class="match-time">{{ formatDate(match.date) }} {{ match.time }}</div>
                            <div class="team-row" @mouseenter="setHoverTeam(match.homeTeam?.teamCode)"
                                @mouseleave="clearHoverTeam"
                                :class="{ 'is-highlighted': hoveredTeamId === match.homeTeam?.teamCode && match.homeTeam?.teamCode }">
                                <img v-if="match.homeTeam?.teamFlag" :src="match.homeTeam.teamFlag"
                                    :alt="match.homeTeam.teamName" class="flag-icon" />
                                <div v-else class="flag-placeholder" />
                                <div class="team-code">
                                    <span v-if="!match.homeTeam">待定</span>
                                    <span v-else>{{ match.homeTeam.teamName }}</span>
                                </div>
                            </div>
                            <div class="vs-badge">VS</div>
                            <div class="team-row" @mouseenter="setHoverTeam(match.awayTeam?.teamCode)"
                                @mouseleave="clearHoverTeam"
                                :class="{ 'is-highlighted': hoveredTeamId === match.awayTeam?.teamCode && match.awayTeam?.teamCode }">
                                <img v-if="match.awayTeam?.teamFlag" :src="match.awayTeam.teamFlag"
                                    :alt="match.awayTeam.teamName" class="flag-icon" />
                                <div v-else class="flag-placeholder" />
                                <div class="team-code">
                                    <span v-if="!match.awayTeam">待定</span>
                                    <span v-else>{{ match.awayTeam.teamName }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 8強 -->
            <div class="bracket-column">
                <div class="stage-label">8 強賽</div>
                <div class="column-matches">
                    <div v-for="match in matchesByStage.QF" :key="match.matchId" class="match-node">
                        <div class="match-content">
                            <div class="match-time">{{ formatDate(match.date) }} {{ match.time }}</div>
                            <div class="team-row" @mouseenter="setHoverTeam(match.homeTeam?.teamCode)"
                                @mouseleave="clearHoverTeam"
                                :class="{ 'is-highlighted': hoveredTeamId === match.homeTeam?.teamCode && match.homeTeam?.teamCode }">
                                <img v-if="match.homeTeam?.teamFlag" :src="match.homeTeam.teamFlag"
                                    :alt="match.homeTeam.teamName" class="flag-icon" />
                                <div v-else class="flag-placeholder" />
                                <div class="team-code">
                                    <span v-if="!match.homeTeam">待定</span>
                                    <span v-else>{{ match.homeTeam.teamName }}</span>
                                </div>
                            </div>
                            <div class="vs-badge">VS</div>
                            <div class="team-row" @mouseenter="setHoverTeam(match.awayTeam?.teamCode)"
                                @mouseleave="clearHoverTeam"
                                :class="{ 'is-highlighted': hoveredTeamId === match.awayTeam?.teamCode && match.awayTeam?.teamCode }">
                                <img v-if="match.awayTeam?.teamFlag" :src="match.awayTeam.teamFlag"
                                    :alt="match.awayTeam.teamName" class="flag-icon" />
                                <div v-else class="flag-placeholder" />
                                <div class="team-code">
                                    <span v-if="!match.awayTeam">待定</span>
                                    <span v-else>{{ match.awayTeam.teamName }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 4強 -->
            <div class="bracket-column">
                <div class="stage-label">4 強賽</div>
                <div class="column-matches">
                    <div v-for="match in matchesByStage.SF" :key="match.matchId" class="match-node">
                        <div class="match-content">
                            <div class="match-time">{{ formatDate(match.date) }} {{ match.time }}</div>
                            <div class="team-row" @mouseenter="setHoverTeam(match.homeTeam?.teamCode)"
                                @mouseleave="clearHoverTeam"
                                :class="{ 'is-highlighted': hoveredTeamId === match.homeTeam?.teamCode && match.homeTeam?.teamCode }">
                                <img v-if="match.homeTeam?.teamFlag" :src="match.homeTeam.teamFlag"
                                    :alt="match.homeTeam.teamName" class="flag-icon" />
                                <div v-else class="flag-placeholder" />
                                <div class="team-code">
                                    <span v-if="!match.homeTeam">待定</span>
                                    <span v-else>{{ match.homeTeam.teamName }}</span>
                                </div>
                            </div>
                            <div class="vs-badge">VS</div>
                            <div class="team-row" @mouseenter="setHoverTeam(match.awayTeam?.teamCode)"
                                @mouseleave="clearHoverTeam"
                                :class="{ 'is-highlighted': hoveredTeamId === match.awayTeam?.teamCode && match.awayTeam?.teamCode }">
                                <img v-if="match.awayTeam?.teamFlag" :src="match.awayTeam.teamFlag"
                                    :alt="match.awayTeam.teamName" class="flag-icon" />
                                <div v-else class="flag-placeholder" />
                                <div class="team-code">
                                    <span v-if="!match.awayTeam">待定</span>
                                    <span v-else>{{ match.awayTeam.teamName }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 季軍戰 -->
            <div class="bracket-column">
                <div class="stage-label">季軍戰</div>
                <div class="column-matches">
                    <div v-for="match in matchesByStage.ThirdPlace" :key="match.matchId" class="match-node">
                        <div class="match-content">
                            <div class="match-time">{{ formatDate(match.date) }} {{ match.time }}</div>
                            <div class="team-row" @mouseenter="setHoverTeam(match.homeTeam?.teamCode)"
                                @mouseleave="clearHoverTeam"
                                :class="{ 'is-highlighted': hoveredTeamId === match.homeTeam?.teamCode && match.homeTeam?.teamCode }">
                                <img v-if="match.homeTeam?.teamFlag" :src="match.homeTeam.teamFlag"
                                    :alt="match.homeTeam.teamName" class="flag-icon" />
                                <div v-else class="flag-placeholder" />
                                <div class="team-code">
                                    <span v-if="!match.homeTeam">待定</span>
                                    <span v-else>{{ match.homeTeam.teamName }}</span>
                                </div>
                            </div>
                            <div class="vs-badge">VS</div>
                            <div class="team-row" @mouseenter="setHoverTeam(match.awayTeam?.teamCode)"
                                @mouseleave="clearHoverTeam"
                                :class="{ 'is-highlighted': hoveredTeamId === match.awayTeam?.teamCode && match.awayTeam?.teamCode }">
                                <img v-if="match.awayTeam?.teamFlag" :src="match.awayTeam.teamFlag"
                                    :alt="match.awayTeam.teamName" class="flag-icon" />
                                <div v-else class="flag-placeholder" />
                                <div class="team-code">
                                    <span v-if="!match.awayTeam">待定</span>
                                    <span v-else>{{ match.awayTeam.teamName }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 決賽 -->
            <div class="bracket-column">
                <div class="stage-label final-label">決 賽</div>
                <div class="column-matches">
                    <div v-for="match in matchesByStage.Final" :key="match.matchId" class="match-node final-match">
                        <div class="match-content">
                            <div class="match-time">{{ formatDate(match.date) }} {{ match.time }}</div>
                            <div class="team-row" @mouseenter="setHoverTeam(match.homeTeam?.teamId)"
                                @mouseleave="clearHoverTeam"
                                :class="{ 'is-highlighted': hoveredTeamId === match.homeTeam?.teamId && match.homeTeam?.teamId }">
                                <img v-if="match.homeTeam?.teamFlag" :src="match.homeTeam.teamFlag"
                                    :alt="match.homeTeam.teamName" class="flag-icon" />
                                <div v-else class="flag-placeholder" />
                                <div class="team-code">
                                    <span v-if="!match.homeTeam">待定</span>
                                    <span v-else>{{ match.homeTeam.teamName }}</span>
                                </div>
                            </div>
                            <div class="vs-badge crown">👑</div>
                            <div class="team-row" @mouseenter="setHoverTeam(match.awayTeam?.teamId)"
                                @mouseleave="clearHoverTeam"
                                :class="{ 'is-highlighted': hoveredTeamId === match.awayTeam?.teamId && match.awayTeam?.teamId }">
                                <img v-if="match.awayTeam?.teamFlag" :src="match.awayTeam.teamFlag"
                                    :alt="match.awayTeam.teamName" class="flag-icon" />
                                <div v-else class="flag-placeholder" />
                                <div class="team-code">
                                    <span v-if="!match.awayTeam">待定</span>
                                    <span v-else>{{ match.awayTeam.teamName }}</span>
                                </div>
                            </div>
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
const { formatDate } = knockoutStore;
const hoveredTeamId = ref<string | null>(null);

const setHoverTeam = (teamId?: string) => {
    if (teamId) hoveredTeamId.value = teamId
}
const clearHoverTeam = () => {
    hoveredTeamId.value = null
}
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

// 開發用：監控數據變化
watchEffect(() => {
    console.log("淘汰賽數據已更新");
    console.log("R32 階段的比賽：", matchesByStage.value.R32?.length || 0);
    console.log("R16 階段的比賽：", matchesByStage.value.R16?.length || 0);
    console.log("QF 階段的比賽：", matchesByStage.value.QF?.length || 0);
    console.log("SF 階段的比賽：", matchesByStage.value.SF?.length || 0);
    console.log(
        "ThirdPlace 階段的比賽：",
        matchesByStage.value.ThirdPlace?.length || 0,
    );
    console.log("Final 階段的比賽：", matchesByStage.value.Final?.length || 0);
});
</script>

<style scoped lang="scss">
// CSS 變數定義
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
}

.knockout-container {
    max-width: 1400px;
    min-height: 100vh;
    margin: 0 auto;
    /* background: linear-gradient(135deg, #f5f7fa 0%, #e8f1f5 100%); 
    background: rgba(255, 255, 255, 0.4);*/
    padding: 2rem 1rem;

    @media (max-width: 768px) {
        padding: 1rem 0.5rem;
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

    .subtitle {
        font-size: 1rem;
        color: #fff;
        margin: 0;
        font-weight: 500;
        letter-spacing: 0.5px;

        @media (max-width: 768px) {
            font-size: 0.9rem;
        }
    }
}

.bracket-wrapper {
    display: flex;
    align-items: stretch;
    /* 讓所有直行(Column)都與最高的那行（32強）等高 */
    gap: 2.5rem;
    /* 增加行間距，容納樹狀圖的連接線 */
    overflow-x: auto;
    overflow-y: hidden;
    padding: 2rem 1rem;
    max-width: 1400px;
    margin: 0 auto;
    scroll-behavior: smooth;
    cursor: grab;

    &::-webkit-scrollbar {
        height: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background: var(--accent-color);
        border-radius: 4px;
    }

    &.is-dragging {
        cursor: grabbing;
        /* 拖曳時改變游標 */
        user-select: none;
        /* 防止拖曳時反白到文字 */
    }
}

.bracket-wrapper.is-hovering .team-row:not(.is-highlighted) {
    opacity: 0.3;
    filter: grayscale(100%);
}

/* 2. 負責樹狀對齊的魔法容器 */
.column-matches {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    /* 讓賽事在垂直方向均勻分佈，自然形成樹狀對齊 */
    flex: 1;
    /* 填滿 column 的剩餘高度 */
    gap: 1rem;
    margin-top: 1rem;
}

.stage-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: white;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 0.5rem;
    background: rgba(74, 24, 131, 0.9);
    border-radius: 4px;
    margin-bottom: 0.5rem;
    transition: all 0.3s ease;

    @media (max-width: 768px) {
        font-size: 0.75rem;
        padding: 0.4rem;
    }
}

.stage-label.final-label {
    background: rgba(203, 148, 20, 0.9);
    color: #fff;
    font-weight: 700;
    letter-spacing: 2px;
}

/* 3. 調整賽事節點樣式與連接線 */
.match-node {
    background: white;
    border-radius: 12px;
    padding: 1rem;
    box-shadow: var(--shadow-md);
    border-left: 5px solid var(--primary-color);
    position: relative;
    transition: all 0.3s ease;

    /* 樹狀圖的水平連接線 */
    &::after {
        content: "";
        position: absolute;
        top: 50%;
        right: -2.5rem;
        /* 對應 wrapper 的 gap */
        width: 2.5rem;
        height: 2px;
        background: var(--border-color);
        /* 傳統的實線 */
        z-index: 0;
    }

    &:hover {
        box-shadow: var(--shadow-hover);
        transform: translateY(-2px);
    }
}

/* 移除最後一欄（決賽/季軍戰）的右側連接線 */
.bracket-column:last-child .match-node::after,
.bracket-column:nth-last-child(2) .match-node::after {
    display: none;
}

.match-node.final-match {
    border-left-color: var(--accent-color);
    box-shadow: 0 12px 28px rgba(61, 151, 0, 0.2);

    &::after {
        display: none;
    }

    &:hover {
        box-shadow: 0 16px 40px rgba(61, 151, 0, 0.3);
    }
}

// 移除最後一欄的連接線
.bracket-column:last-child .match-node::after {
    display: none;
}

.match-time {
    font-size: 0.75rem;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
    margin-bottom: 0.75rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid var(--border-color);
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .time-icon {
        width: 14px;
        height: 14px;
        color: var(--accent-color);
        flex-shrink: 0;
    }
}

.vs-badge {
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--primary-color);
    text-align: center;
    padding: 0.4rem;
    margin: 0.5rem 0;
    background: rgba(74, 24, 131, 0.1);
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.vs-badge.crown {
    font-size: 1rem;
    background: linear-gradient(135deg,
            rgba(61, 151, 0, 0.15),
            rgba(74, 24, 131, 0.1));
    padding: 0.5rem;
}

.team-row {
    display: flex;
    align-items: center;
    padding: 0.6rem 0;
    gap: 0.75rem;
    transition: all 0.3s ease;
    border-radius: 4px;

    &:first-child:not(:last-child) {
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 0.75rem;
    }

    &:hover {
        background: rgba(61, 151, 0, 0.05);
    }

    .flag-icon {
        width: 32px;
        height: 22px;
        object-fit: cover;
        border-radius: 3px;
        box-shadow: var(--shadow-sm);
        flex-shrink: 0;
        transition: transform 0.2s ease;
        border: 1px solid var(--border-color);

        &:hover {
            transform: scale(1.1);
        }
    }

    .flag-placeholder {
        width: 32px;
        height: 22px;
        background: linear-gradient(135deg, #e0e7ff 0%, #f0e7ff 100%);
        border-radius: 3px;
        border: 2px dashed var(--border-color);
        flex-shrink: 0;
    }

    .team-code {
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--text-primary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1;
        min-width: 0;

        span {
            display: block;
        }
    }
}

.team-row.is-highlighted {
    background: rgba(61, 151, 0, 0.15);
    /* 使用你的主題強調色 */
    transform: scale(1.02);
}

// 響應式設計
@media (max-width: 1024px) {
    .bracket-wrapper {
        gap: 1.5rem;
    }

    .bracket-column {
        min-width: 180px;
    }

    .match-node::after {
        right: -1.5rem;
        width: 1.5rem;
    }

    .team-row {
        .flag-icon {
            width: 28px;
            height: 19px;
        }

        .flag-placeholder {
            width: 28px;
            height: 19px;
        }

        .team-code {
            font-size: 0.8rem;
        }
    }
}

@media (max-width: 768px) {
    .bracket-wrapper {
        gap: 1rem;
        padding: 1rem 0;
    }

    .bracket-column {
        min-width: 150px;
    }

    .match-node {
        padding: 0.75rem;
        border-left-width: 4px;

        &::after {
            width: 1rem;
            right: -1rem;
        }
    }

    .team-row {
        padding: 0.5rem 0;
        gap: 0.5rem;

        .flag-icon {
            width: 26px;
            height: 18px;
        }

        .flag-placeholder {
            width: 26px;
            height: 18px;
        }

        .team-code {
            font-size: 0.75rem;
        }
    }

    .match-time {
        font-size: 0.7rem;
        margin-bottom: 0.5rem;
        padding-bottom: 0.5rem;
    }

    .vs-badge {
        margin: 0.3rem 0;
        padding: 0.3rem;
        font-size: 0.65rem;
    }
}

@media (max-width: 480px) {
    .bracket-column {
        min-width: 120px;
    }

    .match-node {
        padding: 0.65rem;
        border-radius: 8px;
    }

    .team-row {
        gap: 0.4rem;

        .flag-icon,
        .flag-placeholder {
            width: 22px;
            height: 16px;
        }

        .team-code {
            font-size: 0.7rem;
        }
    }
}
</style>
