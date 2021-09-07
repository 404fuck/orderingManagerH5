<!--日期范围搜索-->
<template>
    <div class="filtrate-item-wrapper">
        <div class="title">{{label}}</div>
        <div class="content">
            <el-date-picker
                :editable = false
                :clearable = false
                :start-placeholder="$t('supplyReport.Begin')"
                range-separator="-"
                :end-placeholder="$t('supplyReport.End')"
                type="daterange"
                style="width: 100%;height:100%"
                v-model="dateRange"
                value-format="yyyy-MM-dd"
            ></el-date-picker>
        </div>
    </div>
</template>

<script>
import { filtrate } from "./mixin-filtrate";
export default {
    name: "filtrateDateRange",
    mixins: [filtrate],
    props: {
        format: {
            type: String,
            default: "yyyy-MM-dd"
        },
        acceptDateRange: {
            type: Array,
            default: []
        }
    },
    model: {
        prop: "acceptDateRange",
        event: "revert"
    },
    data() {
        return {
            dateRange: []
        };
    },
    methods: {
       
    },
    created() {
        if (
            this.$route.query.lang == null ||
            this.$route.query.lang == "" ||
            typeof this.$route.query.lang == "undefined"
        ) {
            this.$store.dispatch("setLanguage", "en_US");
            this.$i18n.locale = "en_US";
        } else {
            this.$store.dispatch("setLanguage", this.$route.query.lang);
            this.$i18n.locale = this.$route.query.lang;
        }
        this.$store.dispatch("setToken", this.$route.query.token);
    },
    watch: {
        acceptDateRange() {
            this.dateRange = this.acceptDateRange;
        },
        dateRange() {
            this.$emit("revert", this.dateRange);
        }
    }
};
</script>

<style scoped>
@import "filtrate.css";
</style>
