<template>
    <div class="knockout-container">
        <h1>KnockoutMatches</h1>
        <div class="bracket-wrapper">
            <!-- 32強 -->
            <div class="bracket-column">
                <div v-for="match in matchesByStage.R32" :key="match.matchId" class="match-node">
                    <div class="match-content">
                        <div class="team-row">
                            <img v-if="match.homeTeam?.teamFlag" :src="match.homeTeam.teamFlag" class="flag-icon">
                            <div v-else class="flag-placeholder"></div>
                            <span class="team-code">{{ match.homeTeam?.teamName || '待定' }}</span>
                        </div>
                        <div class="team-row">
                            <img v-if="match.awayTeam?.teamFlag" :src="match.awayTeam.teamFlag" class="flag-icon">
                            <div v-else class="flag-placeholder"></div>
                            <span class="team-code">{{ match.awayTeam?.teamName || '待定' }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 16強 -->
            <div class="bracket-column">
                <div v-for="match in matchesByStage.R16" :key="match.matchId" class="match-node">
                    <div class="match-content">
                        <div class="team-row">
                            <img v-if="match.homeTeam?.teamFlag" 
                                :src="match.homeTeam.teamFlag" 
                                class="flag-icon" 
                                style="width: 30px; margin-right: 8px;">
                            <span class="team-code">{{ match.homeTeam?.teamName || '待定' }}</span>
                        </div>
                        
                        <div class="team-row">
                            <img v-if="match.awayTeam?.teamFlag" 
                                :src="match.awayTeam.teamFlag" 
                                class="flag-icon" 
                                style="width: 30px; margin-right: 8px;">
                            <span class="team-code">{{ match.awayTeam?.teamName || '待定' }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 8強 -->
            <div class="bracket-column">
                <div v-for="match in matchesByStage.QF" :key="match.matchId" class="match-node">
                    <div class="match-content">
                        <div class="team-row">
                            <img v-if="match.homeTeam?.teamFlag" 
                                :src="match.homeTeam.teamFlag" 
                                class="flag-icon" 
                                style="width: 30px; margin-right: 8px;">
                            <span class="team-code">{{ match.homeTeam?.teamName || '待定' }}</span>
                        </div>
                        
                        <div class="team-row">
                            <img v-if="match.awayTeam?.teamFlag" 
                                :src="match.awayTeam.teamFlag" 
                                class="flag-icon" 
                                style="width: 30px; margin-right: 8px;">
                            <span class="team-code">{{ match.awayTeam?.teamName || '待定' }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 4強 -->
            <div class="bracket-column">
                <div v-for="match in matchesByStage.SF" :key="match.matchId" class="match-node">
                    <div class="match-content">
                        <div class="team-row">
                            <img v-if="match.homeTeam?.teamFlag" 
                                :src="match.homeTeam.teamFlag" 
                                class="flag-icon" 
                                style="width: 30px; margin-right: 8px;">
                            <span class="team-code">{{ match.homeTeam?.teamName || '待定' }}</span>
                        </div>
                        
                        <div class="team-row">
                            <img v-if="match.awayTeam?.teamFlag" 
                                :src="match.awayTeam.teamFlag" 
                                class="flag-icon" 
                                style="width: 30px; margin-right: 8px;">
                            <span class="team-code">{{ match.awayTeam?.teamName || '待定' }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 決賽 -->
            <div class="bracket-column">
                <div v-for="match in matchesByStage.Final" :key="match.matchId" class="match-node">
                    <div class="match-content">
                        <div class="team-row">
                            <img v-if="match.homeTeam?.teamFlag" 
                                :src="match.homeTeam.teamFlag" 
                                class="flag-icon" 
                                style="width: 30px; margin-right: 8px;">
                            <span class="team-code">{{ match.homeTeam?.teamName || '待定' }}</span>
                        </div>
                        
                        <div class="team-row">
                            <img v-if="match.awayTeam?.teamFlag" 
                                :src="match.awayTeam.teamFlag" 
                                class="flag-icon" 
                                style="width: 30px; margin-right: 8px;">
                            <span class="team-code">{{ match.awayTeam?.teamName || '待定' }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useknockoutStore } from '~/store/knockoutStore'

const knockoutStore = useknockoutStore()
const { matchesByStage } = storeToRefs(knockoutStore)
watchEffect(() => {
    console.log("目前對戰資訊：", matchesByStage.value)
})
</script>

<style scoped lang="scss">
.knockout-container {
    margin: 20px;
    padding: 20px;
    background: rgba(255,255,255,0.3);
    border-radius: 5px;
}

.bracket-wrapper {
    display: flex;
    gap: 30px; // 欄位間距
    overflow-x: auto;
    padding: 20px;
}

.bracket-column {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 20px;
}

.match-node {
    background: white;
    border-radius: 8px;
    padding: 12px;
    width: 125px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    border-left: 4px solid #3b82f6;
    
    .team-row {
        display: flex;
        align-items: center;
        padding: 6px 0;
        
        &:first-child { border-bottom: 1px solid #eee; }

        .flag-icon {
            width: 32px;
            height: 22px;
            object-fit: cover;
            border-radius: 2px;
            margin-right: 10px;
            box-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }

        .team-code {
            font-size: 14px;
            font-weight: 600;
            color: #334155;
        }
    }
}
</style>