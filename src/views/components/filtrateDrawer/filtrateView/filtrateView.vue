<template>
    <div class="filtrate-view">
        <div class="filtrate-content">
            <slot name="filtrate-content"></slot>
        </div>
        <div class="filtrate-footer">
            <slot name="filtrate-footer"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "filtrateView"
};
</script>

<style scoped>
.filtrate-view {
    width: 100%;
    height: 80%;
    overflow: auto;
}
.filtrate-content{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    margin-top: 40px;
    padding: 0 20px;
    margin-bottom: 80px;
}
.filtrate-footer{
    width: 100%;
    overflow: hidden;
    background: #fff;
}

</style>
