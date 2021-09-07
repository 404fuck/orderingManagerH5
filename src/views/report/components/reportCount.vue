<template>
    <div class="col-50 countDiv">
        <div class="row no-gutter">
            <div class="col-90">
                <span
                    class="left font12 colorBlack"
                    style="
                        text-align: justify;
                        word-break: break-all;
                        display: inline-block;
                    "
                    >{{ title }}</span
                >
                <span>
                    <el-popover
                        placement="top-start"
                        trigger="click"
                        style="font-size: 12px"
                        :content="contentText"
                    >
                        <img
                            v-if="showImg"
                            slot="reference"
                            src="../../../style/toolsImg/tip.png"
                            alt=""
                            width="9"
                            style="position: relative; left: 2px; top: -5px"
                        />
                    </el-popover>
                </span>
                <span class="font12 left5" style="color: #eb3c1c">{{
                    titleTip
                }}</span>
            </div>
            <div class="col-10">
                <span style="float: right">
                    <img
                        v-if="befor <= 0 || befor == '---'"
                        src="../../../assets/images/report_down.png"
                    />
                    <img v-else src="../../../assets/images/report_up.png" />
                </span>
            </div>
            <div class="col-100 center font22" style="margin-top: 7px">
                <b>{{ now }}</b>
            </div>
            <div class="col-100 center top5 font10 colorBlack">
                <span>{{ titleText }}</span>
                <span class="left10"
                    >{{ befor }} <span v-if="befor == '---'"></span>
                    <span v-else>%</span></span
                >
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "reportCount",
    components: {},
    props: {
        titleText: {
            type: String,
            default: "",
        },
        title: {
            type: String,
            default: "",
        },
        titleTip: {
            type: String,
            default: "",
        },
        now: {
            type: Number,
            default: 0,
        },
        befor: {
            type: Number,
            default: 0,
        },
        contentText: {
            type: String,
            default: "",
        },
        showImg: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
<style scoped>
.countDiv {
    background: white;
    height: 100px;
    padding: 10px;
    border-radius: 6px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
}
.el-popper {
    color: #808080 !important;
    font-size: 12px !important;
}
</style>