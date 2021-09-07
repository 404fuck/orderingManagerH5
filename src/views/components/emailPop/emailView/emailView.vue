<template>
    <div class="email-view">
        <div class="email-content">
            <slot name="email-content"></slot>
        </div>
        <div class="email-footer">
            <slot name="email-footer"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "emailView"
};
</script>

<style scoped>
.email-view {
    width: 100%;
    height: 100%;
    padding: 0 20px;
}
.email-footer{
    width: 100%;
    overflow: hidden;
    background: #fff;
}
</style>
