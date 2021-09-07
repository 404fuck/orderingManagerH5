<!--
 * @Author: zzt
 * @Date: 2021-04-06 14:27:34
 * @LastEditTime: 2021-06-30 14:19:13
 * @LastEditors: Please set LastEditors
 * @Description: 时段分析
 * @FilePath: \sjoyOrderingManagerH5\src\views\report\pages\TimeReport.vue
-->
<template>
    <div class="main-layout reports">
        <div class="row">
            <div class="row padding15">
                <div class="col-100">
                    <SelectStore :dep_ID="dep_ID"></SelectStore>
                    <a
                        class="button button-round downBtn"
                        style="margin-right: 22px"
                        @click="downloadClick"
                        v-if="mkt_flag == '0'"
                    >
                        {{ $t("report.downReport") }}
                        <img
                            src="../../../assets/images/downloadReport.png"
                            alt
                            class="downImg"
                        />
                    </a>
                    <el-dropdown
                        trigger="click"
                        style="float: right"
                        v-if="mkt_flag == '1'"
                    >
                        <a
                            class="button button-round downBtn el-dropdown-link"
                            style="margin-right: 20px"
                        >
                            {{ $t("report.downReport") }}
                            <img
                                src="../../../assets/images/downloadReport.png"
                                alt
                                class="downImg"
                            />
                        </a>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="downloadClick"
                                >时报</el-dropdown-item
                            >
                            <el-dropdown-item @click.native="GtodownloadClick"
                                >Hourly GTO</el-dropdown-item
                            >
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
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
                <span
                    v-if="
                        isCanduan == true &&
                        getOpenUpdateTime != null &&
                        getOpenUpdateTime != ''
                    "
                    class="top5"
                    style="color: #808080; display: block; font-size: 10px"
                    >{{ $t("report.openUpdateTime1") }} {{ getOpenUpdateTime }}
                    {{ $t("report.openUpdateTime2") }}</span
                >
            </div>
        </div>
        <div class="row">
            <div class="col-50"></div>
            <div class="col-50 reportBtn" style="padding: 0 20px">
                <p
                    class="buttons-row"
                    style="
                        margin: 0px;
                        padding: 0px;
                        float: right;
                        margin-top: 20px;
                        z-index: 9999;
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
                    :style="{ width: '97%', height: '300px' }"
                ></div>
            </div>
        </div>
        <div class="row">
            <div class="col-100">
                <div class="data-table font10 border">
                    <table class="storeTable">
                        <thead>
                            <tr>
                                <th class="numeric-cell fontWeight">
                                    {{ tableHoursTitle }}
                                </th>
                                <SortImg
                                    v-for="(item, index) in titleData"
                                    :title="item.title"
                                    :contentText="item.contentText"
                                    :sort="item.sort"
                                    :index="index"
                                    :showImg="item.showImg"
                                    :key="index"
                                    @sortChangeClick="sortChangeClick"
                                ></SortImg>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in tableData" :key="index">
                                <td class="numeric-cell">{{ item.hour }}</td>
                                <td class="numeric-cell">
                                    {{ item.type_count | price }}
                                </td>
                                <td class="numeric-cell">
                                    {{ item.order_num }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <van-popup v-model="propShow" style="border-radius: 15px; width: 80%">
            <EmailPop
                :propShow="propShow"
                title="日销售报表"
                :file="file"
                @closeClick="closeClick"
                @sendEmailClick="sendEmailClick"
            ></EmailPop>
        </van-popup>
        <van-popup
            v-model="GtopropShow"
            style="border-radius: 15px; width: 80%"
            :close-on-click-overlay="false"
        >
            <GtoEmailPop
                :GtopropShow="GtopropShow"
                @GtocloseClick="GtocloseClick"
                @sendGtoEmailClick="sendGtoEmailClick"
            ></GtoEmailPop>
        </van-popup>
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
                <!-- 统计方式 -->
                <div class="row top20">
                    <div class="col-100 font14 fontWeight">
                        {{ $t("report.tongjiMode") }}
                    </div>
                    <div class="col-100">
                        <a
                            @click="requestData.hourCountType = item.id"
                            v-for="(item, index) in statisticsList"
                            :key="index"
                            :class="
                                requestData.hourCountType == item.id
                                    ? 'active'
                                    : 'unActive'
                            "
                            class="button button-round font12"
                            >{{ item.name }}</a
                        >
                    </div>
                </div>
                <!-- 产品分类 -->
                <div class="row top20">
                    <div class="col-100 font14 fontWeight">
                        {{ $t("report.proCategory") }}
                    </div>
                    <div class="col-100">
                        <el-select
                            class="store-select top10"
                            v-model="requestData.dish_classify"
                            size="small"
                            style="border: 1px #d8d8d8 solid; width: 100%"
                        >
                            <el-option
                                v-for="item in dishTypeData"
                                :key="item.id"
                                :label="item.type_name"
                                :value="item.id"
                                @click.native="valueChange(item.type_name)"
                            ></el-option>
                        </el-select>
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
import echarts from "echarts";
export default {
    name: "TimeReport",
    components: {
        SelectStore: (resolve) =>require(["../components/SelectStore"], resolve),
        EmailPop: (resolve) => require(["../components/EmailPop"], resolve),
        GtoEmailPop: (resolve) =>require(["../components/GtoEmailPop"], resolve),
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
            file: null,
            propShow: false,
            morePage: false,
            GtopropShow: false,
            dep_ID: "",
            daySelect: 0,
            dateTabTits: [
                this.$t("report.today"),
                this.$t("report.yesterday"),
                this.$t("report.week"),
                this.$t("report.month"),
            ],
            yingyeSelect: 0,
            requestData: {
                dep_id: "", //门店id
                dish_classify: "", //菜品二级分类,可以不传，默认为全部 ,
                dish_classify_name: "", //分类名称
                end_time: 0, //统计结束时间，格式yyyyMMdd 今日为4 昨日为1，本周为2，本月为3，自定义就是yyyyMMdd格式 ,
                start_time: 0, //统计开始时间,格式yyyyMMdd 今日为4 昨日为1，本周为2，本月为3，自定义就是yyyyMMdd格式 ,
                date: "",
                hourCountType: "1", //统计方式 1:按小时 2: 按餐段
            },
            titleData: [
                {
                    sort: 0,
                    title: this.$t("report.orderShouru"),
                    key: "type_count",
                    contentText: this.$t("report.orderShouruCent"),
                    showImg: true,
                },
                {
                    sort: 0,
                    title: this.$t("report.orderCount"),
                    key: "order_num",
                },
            ],
            tableHoursTitle: this.$t("report.shidu"),//时段标题-餐段标题
            tableData: null,
            defaultData: null,
            mkt_flag: "",
            // 新版时间范围筛选
            isRestData:true,
            screenDataIndex:-1,
            dishTypeData: { type_name: this.$t("report.allType"), id: "" },
            statisticsList: [
                { name: this.$t("report.anhours"), id: 1 },
                { name: this.$t("report.ancanduan"), id: 2 },
            ],
            isCanduan:false,

            getTimeRange: "", //时间范围
            getOpenUpdateTime: "", //修改过的时间
        };
    },
    methods: {
        downloadClick() {
            this.propShow = true;
        },
        GtodownloadClick() {
            this.GtopropShow = true;
        },
        closeClick(val) {
            this.propShow = val;
        },
        GtocloseClick(val) {
            this.GtopropShow = val;
        },
        hourReport(email, isdefault) {
            let that = this;
            this.requestData.dep_id = this.currentStore.dep_ID; //门店id
            this.requestData.mail = email;
            this.requestData.isdefault = isdefault;
            this.request.hourReport(this.requestData, function (res) {
                if (res.code == "1") {
                    that.toast.success(that.$t("sendSuccess"));
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        //获取所有分类列表
        getAlltype() {
            let that = this;
            this.request.alltype(
                { dept_id: this.currentStore.dep_ID },
                function (res) {
                    if (res.code == "1") {
                        let list = [
                            { type_name: that.$t("report.allType"), id: "" },
                        ];
                        for (let i in res.data) {
                            for (let j in res.data[i].list) {
                                list.push(res.data[i].list[j]);
                            }
                        }
                        that.dishTypeData = list;
                    } else {
                        that.toast.fail(res.msg);
                    }
                }
            );
        },
        // 商场数据报表
        marketReport(email, isdefault, start_time) {
            let that = this;
            let data = {
                dep_id: this.currentStore.dep_ID,
                start_time: start_time,
                mail: email,
            };
            this.request.marketReport(data, function (res) {
                if (res.code == "1") {
                    that.toast.success(that.$t("sendSuccess"));
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        getDishSet() {
            let that = this;
            let data = { dept_id: this.currentStore.dep_ID };
            this.request.selectDishSet(data, function (res) {
                if (res.code == "1") {
                    that.mkt_flag = res.data.mkt_flag;
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        sendGtoEmailClick(email, isdefault, start_time) {
            this.marketReport(email, isdefault, start_time);
        },
        sendEmailClick(email, isdefault) {
            this.hourReport(email, isdefault);
        },

        // 快捷时间选择
        daySelectClick(val) {
            this.daySelect = val;
            this.requestData.start_time = val;
            this.requestData.end_time = val;
            this.screenDataIndex = -1;
            this.reportHour();
        },
        valueChange(val) {
            this.requestData.dish_classify_name = val;
        },
        // 筛选
        moreClick() {
            this.morePage = true;``
        },
        changeScreenClick(start,end,index,isRestData){
            this.screenDataIndex = index;
            this.requestData.start_time = this.moment(start).format("YYYYMMDD");
            this.requestData.end_time = this.moment(end).format("YYYYMMDD");
            this.isRestData = isRestData;
        },
        confirmClick() {
            if( this.isRestData == false){
                this.daySelect = -1;
            }
            if(this.screenDataIndex==-1){
                this.daySelect = 0;
                this.requestData.start_time = 0;
                this.requestData.end_time = 0;
            }
            if(this.requestData.hourCountType == 2){
                this.isCanduan = true;
                this.tableHoursTitle = this.$t("report.candu");
            }else{
                this.isCanduan = false;
                this.tableHoursTitle = this.$t("report.shidu");
            }
            this.morePage = false;
            this.reportHour();
        },
        // 重置
        resetClick() {
            this.screenDataIndex = -1;
            this.requestData.dish_classify = "";
            this.requestData.hourCountType = "1";
            this.requestData.dish_classify_name = "";
        },
        reportHour() {
            this.requestData.mail = "";
            let that = this;
            this.requestData.dep_id = this.currentStore.dep_ID; //门店id
            this.request.reporthour(this.requestData, function (res) {
                if (res.code == "1") {
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
                    //修改过的时间
                    if (res.data.open_update_time) {
                        let getOpenUpdateTime = that
                            .moment(res.data.open_update_time)
                            .format("MM/DD/YYYY");
                        that.getOpenUpdateTime = getOpenUpdateTime;
                    }
                    that.tableData = res.data.list;
                    that.yingyeSelectClick(0);
                    that.defaultData = that.stringutils.deepClone(
                        that.tableData.list
                    );
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        yingyeSelectClick(val) {
            this.yingyeSelect = val;
            this.yinyeData(val);
        },
        yinyeData(isNum) {
            var date = [];
            var data = [];
            for (let i in this.tableData) {
                date.push(this.tableData[i].hour);
                data.push(
                    isNum == 1
                        ? this.tableData[i].order_num
                        : this.stringutils.formatPrice(
                              this.tableData[i].type_count
                          )
                );
            }
            this.yinyefenxi(data, date);
        },
        yinyefenxi(data, date) {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(
                document.getElementById("myChart")
            );
            let that = this;
            // 绘制图表
            myChart.setOption({
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}： {c} ",
                },
                color: ["#30CFB7"],
                grid: {
                    top: "8%",
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
                        handleSize: "110%",
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
                        name:
                            this.yingyeSelect == 1
                                ? this.$t("report.ffff")
                                : this.$t("report.xiaoshoue"),
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
        
    },
    mounted() {},
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

        this.dep_ID = this.$route.query.dep_ID;
        this.currentStore.dep_ID = this.$route.query.dep_ID;
        this.requestData.mail = "";
    },
    watch: {
        currentStore: {
            handler(newVal, oldVal) {
                if (newVal != undefined && newVal != null) {
                    this.reportHour();
                    this.getDishSet();
                    this.getAlltype();
                }
            },
        },
        
    },
};
</script>
<style scoped>
</style>