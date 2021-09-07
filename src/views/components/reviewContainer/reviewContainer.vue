<!--表格路由外层-->
<template>
    <div class="review-container-wrapper">
        <div class="review-header">
            <slot name="header"></slot>
        </div>
        <div class="review-content">
            <slot name="content"></slot>
        </div>
        <div class="review-model">
            <slot name="model"></slot>
        </div>
        
    </div>
</template>

<script>
export default {
    name: "review-container"
};
</script>

<style scoped>
.review-container-wrapper{
    position: relative;
    width: 100%;
    height: 100%;
}
</style>
