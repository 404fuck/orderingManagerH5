<!--输入框-->
<template>
    <div class="email-input">
        <el-input  type="text" v-model="indexes" clearable></el-input>
    </div>
</template>

<script>

export default {
    name: "emailInput",
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
.email-input{
    margin-top: 20px;
    width: 100%;
    height: 28px;
    border-bottom: 1px solid rgb(183, 183, 183);
}
</style>
