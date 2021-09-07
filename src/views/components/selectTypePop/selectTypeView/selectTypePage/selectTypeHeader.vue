<template>
    <div class="selectType-header">
        <div class="selectheader-title">
            <slot name="title"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "selectTypeHeader"
};
</script>

<style scoped>
.selectheader-title{
    text-align: center;
    color: #505050;
    line-height: 28px;
    font-size: 16px;
}
</style>
