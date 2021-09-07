<template>
    <div class="selectType-foot">
        <div class="sureBtn">
            <slot name="selectSure"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "selectTypeFooter"
};
</script>

<style scoped>
.selectType-foot{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 9;
    overflow: hidden;
}
.selectType-foot .sureBtn{
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    color: #fff;
    background: #FE813C;
}

</style>
