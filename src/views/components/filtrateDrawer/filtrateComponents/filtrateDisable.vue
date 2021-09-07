<!--禁止框 -->
<template>
    <div class="filtrate-item-wrapper">
        <div class="title">{{label}}</div>
        <div class="content">
            <el-input  v-model="indexes" :placeholder="placeholder" :readonly="true" :disabled="false" style="width: 255px"></el-input>
            <i class="el-icon-arrow-right"></i>
        </div>
    </div>
</template>

<script>
import { filtrate } from "./mixin-filtrate";

export default {
    name: "filtrateDisable",
    mixins: [filtrate],
    props: {
        acceptIndexes: {
            type: String,
            default: ""
        }
    },
    model: {
        prop: "acceptIndexes",
        event: "revert"
    },
    data() {
        return {
            indexes: this.acceptIndexes
        };
    },
    watch: {
        acceptIndexes() {
            this.indexes = this.acceptIndexes;
        },
        indexes() {
            this.$emit("revert", this.indexes);
        }
    }
};
</script>

<style scoped>
@import 'filtrate.css';
</style>
