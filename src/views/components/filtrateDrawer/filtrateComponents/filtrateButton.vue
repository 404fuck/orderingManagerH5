<!--筛选按钮-->
<template>
    <div class="filtrate-item-wrapper">
        <div class="title">{{label}}</div>
        <div class="content-btn">
            <slot name="content-btn"></slot>
        </div>
        
    </div>
</template>

<script>
import { filtrate } from "./mixin-filtrate";
export default {
    name: "filtrateButton",
    mixins: [filtrate],
    
};
</script>

<style scoped>
    @import "filtrate.css";
</style>
