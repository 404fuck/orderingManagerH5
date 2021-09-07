<!--输入框-->
<template>
    <div class="filtrate-item-wrapper">
        <div class="title">{{label}}</div>
        <div class="content">
            <el-input  type="text" :placeholder="placeholder" v-model="indexes" clearable></el-input>
        </div>
    </div>
</template>

<script>
import { filtrate } from "./mixin-filtrate";

export default {
    name: "filtrateInpout",
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
