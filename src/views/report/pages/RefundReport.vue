<!--
 * @Author: zzt
 * @Date: 2021-04-06 14:27:34
 * @LastEditTime: 2021-05-20 17:56:48
 * @LastEditors: Please set LastEditors
 * @Description: 退款报表
 * @FilePath: \sjoyOrderingManagerH5\src\views\report\pages\RefundReport.vue
-->

<template>
    <div class="main-layout reports">
        <div class="row">
            <div class="padding15 row">
                <div class="col-100">
                    <SelectStore :dep_ID="dep_ID"></SelectStore>
                    <a
                        class="button button-round downBtn"
                        @click="downloadCLick"
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
            <div class="row dateSelect" style="padding:0 15px;">
                <div class="col-100">
                    <a
                        class="button button-round font12"
                        v-for="(item, index) in dateTabTits"
                        :key="index"
                        :class="{ active: daySelect == index }"
                        @click="daySelectClick(index)"
                        >{{ item }}</a
                    >
                    <div
                        class="moreScreen"
                        @click="moreClick"
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
                    <span>{{ $t("dataRange") }}：</span>
                    <span>{{ getTimeRange }}</span>
                </div>
            </div>
            <div class="row padding15">
                <reportCount
                    v-if="overviewdata.refund_amounts_proportion == -1"
                    :title="$t('accountsDetail.tuikuans')"
                    :titleText="titleText[titleSelect]"
                    :now="overviewdata.refund_amounts | price"
                    :befor="'---'"
                ></reportCount>
                <reportCount
                    v-else
                    :title="$t('accountsDetail.tuikuans')"
                    :titleText="titleText[titleSelect]"
                    :now="overviewdata.refund_amounts | price"
                    :befor="overviewdata.refund_amounts_proportion"
                ></reportCount>
                <reportCount
                    v-if="overviewdata.refund_number_proportion == -1"
                    :title="$t('report.returnCount')"
                    :titleText="titleText[titleSelect]"
                    :now="overviewdata.refund_number"
                    :befor="'---'"
                ></reportCount>
                <reportCount
                    v-else
                    :title="$t('report.returnCount')"
                    :titleText="titleText[titleSelect]"
                    :now="overviewdata.refund_number"
                    :befor="overviewdata.refund_number_proportion"
                ></reportCount>
            </div>

            <div class="day-tab">
                <div>
                    <div class="row top10">
                        <div class="col-50" style="padding: 0 12px">
                            <h4>{{ $t("report.tuikuan") }}</h4>
                        </div>
                        <div
                            class="col-50 reportBtn"
                            style="padding: 0 12px"
                        >
                            <p
                                class="buttons-row"
                                style="
                                    margin: 0px;
                                    padding: 0px;
                                    float: right;
                                "
                            >
                                <a
                                    style="margin-right: 0"
                                    class="button button-round"
                                    @click="yingyeSelectClick(0)"
                                    :class="{ active: yingyeSelect == 0 }"
                                    >{{ $t("report.anPrice") }}</a
                                >
                                <a
                                    class="button button-round"
                                    @click="yingyeSelectClick(1)"
                                    :class="{ active: yingyeSelect == 1 }"
                                    >{{ $t("report.anNum") }}</a
                                >
                            </p>
                        </div>
                        <div class="col-100">
                            <div
                                id="myChart"
                                :style="{ width: '98%', height: '300px' }"
                            ></div>
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
                                            <th
                                                class="numeric-cell fontWeight"
                                                style="
                                                    width: 32%;
                                                    text-align: center;
                                                "
                                            >
                                                {{
                                                    $t(
                                                        "accountsDetail.dingdanId"
                                                    )
                                                }}
                                            </th>
                                            <th
                                                class="numeric-cell fontWeight"
                                                style="
                                                    width: 22%;
                                                    text-align: center;
                                                "
                                            >
                                                {{
                                                    $t(
                                                        "accountsDetail.tuikuan"
                                                    )
                                                }}
                                            </th>
                                            <th
                                                class="numeric-cell fontWeight"
                                                style="
                                                    width: 22%;
                                                    text-align: center;
                                                "
                                            >
                                                {{
                                                    $t(
                                                        "accountsDetail.tuikuanWhy"
                                                    )
                                                }}
                                            </th>
                                            <th
                                                class="numeric-cell fontWeight"
                                                style="
                                                    width: 23%;
                                                    text-align: center;
                                                "
                                            >
                                                {{
                                                    $t(
                                                        "accountsDetail.people"
                                                    )
                                                }}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="(
                                                item, index
                                            ) in tableData"
                                            :key="index"
                                        >
                                            <td
                                                class="numeric-cell"
                                                style="width: 32%"
                                            >
                                                {{ item.order_id }}
                                            </td>
                                            <td
                                                class="numeric-cell"
                                                style="width: 22%"
                                            >
                                                {{
                                                    item.refund_amount
                                                        | price
                                                }}
                                            </td>
                                            <td
                                                class="numeric-cell"
                                                style="width: 22%"
                                            >
                                                {{ item.settle_reason }}
                                            </td>
                                            <td
                                                class="numeric-cell"
                                                style="width: 23%"
                                            >
                                                {{ item.user_name | text }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <!-- 暂无数据 -->
                                <div
                                    class="noData-warp"
                                    v-if="
                                        tableData == null ||
                                        tableData.length == 0
                                    "
                                >
                                    <span>{{ $t("noData") }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-100 center">
                            <el-pagination
                                v-if="currentPage.total !== 0"
                                class="page-pagination center"
                                layout="prev, pager, next,sizes"
                                :total="currentPage.total"
                                :pager-count="3"
                                :page-size="currentPage.size"
                                :current-page="currentPage.page"
                                @current-change="handleCurrentChange"
                                @size-change="handleSizeChange"
                                :page-sizes="[10, 20, 30, 50]"
                            ></el-pagination>
                        </div>
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
                <!-- 退款原因 -->
                <div class="row top20">
                    <div class="col-100 font14 fontWeight">
                        {{$t('accountsDetail.tuikuanWhy')}}
                    </div>
                    <div class="col-100">
                        <a
                            class="button button-round font12"
                            v-for="(item, index) in backdishOptions"
                            :key="index"
                            @click="requestData.refund_reason = item.id"
                            :class="requestData.refund_reason == item.id? 'active': 'unActive'"
                            >{{ item.content }}</a
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
    name: "RefundReport",
    components: {
        SelectStore: (resolve) => require(["../components/SelectStore"], resolve),
        EmailPop: (resolve) => require(["../components/EmailPop"], resolve),
        reportCount: (resolve) =>require(["../components/reportCount"], resolve),
        ScreenData: (resolve) => require(["../components/ScreenData"], resolve),    
           
    },
    computed: {
        currentStore() {
            return this.$store.getters.currentStore;
        },
    },
    data() {
        return {
            file: null,
            propShow: false,
            dep_ID: "",
            ordershows: 1,
            daySelect: 0,
            dateTabTits: [
                this.$t("report.today"),
                this.$t("report.yesterday"),
                this.$t("report.week"),
                this.$t("report.month"),
            ],
            yingyeSelect: 0,
            dingdanSelect: 0,
            shiduanSelect: 0,
            orderSelect: 0,
            zhifuSelect: 0,
            titleSelect:0,
            titleText: [
                this.$t("report.aaa"),
                this.$t("report.aaa"),
                this.$t("report.bbb"),
                this.$t("report.ccc"),
                this.$t("report.ddd"),
            ],
            requestData: {
                dep_id: "", //门店id
                end_time: 0, //统计结束时间，格式YYYYMMDD 今日为4 昨日为1，本周为2，本月为3，自定义就是YYYYMMDD格式 ,
                start_time: 0, //统计开始时间,格式YYYYMMDD 今日为4 昨日为1，本周为2，本月为3，自定义就是YYYYMMDD格式 ,
                dish_classify: 0,
                refund_reason: -1, //退款原因id
                pageNum: 0,
                pageSize: 10,
            },
            overviewdata: {
                order_num_before: 0, //过去的订单 ,
                order_num_now: 0, //现在的订单 ,
                order_num: 0, //订单数量增长率 ,
                person_num_before: 0, //过去的就餐人数 ,
                person_num_now: 0, //现在的就餐人数 ,
                person_num: 0, //就餐人数增长率 ,
                person_price_before: 0, //过去的人均消费 ,
                person_price_now: 0, //现在的人均消费 ,
                person_price: 0, //个人消费增长率 ,
                real_count_before: 0, //过去的实收金额 ,
                real_count_now: 0, //现在的实收金额 ,
                real_count: 0, //实收金额增长率 ,
                should_count_before: 0, //过去的订单总额 ,
                should_count_now: 0, //现在的订单总额 ,

                refund_amounts: 0, //退款总金额
                refund_number: 0, //退款订单总数
                refund_amounts_before: 0, //前退总金额
                refund_number_before: 0, //前退款订单总数
                refund_amounts_proportion: 0, //退款总金额比
                refund_number_proportion: 0, //退款总订单数比
            },
            orderSource: {
                settle_count: [], //每日的退款金额统计
                settle_num: [], //每日的退款数量统计 ,
            },
            timecount: {},
            paycount: {},
            data: {},
            dataLoading: false, //数据懒加载
            //element page
            tableData: [],
            currentPage: {
                total: 0,
                page: 1,
                size: 10,
            },
            yinyeShows: 1,
            backdishOptions: [],
            backdishType:'',
            morePage: false,
            // 新版时间范围筛选
            isRestData:true,
            screenDataIndex:-1,

            getTimeRange: "", //时间范围
        };
    },
    methods: {
        //查询门店配置(退款原因)
        getDishSet() {
            let that = this;
            let data = { dept_id: this.currentStore.dep_ID };
            this.request.selectDishSet(data, function (res) {
                if (res.code == "1") {
                    if (res.data != null) {
                        let temp = JSON.parse(res.data.deal_item);
                        let arr;
                        if (JSON.stringify(temp) != "{}") {
                            arr = temp["backdish"]["list"];
                        }
                        for (let i in arr) {
                            that.backdishOptions.push(arr[i]);
                        }
                        console.log(that.backdishOptions);
                    }
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        refundReport(email, isdefault) {
            let that = this;
            this.requestData.dep_id = this.currentStore.dep_ID; //门店id
            this.requestData.mail = email;
            this.requestData.isdefault = isdefault;
            this.request.refundReport(this.requestData, function (res) {
                if (res.code == "1") {
                    that.toast.success(that.$t("sendSuccess"));
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        valueChange(val) {
            this.requestData.refund_reason = val;
            this.pagerefund();
        },
        //分页初始化
        initPagination() {
            this.currentPage.page = 1;
        },
        // 分页
        handleCurrentChange(page) {
            this.currentPage.page = page;
            this.pagerefund();
        },
        handleSizeChange(size) {
            //当分页不在第一页时，切换每页显示条数 使得page返回参数为1
            this.currentPage.page = 1;
            sessionStorage.setItem("sizes", size);
            this.currentPage.size = size;

            this.pagerefund();
        },
        pagerefund() {
            let that = this;
            this.dataLoading = true;
            this.requestData.mail = "";
            let getpageSizes = Number(sessionStorage.getItem("sizes"));
            //判断每页显示条数有无缓存
            if (getpageSizes) {
                this.currentPage.size = getpageSizes;
            }
            this.requestData.dep_id = this.currentStore.dep_ID; //门店id
            this.requestData.pageNum = this.currentPage.page - 1;
            this.requestData.pageSize = this.currentPage.size;
            this.request.pagerefund(this.requestData, function (res) {
                if (res.code == "1") {
                    that.dataLoading = false;
                    // 时间范围转换
                    //06/02/2021 01:00 - 07/02/2021 00:59
                    let timeRange = res.data.timeRange;
                    let startTime = that
                        .moment(timeRange.startTime)
                        .format("MM/DD/YYYY");
                    let endTime = that
                        .moment(timeRange.endTime)
                        .format("MM/DD/YYYY");
                    that.getTimeRange = `${startTime} ${timeRange.fontTime} - ${endTime} ${timeRange.backTime}`;
                    
                    that.data = res.data;
                    let totalNum = that.data.list.total;
                    that.currentPage.total = 0;
                    that.tableData = [];
                    // console.log(that.data);
                    that.tableData = that.data.list.list;
                    that.currentPage.total = Number(totalNum);

                    // console.log(that.currentPage.total);
                    that.overviewdata = that.data;
                    that.yingyeSelectClick(0);
                    that.defaultData = that.stringutils.deepClone(
                        that.data["list"]
                    );
                    
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        sendEmailClick(email, isdefault) {
            this.refundReport(email, isdefault);
        },
        downloadCLick() {
            this.propShow = true;
        },
        closeClick(val) {
            this.propShow = val;
        },
        more() {
            this.$router.push({ path: "/ReportSelect" });
        },
        setOrder() {
            this.$router.push({ path: "/SetorderDetail" });
        },
        yingyeSelectClick(val) {
            if (val == 0) {
                this.yinyeShows = 1;
            } else {
                this.yinyeShows = 0;
            }
            this.yingyeSelect = val;
            this.yinyeData(val);
        },
        yinyeData(isNum) {
            var date = [];
            var data = [];
            let that = this;
            if (isNum == 1) {
                for (var i in that.data.settle_num) {
                    date.push(i);
                    data.push(that.data.settle_num[i]);
                }
                that.yinyefenxi(data, date);
            } else {
                for (var i in that.data.settle_count) {
                    date.push(i);
                    data.push(
                        that.stringutils.formatPrice(that.data.settle_count[i])
                    );
                }
                that.yinyefenxi(data, date);
            }
        },
        yinyefenxi(data, date) {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(
                document.getElementById("myChart")
            );
            // 绘制图表
            myChart.setOption({
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}： {c} ",
                },
                color: ["#30CFB7"],
                grid: {
                    left: "15",
                    right: "0",
                    bottom: "20%",
                    containLabel: true,
                },

                xAxis: [
                    {
                        show: true,
                        type: "category",
                        boundaryGap: false,
                        data: date,
                        // X轴字段倾斜设置
                        axisLabel: {
                            interval: 0,
                            // 旋转度数
                            rotate: 90,
                        },
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                        position: "right",
                        minInterval: 1, //只显示整数
                        axisLine: {
                            //y轴
                            show: false,
                        },
                    },
                ],
                dataZoom: [
                    {
                        show: false,
                        height: 20,
                        xAxisIndex: [0],
                        bottom: 0,
                        start: 0,
                        end: 80,
                        handleIcon:
                            "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
                        handleSize: "100%",
                        handleStyle: {
                            color: "#d3dee5",
                        },
                        textStyle: {
                            color: "#000",
                        },
                        borderColor: "#90979c",
                    },
                    {
                        type: "inside",
                        show: true,
                        height: 15,
                        start: 1,
                        end: 35,
                    },
                ],
                series: [
                    {
                        name: this.yinyeShows == 1 ? this.$t('report.tuikuanATM') : this.$t('report.tuikuanQTY'),
                        type: "line",
                        symbolSize: 8,
                        smooth: true,
                        lineStyle: {
                            normal: {
                                color: "#30CFB7",
                            },
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: "rgba(48,207,183,0.21)",
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(48,207,183,0)",
                                        },
                                    ]
                                ),
                            },
                        },
                        data: data,
                    },
                ],
            });
            myChart.resize();
        },
        
        // 快捷时间选择
        daySelectClick(val) {
            this.daySelect = val;
            this.titleSelect = this.daySelect;
            this.requestData.start_time = val;
            this.requestData.end_time = val;
            this.screenDataIndex = -1;
            this.initPagination();
            this.pagerefund();
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
        confirmClick() {
            this.titleSelect = this.screenDataIndex+1;
            if( this.isRestData == false){
                this.daySelect = -1;
            }
            if(this.screenDataIndex==-1){
                this.daySelect = 0;
                this.requestData.start_time = 0;
                this.requestData.end_time = 0;
            }
            this.pagerefund();
            this.morePage = false;
        },
        // 重置
        resetClick() {
            this.screenDataIndex = -1;
            this.requestData.refund_reason = -1; 
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
    watch: {
        currentStore: {
            handler(newVal, oldVal) {
                if (newVal != undefined && newVal != null) {
                    this.pagerefund();
                    this.getDishSet();
                }
            },
        },
    },
};
</script>
<style scoped>
</style>
