<template>
    <th class="numeric-cell">
        {{ title }}
        <el-popover
            placement="top-start"
            trigger="click"
            style="margin-right: 5px"
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
        <span @click="changeClick" v-if="isSort">
            <span v-if="t_sort == -1">
                <img
                    src="../../../assets/images/sortDown.png"
                    alt
                    width="12"
                    height="12"
                />
            </span>
            <span v-else-if="t_sort == 1">
                <img
                    src="../../../assets/images/sortUp.png"
                    alt
                    width="12"
                    height="12"
                />
            </span>
            <span v-else>
                <img
                    src="../../../assets/images/sortUnselect.png"
                    alt
                    width="12"
                    height="12"
                />
            </span>
        </span>
    </th>
</template>
<script>
export default {
    name: "nav-bar",
    components: {},
    props: {
        title: {
            type: String,
            default: "",
        },
        sort: {
            //0 nomal  1 up  2 down
            type: Number,
            default: 0,
        },
        index: {
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
		isSort: {
            type: Boolean,
            default: true,
		},
    },
    data() {
        return {
            t_sort: 0, //0 nomal  1 up  2 down
        };
    },
    computed: {
        language() {
            return this.$store.getters.language;
        },
        currentStore: {
            get() {
                return this.$store.getters.currentStore;
            },
            set(val) {},
        },
        storeList() {
            return this.$store.getters.storeList;
        },
    },
    methods: {
        changeClick() {
            if (this.t_sort == 0) {
                this.t_sort = 1;
            } else if (this.t_sort == 1) {
                this.t_sort = -1;
            } else {
                this.t_sort = 0;
            }
            this.$emit("sortChangeClick", this.t_sort, this.index);
        },
    },
    created() {},
    watch: {
        sort: {
            handler(newVal, oldVal) {
                this.t_sort = this.sort;
            },
        },
    },
};
</script>
<style scoped>
.el-popper {
    color: #808080 !important;
    font-size: 10px !important;
    transform: scale(0.83) !important;
}
</style>