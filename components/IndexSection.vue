<template>
    <div class="index-container">
        <div class="title-container">
            <h1>{{ titleA }}</h1>
            <h1>{{ titleB }}</h1>
        </div>
        <div class="left-container">
            <div class="knockoutmatches" @click="goToKnockout">淘汰賽</div>
        </div>
        <div class="right-container">
            <div class="allgroup" @click="goToGroup">小組賽</div>
        </div>
    </div>
</template>

<script></script>

<style lang="scss" scoped>
.title-container h1 {
    font-family: 'FIFA2026-NormalBlack', sans-serif;
}

.left-container {
    width: 50%;
    height: 50%;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10%;

    .knockoutmatches {
        font-size: 1.5rem;
        width: 150px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background-color: #4d00a5;
        border: solid #fff 3px;
        color: #fff;
        padding: 5px 0;
        border-radius: 5px;
        cursor: pointer;
        z-index: 100;
        transition: all 0.3s;

        &:hover {
            margin-top: 5px;
        }
    }
}

.right-container {
    width: 50%;
    height: 50%;
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10%;

    .allgroup {
        font-size: 1.5rem;
        width: 150px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background-color: #e31d1a;
        border: solid #fff 3px;
        color: #fff;
        padding: 5px 0;
        border-radius: 5px;
        cursor: pointer;
        z-index: 100;
        transition: all 0.3s;

        &:hover {
            margin-top: 5px;
        }
    }
}

.gotoKO {
    font-size: 1rem;
    position: fixed;
    top: 20px;
    right: 10px;
    width: 130px;
    height: 40px;
    font-family: 'FIFA2026-NormalBold', sans-serif;
    background-color: #e31d1a;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    z-index: 100;
}
</style>