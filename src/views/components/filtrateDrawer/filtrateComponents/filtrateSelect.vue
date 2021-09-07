<!--下拉框-->
<template>
    <div class="filtrate-item-wrapper">
        <div class="title">{{label}}</div>
        <div class="content">
            <el-select style="width: 100%;height:100%" v-model="selected" :placeholder="placeholder">
                <el-option
                    v-for="(item,index) in options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                >{{item.label}}</el-option>
            </el-select>
        </div>
    </div>
</template>

<script>
import { filtrate } from "./mixin-filtrate";
export default {
    name: "filtrateSelect",
    mixins: [filtrate],
    props: {
        checkedData: {},
        options: {
            type: Array,
            default: null
        }
    },
    model: {
        prop: "checkedData",
        event: "revert"
    },
    data() {
        return {
            selected: null //null
        };
    },
    watch: {
        checkedData() {
            this.selected = this.checkedData;
        },
        selected() {
            this.$emit("revert", this.selected);
        }
    }
};
</script>

<style scoped>
@import "filtrate.css";
</style>
