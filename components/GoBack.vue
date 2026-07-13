<template>
  <button class="back-home-btn" @click="goback">
    <span class="arrow">←</span>
    <span> 回上頁</span>
  </button>
</template>

<script setup>
const goback = () => {
  history.back()
}
</script>
<style lang="scss">
.back-home-btn {
  position: absolute;
  z-index: 10;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 10px;
  background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
  z-index: 10;

  .arrow {
    font-size: 20px;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.5);

    .arrow {
      transform: translateX(-4px);
    }
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    top: 15px;
    right: 15px;
    padding: 8px 16px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 13px;
    gap: 6px;

    .arrow {
      font-size: 16px;
    }

    span:last-child {
      display: none;
    }
  }
}
</style>