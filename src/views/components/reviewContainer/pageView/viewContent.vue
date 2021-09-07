<!--页面表格主题-->
<template>
    <div class="view-content">
        <div class="cont-label">
            <slot name="cont-label"></slot>
        </div>
        <div class="cont-table">
            <slot name="table"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "view-content"
};
</script>

<style scoped>
.view-content {
    width: 100%;
    padding: 0 30px;
}
.cont-label{
    margin-top: 12px;
    overflow: hidden;
}
.cont-table{
    margin-top: 10px;
    overflow: hidden;
}
</style>