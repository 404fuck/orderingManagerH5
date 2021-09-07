<template>
    <div class="filtrate-foot" slot="filtrate-footer">
        <div class="resetBtn">
            <slot name="reset"></slot>
        </div>
        <div class="sureBtn">
            <slot name="sure"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "filtrateFooter"
};
</script>

<style scoped>
.filtrate-foot{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    z-index: 9;
    background: #fff;
}
.filtrate-foot .resetBtn{
    float: left;
    width: 50%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    letter-spacing: 4px;
    color: #505050;
}
.filtrate-foot .sureBtn{
    float: left;
    background: #F46F24;
    width: 50%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    letter-spacing: 4px;
    color: #fff;
}
</style>
