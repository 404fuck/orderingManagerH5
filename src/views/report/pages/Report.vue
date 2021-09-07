<!--
 * @Author: zzt
 * @Date: 2021-04-06 14:27:34
 * @LastEditTime: 2021-07-01 15:37:13
 * @LastEditors: Please set LastEditors
 * @Description: 经营概览
 * @FilePath: \sjoyOrderingManagerH5\src\views\report\pages\Report.vue
-->
<template>
    <div class="main-layout reports">
        <div class="row">
            <div class="col-100">
                <div class="padding15 row no-gutter">
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
                    <!-- <div class="col-25 diancanS" v-show="$route.query.type == 0">
                    <el-select placeholder="请选择" v-model="requestData.delivery_flag" @change="valueChange">
                        <el-option
                            v-for="item in diancanType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </div> -->
                </div>
            </div>
            <div class="col-100">
                <div class="row dateSelect" style="padding: 0 15px">
                    <div class="col-100">
                        <a
                            class="button button-round font12"
                            v-for="(item, index) in dateTabTits"
                            :key="index"
                            :class="{ active: daySelect == index }"
                            @click="daySelectClick(index)"
                            >{{ item }}</a
                        >
                        <div class="moreScreen" @click="moreClick">
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

                <div class="row" style="padding: 0px 15px 15px">
                    <!-- 原价总额 -->
                    <reportCount
                        class="top15"
                        :title="$t('payreport.yuanjiaAmount')"
                        :titleText="titleText[titleSelect]"
                        :now="
                            overviewdata.now_dish_original_total_price | price
                        "
                        :befor="
                            overviewdata.dish_original_total_price_proportion ==
                            -1
                                ? '---'
                                : overviewdata.dish_original_total_price_proportion
                        "
                    ></reportCount>
                    <!-- 订单总额 -->
                    <reportCount
                        class="top15"
                        :title="$t('report.dingPrice')"
                        :titleText="titleText[titleSelect]"
                        :now="overviewdata.should_count_now | price"
                        :befor="
                            overviewdata.shoule_count_proportion == -1
                                ? '---'
                                : overviewdata.shoule_count_proportion
                        "
                    ></reportCount>
                    <!-- 挂账总额 -->
                    <reportCount
                        v-if="onAccount == '1'"
                        class="top15"
                        :title="$t('payreport.gzAmount')"
                        :titleText="titleText[titleSelect]"
                        :now="overviewdata.now_on_account_total_price | price"
                        :befor="
                            overviewdata.on_account_total_price_proportion == -1
                                ? '---'
                                : overviewdata.on_account_total_price_proportion
                        "
                    ></reportCount>
                    <!-- 实收总额 -->
                    <reportCount
                        class="top15"
                        :title="$t('report.priceCount')"
                        :contentText="$t('payreport.shishouTip')"
                        :showImg="true"
                        :titleText="titleText[titleSelect]"
                        :now="overviewdata.real_count_now | price"
                        :befor="
                            overviewdata.real_count_proportion == -1
                                ? '---'
                                : overviewdata.real_count_proportion
                        "
                    >
                    </reportCount>
                    <!-- 净收总额 -->
                    <reportCount
                        class="top15"
                        :title="$t('report.jingshou')"
                        :contentText="$t('payreport.jingshouTip')"
                        :showImg="true"
                        :titleText="titleText[titleSelect]"
                        :now="overviewdata.net_count_now | price"
                        :befor="
                            overviewdata.net_count_proportion == -1
                                ? '---'
                                : overviewdata.net_count_proportion
                        "
                    ></reportCount>
                    <!-- 订单总数 -->
                    <reportCount
                        class="top15"
                        :title="$t('report.dingCount')"
                        :contentText="$t('payreport.dingdanTip')"
                        :showImg="true"
                        :titleText="titleText[titleSelect]"
                        :now="overviewdata.order_num_now"
                        :befor="
                            overviewdata.order_num_proportion == -1
                                ? '---'
                                : overviewdata.order_num_proportion
                        "
                    ></reportCount>
                    <!-- 叫号取餐不显示"就餐人数"和“人均消费” -->
                    <!-- 就餐人数 -->
                    <reportCount
                        class="top15"
                        :style="
                            $store.getters.language == 'en_US'
                                ? 'height:120px'
                                : ''
                        "
                        :title="$t('waidaiMsg.avg')"
                        v-show="!orderMode"
                        :titleText="titleText[titleSelect]"
                        :now="overviewdata.person_num_now"
                        :befor="
                            overviewdata.person_num_proportion == -1
                                ? '---'
                                : overviewdata.person_num_proportion
                        "
                    ></reportCount>
                    <!-- 人均消费 -->
                    <reportCount
                        class="top15"
                        :style="
                            $store.getters.language == 'en_US'
                                ? 'height:120px'
                                : ''
                        "
                        :title="$t('report.avg')"
                        v-show="businessModel == '1'"
                        :titleText="titleText[titleSelect]"
                        :now="overviewdata.person_price_now"
                        :befor="
                            overviewdata.person_price_proportion == -1
                                ? '---'
                                : overviewdata.person_price_proportion
                        "
                    ></reportCount>
                </div>

                <div class="day-tab">
                    <div>
                        <div class="row">
                            <div class="col-50" style="padding: 0 12px">
                                <h4>{{ $t("report.fenxi") }}</h4>
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
                                        :class="{
                                            active: yingyeSelect == 0,
                                        }"
                                        >{{ $t("report.anPrice") }}</a
                                    >
                                    <a
                                        class="button button-round"
                                        @click="yingyeSelectClick(1)"
                                        :class="{
                                            active: yingyeSelect == 1,
                                        }"
                                        >{{ $t("report.anNum") }}</a
                                    >
                                </p>
                            </div>
                            <div class="col-100">
                                <div
                                    id="myChart"
                                    :style="{
                                        width: '97%',
                                        height: '300px',
                                    }"
                                ></div>
                            </div>
                        </div>
                        <div
                            class="row"
                            style="padding: 12px"
                            v-show="requestData.delivery_flag == 1"
                        >
                            <div class="col-50">
                                <h4>
                                    {{ $t("orderDetail.orderCome_") }}
                                </h4>
                            </div>
                            <div class="col-50 reportBtn">
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
                                        @click="dingdanSelectClick(0)"
                                        :class="{
                                            active: dingdanSelect == 0,
                                        }"
                                        >{{ $t("report.anPrice") }}</a
                                    >
                                    <a
                                        class="button button-round"
                                        @click="dingdanSelectClick(1)"
                                        :class="{
                                            active: dingdanSelect == 1,
                                        }"
                                        >{{ $t("report.anNum") }}</a
                                    >
                                </p>
                            </div>
                            <div class="col-100">
                                <div>
                                    <div
                                        id="myChart1"
                                        :style="{
                                            width: '97%',
                                            height: '300px',
                                        }"
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <hr
                            style="
                                background: #e6eaef;
                                border: none;
                                height: 1px;
                                margin: 0 15px 15px;
                            "
                        />
                        <div class="row padding15">
                            <div class="col-50">
                                <h4>{{ $t("report.shiduan") }}</h4>
                            </div>
                            <div class="col-50 reportBtn">
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
                                        @click="shiduanSelectClick(0)"
                                        :class="{
                                            active: shiduanSelect == 0,
                                        }"
                                        >{{ $t("report.anPrice") }}</a
                                    >
                                    <a
                                        class="button button-round"
                                        @click="shiduanSelectClick(1)"
                                        :class="{
                                            active: shiduanSelect == 1,
                                        }"
                                        >{{ $t("report.anNum") }}</a
                                    >
                                </p>
                            </div>
                            <div class="col-100">
                                <div
                                    id="myChart2"
                                    :style="{
                                        width: '100%',
                                        height: '300px',
                                    }"
                                ></div>
                            </div>
                        </div>
                        <hr
                            style="
                                background: #e6eaef;
                                border: none;
                                height: 1px;
                                margin: 0 15px 15px;
                            "
                        />
                        <div class="row padding15">
                            <div class="col-50">
                                <h4>{{ $t("report.pay") }}</h4>
                            </div>
                            <div class="col-50 reportBtn">
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
                                        @click="zhifuSelectClick(0)"
                                        :class="{
                                            active: zhifuSelect == 0,
                                        }"
                                        >{{ $t("report.anPrice") }}</a
                                    >
                                    <a
                                        class="button button-round"
                                        @click="zhifuSelectClick(1)"
                                        :class="{
                                            active: zhifuSelect == 1,
                                        }"
                                        >{{ $t("report.anNum") }}</a
                                    >
                                </p>
                            </div>
                            <div class="col-100">
                                <div
                                    id="myChart3"
                                    :style="{
                                        width: '100%',
                                        height: '300px',
                                    }"
                                ></div>
                            </div>
                        </div>
                        <hr
                            style="
                                background: #e6eaef;
                                border: none;
                                height: 1px;
                                margin: 0 15px 15px;
                            "
                        />
                        <div class="row">
                            <div class="col-100 top10" style="padding: 0 15px">
                                <h4>{{ $t("report.tpp10") }}</h4>
                            </div>
                            <div class="col-100">
                                <div class="data-table font10 border">
                                    <table
                                        class="storeTable"
                                    >
                                        <thead>
                                            <tr>
                                                <th
                                                    class="numeric-cell fontWeight"
                                                >
                                                    {{ $t("report.ranking") }}
                                                </th>
                                                <th class="numeric-cell">
                                                    {{
                                                        $t(
                                                            "accountsDetail.dishName"
                                                        )
                                                    }}
                                                </th>
                                                <th class="numeric-cell">
                                                    {{ $t("report.special") }}
                                                </th>
                                                <th class="numeric-cell">
                                                    {{
                                                        $t(
                                                            "report.xiaoshouCount"
                                                        )
                                                    }}
                                                </th>
                                                <th class="numeric-cell">
                                                    {{ $t("report.xiaoshoue") }}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr
                                                v-for="(
                                                    item, index
                                                ) in dishrank"
                                                :key="index"
                                            >
                                                <td class="numeric-cell">
                                                    {{ index + 1 }}
                                                </td>
                                                <td
                                                    class="numeric-cell"
                                                    style="
                                                        word-wrap: break-word !important;
                                                    "
                                                >
                                                    {{ item.dish_name }}
                                                </td>
                                                <td class="numeric-cell">
                                                    <span
                                                        v-if="
                                                            item.spec_name == ''
                                                        "
                                                        >--</span
                                                    >
                                                    <span v-else>{{
                                                        item.spec_name
                                                    }}</span>
                                                </td>
                                                <td class="numeric-cell">
                                                    {{ item.dish_num }}
                                                </td>
                                                <td class="numeric-cell">
                                                    {{
                                                        item.dish_count | price
                                                    }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- 暂无数据 -->
                                    <div
                                        class="noData-warp"
                                        v-if="
                                            dishrank == null ||
                                            dishrank.length == 0
                                        "
                                    >
                                        <span>{{ $t("noData") }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div
                class="col-100 font12 center"
                style="margin-bottom: 10px; color: #909399"
            >
                {{ $t("report.bottom") }}
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
        <van-dialog
            v-model="showshiduan"
            confirmButtonColor="#FE813C"
            :confirmButtonText="this.$t('Confirm')"
            @confirm="confirmClickPop"
        >
            <div class="row">
                <div
                    class="col-100 font14"
                    v-if="$store.getters.language == 'zh_CN'"
                    style="margin: 20px 12px 12px 17px"
                >
                    营业时间于{{ openUpdate }}被修改过，
                    【时段分析】仅展示此后的数据 汇总！
                </div>
                <div
                    class="col-100 font14"
                    style="margin: 20px 12px 12px 17px"
                    v-else
                >
                    The summary data in【Duration analysis】only begins from
                    {{ openUpdate }} when business hour changed.
                </div>
                <div class="col-100 center" style="margin-bottom: 12px">
                    <el-checkbox
                        name="a"
                        @change="promptClick"
                        v-model="promptCheck"
                    >
                        <span>{{ $t("noAgain") }}</span>
                    </el-checkbox>
                </div>
            </div>
        </van-dialog>
        <!-- 抽屉筛选框 -->
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
                        :isStyleBlock='true'
                        :startDate="getStart"
                        :endDate="getEnd"
                        :isPropDate='true'
                    ></ScreenData>
                </div>
                <!-- 就餐类型 -->
                <div class="row top20">
                    <div class="col-100 font14 fontWeight">
                        {{ $t("orderDetail.eatType_") }}
                    </div>
                    <div class="col-100">
                        <span
                            class="button button-round font12 top10"
                            @click="requestData.delivery_flag = item.id"
                            :class="
                                requestData.delivery_flag == item.id
                                    ? 'active'
                                    : 'unActive'
                            "
                            v-for="(item, index) in eatTypeTits"
                            :key="index"
                            >{{ item.name }}</span
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
    name: "Report",
    components: {
        SelectStore: (resolve) =>require(["../components/SelectStore"], resolve),
        EmailPop: (resolve) => require(["../components/EmailPop"], resolve),
        reportCount: (resolve) => require(["../components/reportCount"], resolve),
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
                dep_id: "-1", //门店id
                end_time: 0, //统计结束时间，格式YYYYMMDD 今日为4 昨日为1，本周为2，本月为3，自定义就是YYYYMMDD格式 ,
                start_time: 0, //统计开始时间,格式YYYYMMDD 今日为4 昨日为1，本周为2，本月为3，自定义就是YYYYMMDD格式 ,
                date: "",
                dish_classify: 0,
                delivery_flag: 1, //0为全部，1为堂食，2为外卖"
            },

            diancanType: [
                {
                    value: 1,
                    label: this.$t("orderDetail.tangshi"),
                },
                {
                    value: 2,
                    label: this.$t("orderDetail.waimai"),
                },
            ],
            overviewdata: {},
            orderSource: {},
            timecount: {
                daily_count: [], //每日的销售金额统计
                daily_num: [], //每日的销售数量统计 ,
            },
            paycount: {},
            dishrank: [],
            periodAnalysis: [], //时段分析
            yinyeShows: 1,
            orderMode: false,
            businessModel: "",
            selectShow: false,
            openUpdate: "",
            showshiduan: false,
            promptCheck: false,
            promptTip: "",
            echColorList:["#EB3C1C","#2082ED","#F46F24","#F52C79","#F7B500","#E4C269","#6DD2D2","#64D274"],  //echart
            onAccount: "", //挂账消费开关

            //抽屉筛选条件
            morePage: false,
            // 新版时间范围筛选
            isRestData:true,
            screenDataIndex:-1,
            eatTypeTits: [
                { name: this.$t("orderDetail.tangshi")+'/'+this.$t("orderDetail.waidai"), id: 1 },
                { name: this.$t("orderDetail.waimai"), id: 2 },
            ],
            getTimeRange: "", //时间范围

            getStart:null,
            getEnd:null,
        };
    },
    methods: {
        // 下载报表
        dailysale(email, isdefault) {
            let that = this;
            this.requestData.dep_id = this.currentStore.dep_ID; //门店id
            this.requestData.mail = email;
            this.requestData.isdefault = isdefault;
            this.request.dailysale(this.requestData, function (res) {
                if (res.code == "1") {
                    that.toast.success(that.$t("sendSuccess"));
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        sendEmailClick(email, isdefault) {
            this.dailysale(email, isdefault);
        },
        downloadCLick() {
            this.propShow = true;
        },
        closeClick(val) {
            this.propShow = val;
        },
        // 快捷时间选择
        daySelectClick(val) {
            this.daySelect = val;
            this.titleSelect = this.daySelect;
            this.requestData.start_time = val;
            this.requestData.end_time = val;
            this.screenDataIndex = -1;
            this.managedata();
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
            this.managedata();
            this.morePage = false;
        },
        resetClick() {
            this.requestData.delivery_flag = 1;
            this.screenDataIndex = -1;
        },
        
        updateViewTooltip() {
            let that = this;
            let data = { dep_id: this.currentStore.dep_ID };
            this.request.updateViewTooltip(data, function (res) {
                if (res.code == "1") {
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        promptClick() {
            if (this.promptCheck) {
                this.updateViewTooltip();
            } else {
            }
        },
        confirmClickPop() {
            this.promptCheck = false;
        },
        valueChange() {
            this.$emit("valueChange", this.requestData.delivery_flag);
            this.getRedisDeptConfigInfo();
            this.managedata();
        },
        getDishSet() {
            let that = this;
            let data = { dept_id: this.currentStore.dep_ID };
            this.request.selectDishSet(data, function (res) {
                if (res.code == "1") {
                    const s = new Date();
                    that.businessModel = res.data.business_model;
                    if (res.data.business_model == "0") {
                        that.orderMode = true;
                    } else {
                        that.orderMode = false;
                    }
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        getRedisDeptConfigInfo() {
            let that = this;
            let data = {
                company_id: this.currentStore.faher_ID,
                dept_id: this.currentStore.dep_ID,
            };
            this.request.getRedisDeptConfigInfo(data, function (res) {
                if (res.code == "1") {
                    that.openUpdate = res.data.open_update_time;
                    that.promptTip = res.data.view_tooltip;
                    that.onAccount = res.data.on_account;
                }
            });
        },
        numFilter(value) {
            const realVal = parseFloat(value).toFixed(2);
            return realVal;
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
                for (var i in that.timecount.daily_num) {
                    date.push(i);
                    data.push(that.timecount.daily_num[i]);
                }
                that.yinyefenxi(data, date);
            } else {
                for (var i in that.timecount.daily_count) {
                    date.push(i);
                    data.push(
                        that.stringutils.formatPrice(
                            that.timecount.daily_count[i]
                        )
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
                title: {
                    subtext: this.$t("report.eee"),
                    left: "10",
                },
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
                        splitNumber: 10,
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
                            this.yinyeShows == 1
                                ? this.$t("report.xiaoshoue1")
                                : this.$t("report.ffff"),
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
        dingdanSelectClick(isNum) {
            this.dingdanSelect = isNum;
            let that = this;
            var date = [
                {
                    value:
                        isNum == 1
                            ? that.orderSource.consumer_num
                            : that.stringutils.formatPrice(
                                  that.orderSource.consumer_count
                              ),
                    name: this.$t("report.saoma"),
                },
                {
                    value:
                        isNum == 1
                            ? that.orderSource.waiter_num
                            : that.stringutils.formatPrice(
                                  that.orderSource.waiter_count
                              ),
                    name: this.$t("report.fuwuyuan"),
                },
            ];
            that.dingdan(
                date,
                isNum == 1 ? this.$t("report.danshu") : this.$t("report.price"),
                isNum == 1 ? "" : ""
            );
        },
        dingdan(data, unitTile, unit) {
            let myChart1 = this.$echarts.init(
                document.getElementById("myChart1")
            );
            myChart1.setOption({
                tooltip: {
                    trigger: "item",
                    position: "inside",
                    formatter: "{a} <br/>{b} : {c} ({d}%)",
                },
                color: ["#2082ED", "#FE813C"],
                legend: {
                    top: "20",
                    left: "left",
                    data: data,
                },
                series: [
                    {
                        //显示指示线
                        name: unitTile,
                        type: "pie",
                        radius: "55%", //饼图的半径大小
                        center: ["50%", "55%"], //饼图的位置
                        data: data,
                        itemStyle: {
                            normal: {
                                //指示线上的文本显示
                                label: {
                                    show: true,
                                    position: "",
                                    formatter: "{c} " + unit, //数值
                                    textStyle: {
                                        fontSize: 12,
                                        color: "#303336",
                                        fontWeight: "bolder",
                                    },
                                },
                                labelLine: {
                                    show: true,
                                },
                            },
                        },
                    },
                    {
                        name: unitTile,
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "55%"],
                        data: data,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    formatter: "{d}%" + unit,
                                    position: "inner",
                                    textStyle: {
                                        fontWeight: 300,
                                        fontSize: 12, //文字的字体大小
                                    },
                                },
                                labelLine: { show: true },
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)",
                            },
                        },
                    },
                ],
            });
        },
        shiduanSelectClick(isNum) {
            this.shiduanSelect = isNum;
            let date = [];
            for (let i in this.periodAnalysis) {
                if (this.periodAnalysis[i].open_time_id != 0) {
                    date.push({
                        value:
                            isNum == 1
                                ? this.periodAnalysis[i].open_time_num
                                : this.stringutils.formatPrice(
                                      this.periodAnalysis[i].open_time_count
                                  ),
                        name:
                            this.periodAnalysis[i].open_time_name == ""
                                ? "   "
                                : this.periodAnalysis[i].open_time_name,
                    });
                }
            }
            this.drawShiduanPie(
                date,
                isNum == 1 ? this.$t("report.danshu") : this.$t("report.price"),
                isNum == 1 ? "" : ""
            );
        },
        drawShiduanPie(data, unitTile, unit) {
            let myChart2 = this.$echarts.init(
                document.getElementById("myChart2")
            );
            myChart2.setOption({
                tooltip: {
                    trigger: "item",
                    position: "inside",
                    formatter: "{a} <br/>{b} : {c} ({d}%)",
                },
                color: this.echColorList,
                legend: {
                    top: "20",
                    left: "left",
                    data: data,
                    // selectedMode:false,//取消图例的点击事件
                },
                series: [
                    {
                        //显示指示线
                        name: unitTile,
                        type: "pie",
                        radius: "55%", //饼图的半径大小
                        center: ["50%", "60%"], //饼图的位置
                        data: data,
                        itemStyle: {
                            normal: {
                                //指示线上的文本显示
                                label: {
                                    show: true,
                                    position: "",
                                    formatter: "{c} " + unit, //数值
                                    textStyle: {
                                        fontSize: 12,
                                        color: "#303336",
                                        fontWeight: "bolder",
                                    },
                                },
                                labelLine: {
                                    show: true,
                                },
                            },
                        },
                    },
                    {
                        name: unitTile,
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "60%"],
                        data: data,

                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    formatter: "{d}%",
                                    position: "inner",
                                    textStyle: {
                                        fontWeight: 300,
                                        fontSize: 12, //文字的字体大小
                                    },
                                },
                                labelLine: { show: true },
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)",
                            },
                        },
                    },
                ],
            });
        },
        zhifuSelectClick(isNum) {
            this.zhifuSelect = isNum;
            let date = [];
            for (let i in this.paycount.list) {
                date.push({
                    value:
                        isNum == 1
                            ? this.paycount.list[i].num
                            : this.stringutils.formatPrice(
                                  this.paycount.list[i].count
                              ),
                    name: this.paycount.list[i].name,
                });
            }

            this.drawZhifu(
                date,
                isNum == 1 ? this.$t("report.danshu") : this.$t("report.price"),
                isNum == 1 ? "" : ""
            );
        },
        drawZhifu(data, unitTile, unit) {
            let myChart3 = this.$echarts.init(
                document.getElementById("myChart3")
            );
            myChart3.setOption({
                tooltip: {
                    trigger: "item",
                    position: "inside",
                    formatter: "{a} <br/>{b} : {c} ({d}%)",
                },
                color: this.echColorList,
                legend: {
                    left: "left",
                    // top: "20",
                    data: data,
                },
                series: [
                    {
                        //显示指示线
                        name: unitTile,
                        type: "pie",
                        radius: "55%", //饼图的半径大小
                        center: ["50%", "70%"], //饼图的位置
                        top: "80",
                        data: data,
                        itemStyle: {
                            normal: {
                                //指示线上的文本显示
                                label: {
                                    show: true,
                                    position: "",
                                    formatter: "{c} " + unit, //数值
                                    textStyle: {
                                        fontSize: 12,
                                        color: "#303336",
                                        fontWeight: "bolder",
                                    },
                                },
                                labelLine: {
                                    show: true,
                                },
                            },
                        },
                    },
                    {
                        name: unitTile,
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "70%"],
                        top: "80",
                        data: data,

                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    formatter: "{d}%",
                                    position: "inner",
                                    textStyle: {
                                        fontWeight: 300,
                                        fontSize: 12, //文字的字体大小
                                    },
                                },
                                labelLine: { show: true },
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)",
                            },
                        },
                    },
                ],
            });
        },
        //经营概览接口
        managedata() {
            let that = this;
            this.requestData.mail = "";
            this.requestData.dep_id = this.currentStore.dep_ID; //门店id
            this.request.managedata(this.requestData, function (res) {
                if (res.code == "1") {
                    if (res.data == null) {
                        return;
                    }
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
                    let res_data = res.data;
                    that.timecount = {};
                    that.paycount = {};
                    that.overviewdata = {};
                    that.dishrank = [];
                    that.periodAnalysis = []; //时段分析

                    that.overviewdata = res_data.dataCountRes;
                    that.orderSource = res_data.orderSourceRes;
                    that.timecount = res_data.timeAnalysis;
                    that.paycount = res_data.payTypeRes;
                    that.dishrank = res_data.list;
                    that.periodAnalysis = res_data.timeAnalysis.timeCountMap;
                    that.yingyeSelectClick(0);
                    that.dingdanSelectClick(0);
                    that.zhifuSelectClick(0);
                    that.shiduanSelectClick(0);
                    var CurrentTime = new Date();
                    var year = CurrentTime.getFullYear();
                    var month = CurrentTime.getMonth() + 1;
                    var day = CurrentTime.getDate();
                    var hours = CurrentTime.getHours();
                    var minutes = CurrentTime.getMinutes();
                    var seconds = CurrentTime.getSeconds();
                    CurrentTime =
                        year +
                        "-" +
                        month +
                        "-" +
                        day +
                        "-" +
                        hours +
                        ":" +
                        minutes +
                        ":" +
                        seconds;
                    if (that.daySelect != 0) {
                        if (that.openUpdate <= CurrentTime) {
                            if (that.promptTip == "1") {
                                that.showshiduan = true;
                            }
                        }
                        that.openUpdate = that.openUpdate.substr(0, 10);
                    }
                } else {
                    that.toast.fail(res.msg);
                }
            });
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
        // 路由传过来的值
        let queryStart = this.$route.query.start;
        let queryEnd = this.$route.query.end;
        if(queryEnd&&queryEnd){
            if(queryStart!=""&&queryEnd!=""){
                this.daySelect = -1;
                this.screenDataIndex = 3;
                this.requestData.start_time = this.moment(queryStart).format("YYYYMMDD");
                this.requestData.end_time = this.moment(queryEnd).format("YYYYMMDD");
                this.getStart = this.moment(queryStart).format("YYYYMMDD");
                this.getEnd = this.moment(queryEnd).format("YYYYMMDD");

            }

        }
        
    },
    mounted() {},
    watch: {
        currentStore: {
            handler(newVal, oldVal) {
                if (newVal != undefined && newVal != null) {
                    this.getDishSet();
                    this.getRedisDeptConfigInfo();
                    this.managedata();
                }
            },
        },
    },
};
</script>
<style scoped>
</style>