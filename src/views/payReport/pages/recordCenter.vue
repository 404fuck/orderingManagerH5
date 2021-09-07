<template>
    <review-container>
        <view-header slot="header">
            <div slot="head-label" class="row">
                <div class="header-select col-25">
                    <select-store :dep_ID="dep_ID"></select-store>
                </div>
                <div class="header-select col-25">
                    <el-select
                        :placeholder="$t('orderDetail.select')"
                        v-model="requestData.delivery_flag"
                        @change="valueChange"
                    >
                        <el-option
                            v-for="item in diancanType"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                            selected="selected"
                        ></el-option>
                    </el-select>
                </div>
                <div class="header-download col-50" @click="downDialog = true">
                    {{ $t("payreport.downReport") }}
                </div>
            </div>
        </view-header>
        <view-content slot="content">
            <div slot="cont-label" class="row">
                <div class="col-80 button-list">
                    <span
                        @click="daySelectClick(0)"
                        :class="{ active: daySelect == 0 }"
                        >{{ $t("payreport.today") }}</span
                    >
                    <span
                        @click="daySelectClick(1)"
                        :class="{ active: daySelect == 1 }"
                        >{{ $t("payreport.yesterday") }}</span
                    >
                    <span
                        @click="daySelectClick(2)"
                        :class="{ active: daySelect == 2 }"
                        >{{ $t("payreport.week") }}</span
                    >
                    <span
                        @click="daySelectClick(3)"
                        :class="{ active: daySelect == 3 }"
                        >{{ $t("payreport.month") }}</span
                    >
                    <span
                        @click="daySelectClick(4)"
                        :class="{ active: daySelect == 4 }"
                        >{{ $t("payreport.diyDay") }}</span
                    >
                </div>
                <div class="col-20">
                    <div class="content-filtrate top5" @click="drawer = true">
                        {{ $t("payreport.select") }}
                    </div>
                </div>
                <div class="col-100 top18" v-show="daySelect == 4">
                    <selectData
                        @confirmDataClick="confirmDataClick"
                    ></selectData>
                </div>
            </div>
            <div slot="table" class="data-table">
                <table>
                    <thead>
                        <tr>
                            <th
                                v-for="(item, index) in tableTitleData"
                                :key="index"
                            >
                                {{ item }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in filltableData" :key="index">
                            <td>{{ item.cur_time | DMY }}</td>
                            <td>{{ item.order_id | text}}</td>
                            <td>{{ item.order_source | text}}</td>
                            <td>{{ item.payTypeName | text }}</td>
                            <td>{{ item.amount | price }}</td>
                            <td>{{ item.refund_amount | price }}</td>
                            <td>{{ item.brokerage | price }}</td>
                        </tr>
                    </tbody>
                </table>
                <!-- 暂无数据 -->
                <div class="noData-warp"  v-if="filltableData==null||filltableData.length==0">
                    <span>{{$t('noData')}}</span>
                </div>
                <div class="col-100 center">
                    <el-pagination
                        v-if="currentPage.total!=0"
                        class="page-pagination center"
                        layout="prev, pager, next,sizes"
                        :total="currentPage.total"
                        :pager-count="3"
                        :page-size="currentPage.size"
                        :current-page="currentPage.page"
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange"
                        :page-sizes="[10,20,30,50]"
                    ></el-pagination>
                </div>
            </div>
        </view-content>
        <view-model slot="model">
            <!-- 筛选抽屉 -->
            <el-drawer
                solt="model"
                :size="drawer_width"
                :visible.sync="drawer"
                :with-header="false"
            >
                <filtrate-view>
                    <filtrate-content slot="filtrate-content">
                        <filtrate-input
                            v-model="filtrateinputData"
                            :placeholder="$t('payreport.writePay')"
                            :label="$t('payreport.payAmount') + '：'"
                        ></filtrate-input>
                        <filtrate-button
                            :label="$t('payreport.jiaoyiType') + '：'"
                        >
                            <div slot="content-btn">
                                <span
                                    @click="btnSelect1(index)"
                                    v-for="(item, index) in filtratebtnData1"
                                    :key="index"
                                    :class="
                                        activeIndex1 == index ? 'active' : ''
                                    "
                                    >{{ item.label }}</span
                                >
                            </div>
                        </filtrate-button>
                        <filtrate-button :label="$t('payreport.orderCount')+'：'">
                            <div slot="content-btn">
                                <span
                                    @click="btnSelect3(index)"
                                    v-for="(
                                        item, index
                                    ) in filtratebtnOrderData"
                                    :key="index"
                                    :class="
                                        activeIndex3 == index ? 'active' : ''
                                    "
                                    >{{ item.label }}</span
                                >
                            </div>
                        </filtrate-button>
                        <filtrate-button
                            :label="$t('payreport.payType') + '：'"
                        >
                            <div slot="content-btn">
                                <span
                                    @click="btnSelect2(index)"
                                    v-for="(item, index) in filtratebtnData2"
                                    :key="index"
                                    :class="
                                        activeIndex2 == index ? 'active' : ''
                                    "
                                    >{{ item.dict }}</span
                                >
                            </div>
                        </filtrate-button>
                    </filtrate-content>
                    <filtrate-footer slot="filtrate-footer">
                        <div slot="reset" @click="resetClick">
                            {{ $t("payreport.reset") }}
                        </div>
                        <div slot="sure" @click="sureClick">
                            {{ $t("payreport.confirm") }}
                        </div>
                    </filtrate-footer>
                </filtrate-view>
            </el-drawer>
            <!-- 下载报表弹出层 -->
            <el-dialog
                solt="model"
                class="downDialog"
                :visible.sync="downDialog"
                :width="downDialog_width"
                :close-on-click-modal="false"
            >
                <email-view>
                    <email-content slot="email-content">
                        <email-input v-model="emailinputData"></email-input>
                        <email-checkbox
                            v-model="emailcheckboxData"
                        ></email-checkbox>
                    </email-content>
                    <email-footer slot="email-footer">
                        <div slot="cancel" @click="cancelClick">
                            {{ $t("payreport.cancel") }}
                        </div>
                        <div slot="send" @click="sendClick">
                            {{ $t("payreport.send") }}
                        </div>
                    </email-footer>
                </email-view>
            </el-dialog>
        </view-model>
    </review-container>
