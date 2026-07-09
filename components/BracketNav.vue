<template>
  <button :class="['bracket-nav', direction]" :disabled="disabled" @click="$emit('click')">
    {{ direction === 'prev' ? '‹' : '›' }}
  </button>
</template>

<script setup lang="ts">
defineProps({
  direction: { type: String as () => 'prev' | 'next', required: true },
  disabled: { type: Boolean, default: false }
})

defineEmits<{ click: [] }>()
</script>

<style scoped lang="scss">
.bracket-nav {
  position: relative;
  z-index: 20;
  width: 38px;
  height: 38px;
  border-radius: 999px;
  border: 1px solid #d1d5db;
  background: #fff;
  font-size: 24px;
  cursor: pointer;

  &.prev {
    position: fixed;
    top: 60%;
    transform: translateY(-50%);
    left: 4px;
  }

  &.next {
    position: fixed;
    top: 60%;
    transform: translateY(-50%);
    right: 4px;
  }

  &:disabled {
    opacity: 0.35;
    cursor: default;
  }
}

@media (max-width: 768px) {
  .bracket-nav.prev {
    top: 40%;
  }
  .bracket-nav.next {
    top: 40%;
  }
}
</style>
