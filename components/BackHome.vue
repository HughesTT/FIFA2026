<template>
  <div class="backhome" @click="$router.push('/')">回首頁</div>
</template>

<script setup></script>

<style lang="scss" scoped>
.backhome {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #5d0bf5 0%, #301fc9 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
  z-index: 15;
}
</style>