</template>

<script>
export default {
    name: "recordCenter",
    components: {
        reviewContainer: (resolve) =>
            require([
                "../../components/reviewContainer/reviewContainer",
            ], resolve),
        viewHeader: (resolve) =>
            require([
                "../../components/reviewContainer/pageView/viewHeader",
            ], resolve),
        viewContent: (resolve) =>
            require([
                "../../components/reviewContainer/pageView/viewContent",
            ], resolve),
        viewModel: (resolve) =>
            require([
                "../../components/reviewContainer/pageView/viewModel",
            ], resolve),
        filtrateView: (resolve) =>
            require([
                "../../components/filtrateDrawer/filtrateView/filtrateView",
            ], resolve),
        filtrateContent: (resolve) =>
            require([
                "../../components/filtrateDrawer/filtrateView/filtratePage/filtrateContent",
            ], resolve),
        filtrateFooter: (resolve) =>
            require([
                "../../components/filtrateDrawer/filtrateView/filtratePage/filtrateFooter",
            ], resolve),
        filtrateInput: (resolve) =>
            require([
                "../../components/filtrateDrawer/filtrateComponents/filtrateInput",
            ], resolve),
        filtrateButton: (resolve) =>
            require([
                "../../components/filtrateDrawer/filtrateComponents/filtrateButton",
            ], resolve),
        emailView: (resolve) =>
            require(["../../components/emailPop/emailView/emailView"], resolve),
        emailContent: (resolve) =>
            require([
                "../../components/emailPop/emailView/emailPage/emailContent",
            ], resolve),
        emailFooter: (resolve) =>
            require([
                "../../components/emailPop/emailView/emailPage/emailFooter",
            ], resolve),
        emailCheckbox: (resolve) =>
            require([
                "../../components/emailPop/emailComponents/emailCheckbox",
            ], resolve),
        emailInput: (resolve) =>
            require([
                "../../components/emailPop/emailComponents/emailInput",
            ], resolve),
        selectData: (resolve) => require(["../components/selectData"], resolve),
        selectStore: (resolve) =>
            require(["../components/selectStore"], resolve),
    },
    computed: {
        currentStore() {
            return this.$store.getters.currentStore;
        },
        language(){
            return this.$store.getters.language;
        },
    },
    data() {
        return {
            //门店选择
            dep_ID: -1,
            //时间筛选
            daySelect: 0,
            //抽屉筛选
            filtrateinputData: "",
            filtratebtnData1: [
                { label: this.$t("payreport.all"), value: "" },
                { label: this.$t("payreport.paid"), value: "0" },
                { label: this.$t("payreport.refund"), value: "1" },
            ],
            filtratebtnData2: [],//扫码收款
            filtratebtnOrderData: [
                { label: this.$t("payreport.all"), value: "" },
                { label: this.$t("payreport.waiterApp"), value: "0" },
                { label: this.$t("payreport.qrOrder"), value: "1" },
                { label: this.$t("payreport.delivery"), value: "2" },
            ],
            activeIndex1: -1,
            activeIndex2: -1,
            activeIndex3: -1,
            StoredValue1: "",
            StoredValue2: "",
            StoredValue3: "",
            drawer: false,
            drawer_width: "420",
            //弹出窗下载报表
            emailcheckboxData: false,
            emailinputData: "",
            downDialog: false,
            downDialog_width: "80%",
            // table
            tableTitleData: [
                this.$t("payreport.jiaoyiTime"),
                this.$t("payreport.orderNo"),
                this.$t("payreport.orderCount"),
                this.$t("payreport.payment"),
                this.$t("payreport.shishouAmount"),
                this.$t("payreport.refundAmount"),
                this.$t("payreport.jinshou"),
            ],
            requestData: {
                page_num: 0,
                page_size: 10,
                dep_id: "-1",
                begin_date: "",
                end_date: "",
                order_id: "",
                ex_type: "",
                pay_type: "",
                pay_account: "",
                token: "",
                email: "",
                report_type: null,
                delivery_flag: 0,
            },
            jiucanType: 0,
            diancanType: [
                {
                    value: 0,
                    name: this.$t("orderDetail.tangshi"),
                },
                {
                    value: 1,
                    name: this.$t("orderDetail.waimai"),
                },
            ],
            filltableData: [], //填充表格内数据
            
            //分页
            currentPage: {
                total: 0,
                page: 1,
                size: 10,
            },
        };
    },
    methods: {
        valueChange(value) {
            this.requestData.delivery_flag = value;
            this.getRecPages();
        },
        /*
          ---接口数据处理---
         */
        //名店对账中心表格
        getRecPages() {
            if(this.filtratebtnData2.length==0){
                this.getPayType();
            }
            let that = this;
            this.requestData.dep_id = this.currentStore.dep_ID; //传入dep_id
            this.requestData.page_num = this.currentPage.page - 1; //传入当前页
            this.requestData.page_size = this.currentPage.size; //传入每页展示数据条数
            this.requestData.pay_account = this.filtrateinputData; //传入付款账户
            this.requestData.ex_type = this.StoredValue1; //传入交易类型
            this.requestData.pay_type = this.StoredValue2; //传入支付类型
            this.requestData.order_souce = this.StoredValue3; //传入订单来源
            this.request.getRecPages(this.requestData, function (res) {
                if (res.code == "1") {
                    if (res.data == null) {
                        return;
                    }
                    let req_data = res.data;
                    let tableList = req_data.list;
                    that.currentPage.total = req_data.total;
                    if(that.filtratebtnData2.length!=0){
                        tableList.forEach(items => {
                            that.filtratebtnData2.forEach(item => {
                                if(items.pay_type == item.id){
                                    items.payTypeName = item.dict;
                                }
                                
                            });
                        });
                        that.filltableData = tableList;
                        console.log(that.filltableData);
                    }
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        //收款方式
        getPayType(){
            let that = this;
            this.request.getPayType({}, function (res) {
                if (res.code == "1") {
                    let res_data = res.data[that.language];
                    //取出扫码收款
                    res_data.map(item=>{
                        if(item.id=="45"){
                            that.filtratebtnData2 = item.e_wallet;
                        }
                        return false;
                    })
                    console.log(that.filtratebtnData2);
                } else {
                    that.toast.fail(res.msg);
                }

            })
        },
        //设置默认邮箱
        emailstorages() {
            this.emailinputData = localStorage.getItem("email");
            if (localStorage.getItem("ischecked")) {
                this.emailcheckboxData = true;
            }
        },
        //下载报表
        download() {
            let that = this;
            this.requestData.report_type = "1";
            this.requestData.email = this.emailinputData; //传入email
            this.request.download(this.requestData, function (res) {
                if (res.code == "1") {
                    return;
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        /*
          ---下载报表 弹出窗---
         */
        cancelClick() {
            this.downDialog = false;
        },
        sendClick() {
            if (this.emailinputData === "") {
                this.emailcheckboxData = false;
                return;
            }
            if (this.emailcheckboxData === true) {
                localStorage.setItem("email", this.emailinputData);
                localStorage.setItem("ischecked", this.emailcheckboxData);
            } else {
                localStorage.removeItem("email");
                localStorage.removeItem("ischecked");
            }

            this.download();
            this.downDialog = false;
        },
        //分页初始化
        initPagination() {
            this.indentCurPage = 1;
            this.currentPage.page = 1;
        },
        // 分页
        handleCurrentChange(page) {
            this.currentPage.page = page;
            this.getRecPages();
        },
        handleSizeChange(size) {
            //当分页不在第一页时，切换每页显示条数 使得page返回参数为1
            this.currentPage.page = 1;
            this.currentPage.size = size;
            this.getRecPages();
        },
        /*
          ---自定义 时间选择 表格筛选---
         */
        // 今日
        getToday() {
            this.requestData.begin_date = this.moment(
                this.moment().startOf("day").valueOf()
            ).format("YYYY-MM-DD");
            this.requestData.end_date = this.moment(
                this.moment().valueOf()
            ).format("YYYY-MM-DD");
        },
        // 获取昨日的开始结束时间
        getYesterday() {
            this.requestData.begin_date = this.moment(
                this.moment().add(-1, "days").startOf("day").valueOf()
            ).format("YYYY-MM-DD");
            this.requestData.end_date = this.moment(
                this.moment().add(-1, "days").endOf("day").valueOf()
            ).format("YYYY-MM-DD");
        },
        // 获取当前周的开始结束时间
        getCurrWeekDays() {
            this.requestData.begin_date = this.moment(
                this.moment()
                    .week(this.moment().week())
                    .startOf("week")
                    .add(1, "days")
                    .valueOf()
            ).format("YYYY-MM-DD");
            this.requestData.end_date = this.moment(
                this.moment()
                    .week(this.moment().week())
                    .endOf("week")
                    .add(1, "days")
                    .valueOf()
            ).format("YYYY-MM-DD");
        },
        // 获取当前月的开始结束时间
        getCurrMonthDays() {
            this.requestData.begin_date = this.moment(
                this.moment()
                    .month(this.moment().month())
                    .startOf("month")
                    .valueOf()
            ).format("YYYY-MM-DD");
            this.requestData.end_date = this.moment(
                this.moment()
                    .month(this.moment().month())
                    .endOf("month")
                    .valueOf()
            ).format("YYYY-MM-DD");
        },
        // 自定义
        confirmDataClick(start, end) {
            this.initPagination(); //分页初始化
            this.requestData.begin_date = this.moment(start).format(
                "YYYY-MM-DD"
            );
            this.requestData.end_date = this.moment(end).format("YYYY-MM-DD");
            this.getRecPages();
        },
        daySelectClick(val) { 
            this.daySelect = val;
            if (val == 4) {
                return false;
            }
            switch (this.daySelect) {
                case 0:
                    this.getToday();
                    break;
                case 1:
                    this.getYesterday();
                    break;
                case 2:
                    this.getCurrWeekDays();
                    break;
                case 3:
                    this.getCurrMonthDays();
                    break;
                default:
                    this.getToday();
                    break;
            }
            this.initPagination();
            this.getRecPages();
        },
        
        /*
          ---抽屉 按钮选择---
         */
        //交易类型
        btnSelect1(index) {
            this.activeIndex1 = index;
            let valueBtn = this.filtratebtnData1[index].value;
            this.StoredValue1 = valueBtn;
        },
        btnSelect2(index) {
            this.activeIndex2 = index;
            let valueBtn = this.filtratebtnData2[index].id;
            this.StoredValue2 = valueBtn;
        },
        btnSelect3(index) {
            this.activeIndex3 = index;
            let valueBtn = this.filtratebtnOrderData[index].value;
            this.StoredValue3 = valueBtn;
        },

        /*
          ---表格筛选 抽屉---
         */

        drawerClear() {
            this.filtrateinputData = "";
            this.StoredValue1 = "";
            this.StoredValue2 = "";
            this.StoredValue3 = "";
            this.activeIndex1 = "-1";
            this.activeIndex2 = "-1";
            this.activeIndex3 = "-1";
        },
        //重置
        resetClick() {
            this.drawerClear();
        },
        //确定提交
        sureClick() {
            let finpData = this.filtrateinputData;
            let finpValue1 = this.StoredValue1;
            let finpValue2 = this.StoredValue2;
            let finpValue3 = this.StoredValue3;
            //如果为null 点击确定return 掉
            if (
                finpData === "" &&
                finpValue1 === ""  &&
                finpValue2 === ""  &&
                finpValue3 === "" 
            ) {
                return;
            }
            this.getRecPages();
            this.drawerClear();
            this.drawer = false;
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
        this.jiucanType = this.$route.query.type;
        this.requestData.delivery_flag = this.diancanType[
            this.jiucanType
        ].value;
        this.$store.dispatch("setToken", this.$route.query.token);
        this.dep_ID = this.$route.query.dep_ID;
        this.currentStore.dep_ID = this.$route.query.dep_ID;
        this.emailstorages();
    },
    watch: {
        currentStore: {
            handler(newVal, oldVal) {
                if (newVal != undefined && newVal != null) {
                    this.daySelectClick(0);
                }
            },
        },
    },
};
</script>
<style scoped>

</style>
