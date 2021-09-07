<template>
    <div class="selectType-view">
        <div class="selectType-header">
            <slot name="selectType-header"></slot>
        </div>
        <div class="selectType-content">
            <slot name="selectType-content"></slot>
        </div>
        <div class="selectType-footer">
            <slot name="selectType-footer"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "selectTypeView"
};
</script>

<style scoped>
.selectType-view,.selectType-footer{
    width: 100%;
    display: block;
}
.selectType-content{
    padding: 0 20px;
    width: 100%;
    height: 210px;
    overflow-y: auto;
    margin-top: 20px;
}
</style>
