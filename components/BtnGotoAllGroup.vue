<template>
    <div>
        <button class="gotoKO" @click="goToAllGroup">小組賽</button>
    </div>
</template>

<script setup>
const router = useRouter();
const goToAllGroup = () => {
    router.push('/allgrouppage');
}
</script>

<style scoped lang="scss">
.gotoKO {
    position: fixed;
    top: 80px;
    right: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: linear-gradient(135deg, #e31d1a 0%, #eb5957 100%);
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
@media (max-width: 768px) {
    .gotoKO {
        top: 55px;
        right: 8px;
        padding: 6px 10px;
        font-size: 14px;
        border-radius: 6px;
    }
}
</style>