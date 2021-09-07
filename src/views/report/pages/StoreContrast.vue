<!--
 * @Author: zzt
 * @Date: 2021-04-06 14:27:34
 * @LastEditTime: 2021-05-20 18:04:36
 * @LastEditors: Please set LastEditors
 * @Description: 门店对比
 * @FilePath: \sjoyOrderingManagerH5\src\views\report\pages\StoreContrast.vue
-->
<template>
    <div class="main-layout reports">
        <div class="row dateSelect" style="padding-left: 15px">
            <div class="col-100 top20">
                <div class="row dateSelect" style="padding:0 15px;">
                    <div class="col-100">
                        <ScreenData 
                            @changeScreenClick="changeScreenClick" 
                            :screenData="screenDataIndex"
                            :isStyleBlock = 'false'
                        ></ScreenData>
                    </div>
                </div>
                <div class="row padding15">
                    <!-- 净收总额 -->
                    <reportCount
                        class="col-33"
                        v-if="overviewdata.net_count_proportion == -1"
                        :title="$t('report.jingshou')"
                        :titleTip="$t('titleTip')"
                        :titleText="titleText[screenDataIndex]"
                        :now="overviewdata.net_count | price"
                        :befor="'---'"
                    ></reportCount>
                    <reportCount
                        class="col-33"
                        v-else
                        :title="$t('report.jingshou')"
                        :titleTip="$t('titleTip')"
                        :titleText="titleText[screenDataIndex]"
                        :now="overviewdata.net_count | price"
                        :befor="overviewdata.net_count_proportion"
                    ></reportCount>
                    <!-- 实收总额 -->
                    <reportCount
                        class="col-33"
                        v-if="overviewdata.real_count_proportion == -1"
                        :title="$t('report.priceCount')"
                        :titleTip="$t('titleTip')"
                        :titleText="titleText[screenDataIndex]"
                        :now="overviewdata.real_count | price"
                        :befor="'---'"
                    ></reportCount>
                    <reportCount
                        class="col-33"
                        v-else
                        :title="$t('report.priceCount')"
                        :titleTip="$t('titleTip')"
                        :titleText="titleText[screenDataIndex]"
                        :now="overviewdata.real_count | price"
                        :befor="overviewdata.real_count_proportion"
                    ></reportCount>
                    <!-- 订单总额 -->
                    <reportCount
                        class="col-33"
                        v-if="overviewdata.should_count_proportion == -1"
                        :title="$t('report.dingPrice')"
                        :titleTip="$t('titleTip')"
                        :titleText="titleText[screenDataIndex]"
                        :now="overviewdata.should_count | price"
                        :befor="'---'"
                    ></reportCount>
                    <reportCount
                        class="col-33"
                        v-else
                        :title="$t('report.dingPrice')"
                        :titleTip="$t('titleTip')"
                        :titleText="titleText[screenDataIndex]"
                        :now="overviewdata.should_count | price"
                        :befor="overviewdata.should_count_proportion"
                    ></reportCount>
                    <!-- 订单总数 -->
                    <reportCount
                        class="col-33 top15"
                        v-if="overviewdata.tatol_num_proportion == -1"
                        :title="$t('report.dingCount')"
                        :titleTip="$t('titleTip')"
                        :titleText="titleText[screenDataIndex]"
                        :now="overviewdata.tatol_num"
                        :befor="'---'"
                    ></reportCount>
                    <reportCount
                        class="col-33 top15"
                        v-else
                        :title="$t('report.dingCount')"
                        :titleTip="$t('titleTip')"
                        :titleText="titleText[screenDataIndex]"
                        :now="overviewdata.tatol_num"
                        :befor="overviewdata.tatol_num_proportion"
                    ></reportCount>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-100">
                <div class="data-table font10 border">
                    <table class="storeTable">
                        <thead>
                            <tr>
                                <th class="numeric-cell fontWeight">
                                    {{ $t("report.store") }}
                                </th>
                                <SortImg
                                    v-for="(item, index) in titleData"
                                    :title="item.title"
                                    :sort="item.sort"
                                    :index="index"
                                    :key="index"
                                    @sortChangeClick="sortChangeClick"
                                ></SortImg>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(item, index) in data"
                                @click="cellClick(item.dep_id)"
                                :key="index"
                            >
                                <td class="numeric-cell">
                                    {{ item.dep_name }}
                                </td>
                                <td class="numeric-cell">
                                    {{ item.net_count | price }}
                                </td>
                                <td class="numeric-cell">
                                    {{ item.should_count | price }}
                                </td>
                                <td class="numeric-cell">
                                    {{ item.tatol_num }}
                                </td>
                                <td class="numeric-cell">
                                    <span v-if="item.order_module != '0'">{{
                                        item.person_num
                                    }}</span>
                                    <span v-else>---</span>
                                </td>
                                <td class="numeric-cell">
                                    <span v-if="item.order_module != '0'">{{
                                        item.person_consumption | price
                                    }}</span>
                                    <span v-else>---</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "storeContrast",
    components: {
        reportCount: (resolve) =>require(["../components/reportCount"], resolve),
        SortImg: (resolve) => require(["../components/SortImg"], resolve),
        ScreenData: (resolve) => require(["../components/ScreenData"], resolve),
    },
    computed: {
        currentStore() {
            return this.$store.getters.currentStore;
        },
        token() {
            return this.$store.getters.token;
        },
        language: {
            get() {
                return this.$store.getters.language;
            },
            set(val) {},
        },
    },
    data() {
        return {
            titleText: [
                this.$t("report.aaa"),
                this.$t("report.bbb"),
                this.$t("report.ccc"),
                this.$t("report.ddd"),
            ],
            overviewdata: {
                real_count: 0,
                real_count_proportion: 0,
                should_count: 0,
                should_count_proportion: 0,
                net_count: 0,
                net_count_proportion: 0,
                tatol_num: 0,
                tatol_num_proportion: 0,
            },
            requestData: {
                dep_id: -1, //门店id
                end_time: 0, //统计结束时间，格式YYYYMMDD 今日为4 昨日为1，本周为2，本月为3，自定义就是YYYYMMDD格式 ,
                start_time: 0, //统计开始时间,格式YYYYMMDD 今日为4 昨日为1，本周为2，本月为3，自定义就是YYYYMMDD格式 ,
            },
            
            show: false,
            titleData: [
                {
                    sort: 0,
                    title: this.$t("report.sumPrice"),
                    key: "real_count",
                },
                {
                    sort: 0,
                    title: this.$t("report.dingPrice"),
                    key: "should_count",
                },
                {
                    sort: 0,
                    title: this.$t("report.dingCount"),
                    key: "tatol_num",
                },
                { sort: 0, title: this.$t("report.eatNum"), key: "person_num" },
                {
                    sort: 0,
                    title: this.$t("report.avg"),
                    key: "person_consumption",
                },
            ],
            data: null,
            defaultData: null,

            // 新版时间范围筛选
            isRestData:true,
            screenDataIndex:0,
        };
    },
    methods: {
        // 快捷时间选择
        changeScreenClick(start,end,index,isRestData){
            this.screenDataIndex = index;
            this.requestData.start_time = this.moment(start).format("YYYYMMDD");
            this.requestData.end_time = this.moment(end).format("YYYYMMDD");
            this.isRestData = isRestData;
            if(start!=null&&end!=null){
                this.deprank();
            }
        },
        deprank() {
            let that = this;
            this.request.deprank(this.requestData, function (res) {
                if (res.code == "1") {
                    that.data = res.data.list;
                    that.overviewdata = res.data;
                    that.defaultData = that.stringutils.deepClone(that.data);
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        sortChangeClick(sort, index) {
            this.titleData[index].sort = sort;
            for (let i in this.titleData) {
                if (i != index) {
                    this.titleData[i].sort = 0;
                }
            }

            if (this.titleData[index].sort == 0) {
                this.data = this.stringutils.deepClone(this.defaultData);
            } else {
                this.data.sort(
                    this.stringutils.sortBy(
                        this.titleData[index].key,
                        this.titleData[index].sort
                    )
                );
            }
        },
        cellClick(dep_ID) {
            if (this.stringutils.isOSXMAC()) {
            } else {
                window.android.goToWebView(
                    "/report.html#/report?token=" +
                        this.token +
                        "&dep_ID=" +
                        dep_ID +
                        "&lang=" +
                        this.language,
                    true
                );
            }
        },
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
        // this.$Local(this.$route.query.lang);
        this.$store.dispatch("setToken", this.$route.query.token);

       
    },
    watch: {
        currentStore: {
            handler(newVal, oldVal) {
                if (newVal != undefined && newVal != null) {
                }
            },
        },
    },
};
</script>
<style scoped>
</style>