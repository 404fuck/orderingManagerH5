<!--
 * @Author: zzt
 * @Date: 2021-04-06 20:00:43
 * @LastEditTime: 2021-05-20 18:00:25
 * @LastEditors: Please set LastEditors
 * @Description: 加料配菜
 * @FilePath: \sjoyOrderingManagerH5\src\views\report\pages\feedingReport.vue
-->
<template>
    <div class="main-layout reports">
        <div class="row">
            <div class="padding15 row">
                <div class="col-100">
                    <SelectStore :dep_ID="dep_ID"></SelectStore>
                    <a
                        class="button button-round downBtn"
                        @click="downloadClick"
                    >
                        {{ $t("report.downReport") }}
                        <img
                            src="../../../assets/images/downloadReport.png"
                            alt
                            class="downImg"
                        />
                    </a>
                </div>
            </div>
            <div class="col-100">
                <div class="tab-contents">
                    <div>
                        <div class="row tabBtn" style="padding: 0 15px">
                            <div class="col-100">
                                <a
                                    class="button button-round font12"
                                    @click="tabClick(0)"
                                    :class="{ active: tabSelect == 0 }"
                                    >{{$t('report.addOn')}}</a
                                >
                                <a
                                    class="button button-round font12"
                                    @click="tabClick(1)"
                                    :class="{ active: tabSelect == 1 }"
                                    >{{$t('report.toGoBox')}}</a
                                >
                                <div
                                    class="moreScreen right"
                                    @click="moreClick"
                                    style="display: inline-block; float: right"
                                >
                                    <img
                                        src="../../../style/images/select.png"
                                        width="16"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-100 font12 timeShow">
                                <span>{{$t('dataRange')}}：</span>
                                <span>{{getTimeRange}}</span>
                            </div>
                        </div>
                        <div class="row" style="padding: 0px 15px 15px">
                            <!-- 销售金额-->
                            <reportCount
                                class="top15"
                                :title="$t('report.Sales')"
                                :titleText="titleText[screenDataIndex]"
                                :now="overviewdata.sale_amount | price"
                                :befor="
                                    overviewdata.sale_amount_proportion == -1
                                        ? '---'
                                        : overviewdata.sale_amount_proportion
                                "
                            ></reportCount>
                            <!-- 赠菜数量 -->
                            <reportCount
                                class="top15"
                                :title="$t('report.xiaoshouCount')"
                                :titleText="titleText[screenDataIndex]"
                                :now="overviewdata.sale_count"
                                :befor="
                                    overviewdata.sale_count_proportion == -1
                                        ? '---'
                                        : overviewdata.sale_count_proportion
                                "
                            ></reportCount>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-100">
                <div class="data-table font10 border">
                    <table
                        v-loading="dataLoading"
                        class="storeTable"
                    >
                        <thead>
                            <tr>
                                <th class="numeric-cell fontWeight">{{$t('report.name_')}}</th>
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
                            <tr v-for="(item, index) in tableData" :key="index">
                                <td
                                    class="numeric-cell"
                                    style="word-wrap: break-word !important"
                                >
                                    {{ item.name }}
                                </td>
                                <td class="numeric-cell">
                                    <span>{{ item.sale_num }}</span>
                                </td>
                                <td class="numeric-cell">
                                    {{ item.sale_amount | price }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- 暂无数据 -->
                    <div
                        class="noData-warp"
                        v-if="tableData == null || tableData.length == 0"
                    >
                        <span>{{ $t("noData") }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <van-popup
                v-model="propShow"
                style="border-radius: 15px; width: 80%"
            >
                <EmailPop
                    :propShow="propShow"
                    title="日销售报表"
                    :file="file"
                    @closeClick="closeClick"
                    @sendEmailClick="sendEmailClick"
                ></EmailPop>
            </van-popup>
        </div>
        <van-popup
            v-model="morePage"
            position="right"
            :style="{ height: '100%', width: '80%' }"
        >
           <div class="reportSelect">
                <!-- 时间范围 -->
                <div class="row top20">
                    <div class="col-100 font14 fontWeight">
                        {{ $t("dataRange") }}
                    </div>
                    <ScreenData 
                        @changeScreenClick="changeScreenClick" 
                        :screenData="screenDataIndex"
                        :isStyleBlock = 'true'
                    ></ScreenData>
                </div>
                <!-- 订单来源 -->
                <div class="row top20">
                    <div class="col-100 font14 fontWeight">
                        {{$t('orderDetail.orderCome')}}
                    </div>
                
                    <div class="col-100">
                        <a
                            class="button button-round font12"
                            @click="orderSource = index"
                            :class="orderSource == index ? 'active' : 'unActive'"
                            v-for="(item, index) in orderSourceTits"
                            :key="index"
                            >{{ item }}</a
                        >
                    </div>
                </div>
                <!-- 重置 --完成 筛选 -->
                <div class="row selectBtn">
                    <div class="col-50" @click="resetClick">
                        <div
                            class="button button-fill color-orange"
                            style="
                                background: white !important;
                                color: #505050;
                                border-top: 1px #eff1f2 solid;
                            "
                        >
                            <span>{{ $t("reset") }}</span>
                        </div>
                    </div>
                    <div class="col-50" @click="confirmClick">
                        <div class="button button-fill color-orange">
                            <span>{{ $t("success") }}</span>
                        </div>
                    </div>
                </div>
            </div>
            
        </van-popup>
    </div>
</template>

<script>
export default {
    name: "feedingReport",
    components: {
        SelectStore: (resolve) => require(["../components/SelectStore"], resolve),
        EmailPop: (resolve) => require(["../components/EmailPop"], resolve),
        reportCount: (resolve) =>require(["../components/reportCount"], resolve),
        SortImg: (resolve) => require(["../components/SortImg"], resolve),
        ScreenData: (resolve) => require(["../components/ScreenData"], resolve),
    },
    computed: {
        currentStore() {
            return this.$store.getters.currentStore;
        },
    },
    data() {
        return {
            titleData: [
                {
                    sort: 0,
                    title: this.$t('report.salesvolume_'),
                    key: "sale_num",
                },
                {
                    sort: 0,
                    title: this.$t('report.xiaoshoue'),
                    key: "sale_amount",
                },
            ],
            file: null,
            propShow: false,
            dep_ID: '',
            tabSelect: 0,
            titleText: [
                this.$t("report.aaa"),
                this.$t("report.bbb"),
                this.$t("report.ccc"),
                this.$t("report.ddd"),
            ],
            requestData: {
                dep_id: "", //门店id
                end_time: 0, //统计结束时间，格式YYYYMMDD 今日为4 昨日为1，本周为2，本月为3，自定义就是YYYYMMDD格式 ,
                start_time: 0, //统计开始时间,格式YYYYMMDD 今日为4 昨日为1，本周为2，本月为3，自定义就是YYYYMMDD格式 ,
                waiter_service: "", //订单来源: 服务员端，0：服务员点餐，1：扫码点餐(int),
            },
            overviewdata: {},
            tableData: null,
            defaultData: null,
            morePage: false,
            orderSource: null, //订单来源
            orderSourceTits: [this.$t("report.cashierTerminal"),this.$t("report.scanOrder"),this.$t("report.waiterApp")+'(HD)'],
            // 新版时间范围筛选
            isRestData:true,
            screenDataIndex:0,

            getTimeRange:"",//时间范围
        };
    },
    methods: {
        tabClick(val) {
            this.tabSelect = val;
            if (val == 0) {
                this.additionalReport();
            } else {
                this.boxReport();
            }
            this.resetClick();
            
        },
       
        
        // 加料配菜报表
        additionalReport() {
            let that = this;
            this.requestData.mail = "";
            this.requestData.dep_id = this.currentStore.dep_ID; //门店id
            this.requestData.waiter_service = this.orderSource==null?'':String(this.orderSource);
            this.request.additionalReport(this.requestData, function (res) {
                if (res.code == "1") {
                    // 时间范围转换
                    //06/02/2021 01:00 - 07/02/2021 00:59
                    let timeRange = res.data.timeRange;
                    let startTime = that.moment(timeRange.startTime).format("MM/DD/YYYY");
                    let endTime = that.moment(timeRange.endTime).format("MM/DD/YYYY");
                    that.getTimeRange = `${startTime} ${timeRange.fontTime} - ${endTime} ${timeRange.backTime}`;
                    
                     // 前后对比情况
                    that.overviewdata = res.data.dishSaleManage;
                    that.tableData = res.data.count_list;
                    that.defaultData = that.stringutils.deepClone(
                        that.tableData
                    );
                    
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        // 餐盒报表
        boxReport() {
            let that = this;
            this.requestData.mail = "";
            this.requestData.dep_id = this.currentStore.dep_ID; //门店id
            this.requestData.waiter_service = this.orderSource==null?'':String(this.orderSource);
            this.request.boxReport(this.requestData, function (res) {
                if (res.code == "1") {
                    // 前后对比情况
                    that.overviewdata = res.data.dishSaleManage;
                    that.tableData = res.data.count_list;
                    that.defaultData = that.stringutils.deepClone(
                        that.tableData
                    );
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        // 筛选
        moreClick() {
            this.morePage = true;
        },
        changeScreenClick(start,end,index,isRestData){
            this.screenDataIndex = index;
            this.requestData.start_time = this.moment(start).format("YYYYMMDD");
            this.requestData.end_time = this.moment(end).format("YYYYMMDD");
            this.isRestData = isRestData;
        },
        // 筛选页--确认按钮
        confirmClick() {
            if (this.tabSelect == 0) {
                // 加料配菜
                this.additionalReport();
            } else {
                // 餐盒
                this.boxReport();
            }
            this.morePage = false;
        },
        // 筛选页--重置按钮
        resetClick() {
            this.requestData.waiter_service ="";
            this.orderSource = null;
        },
        // 排序
        sortChangeClick(sort, index) {
            this.titleData[index].sort = sort;
            for (let i in this.titleData) {
                if (i != index) {
                    this.titleData[i].sort = 0;
                }
            }

            if (this.titleData[index].sort == 0) {
                this.tableData = this.stringutils.deepClone(this.defaultData);
            } else {
                this.tableData.sort(
                    this.stringutils.sortBy(
                        this.titleData[index].key,
                        this.titleData[index].sort
                    )
                );
            }
        },
        
        downAdditionalReport(email, isdefault) {
            let that = this;
            this.requestData.dep_id = this.currentStore.dep_ID; //门店id
            this.requestData.mail = email;
            this.requestData.isdefault = isdefault;
            this.request.additionalReport(this.requestData, function (res) {
                if (res.code == "1") {
                    that.toast.success(that.$t("sendSuccess"));
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        downBoxSale(email, isdefault) {
            let that = this;
            this.requestData.dep_id = this.currentStore.dep_ID; //门店id
            this.requestData.mail = email;
            this.requestData.isdefault = isdefault;
            this.request.boxReport(this.requestData, function (res) {
                if (res.code == "1") {
                    that.toast.success(that.$t("sendSuccess"));
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        sendEmailClick(email, isdefault) {
            if (this.tabSelect == 0) {
                // 加料配菜
                this.downAdditionalReport(email, isdefault);
            } else {
                this.downBoxSale(email, isdefault);
            }
        },
        downloadClick() {
            this.propShow = true;
        },
        closeClick(val) {
            this.propShow = val;
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
        this.$store.dispatch("setToken", this.$route.query.token);

        this.dep_ID = this.$route.query.dep_ID;
        this.currentStore.dep_ID = this.$route.query.dep_ID;
        this.requestData.mail = "";
    },
    mounted() {},
    watch: {
        currentStore: {
            handler(newVal, oldVal) {
                if (newVal != undefined && newVal != null) {
                    this.additionalReport();
                }
            },
        },
    },
};
</script>
<style scoped>
</style>