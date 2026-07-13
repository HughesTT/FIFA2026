<template>
  <div v-if="match" class="match-node">
    <MatchCard :match="formatMatchForCard(match)" @team-click="$emit('team-click', $event)" />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import MatchCard from '~/components/MatchCard.vue'
import { formatMatchForCard } from '~/utils/matchFormatter'
import type { knockoutMatch } from '~/types/knockoutResults'

defineProps({
  match: { type: Object as PropType<knockoutMatch | undefined>, default: undefined }
})

defineEmits<{ 'team-click': [teamCode: string] }>()
</script>

<style scoped lang="scss">
.match-node {
  margin: 5px 0;
  position: relative;
  width: 100%;
  z-index: 1;
  background: #f1f3f5;
  border: 1px solid #d6d9de;
  border-radius: 14px;
  box-shadow: none;

  /* 水平短連線，連接到垂直連接線 */
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: -2.2rem;
    width: 2.2rem;
    height: 2px;
    background: #94a3b8;
    z-index: 0;
  }

  .match-item {
    display: flex;
    flex-direction: column;
    padding: 10px 0;
  }
}

.match-date,
.match-time {
  background: rgba(0, 0, 0, 0.4) !important;
}

/* RWD 連接線微調 */
@media (max-width: 1366px) {
  .match-node::after {
    right: -2rem;
    width: 2rem;
  }
}

@media (max-width: 1280px) {
  .match-node::after {
    right: -1.6rem;
    width: 1.5rem;
  }
}

@media (max-width: 1024px) {
  .match-node::after {
    right: -1.6rem;
    width: 1.5rem;
  }
}

@media (max-width: 768px) {
  .match-node::after {
    right: -0.75rem;
    width: 0.75rem;
  }
}

@media (max-width: 480px) {
  .match-node::after {
    right: -0.7rem;
    width: 0.6rem;
  }
}
</style>
