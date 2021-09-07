<template>
    <review-container>
        <view-header slot="header">
            <div slot="head-label" class="row">
                <div class="header-select col-25">
                    <select-store :dep_ID="dep_ID"></select-store>
                </div>
                <div class="header-download col-75" @click="downDialog = true">
                    {{ $t("payreport.downReport") }}
                </div>
            </div>
        </view-header>
        <view-content slot="content">
            <div slot="cont-label" style="height: 35px">
                <div class="button-list top5">
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
                <div v-show="daySelect == 4" class="col-100 top18">
                    <select-data
                        @confirmDataClick="confirmDataClick"
                    ></select-data>
                </div>
            </div>
            <div slot="table" class="data-table top10">
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
                            <td>{{ item.settle_date | moment }}</td>
                            <td>
                                {{ item.end_date | DM }}
                                <span v-show="item.end_date !== null">~</span>
                                {{ item.begin_date | DMY }}
                            </td>
                            <td>{{ item.real_amount | price }}</td>
                            <td>{{ item.brokerage | price }}</td>
                            <td>{{ item.amount | price }}</td>
                            <td>
                                <span
                                    class="font10"
                                    style="color: #fe813c"
                                    @click="balanceBtn(item, $event)"
                                    v-show="hasAuth"
                                    >{{ $t("payreport.duizhang") }}</span
                                >
                                <span
                                    class="font10"
                                    style="color: #989898"
                                    v-if="!hasAuth"
                                    >{{ $t("payreport.duizhang") }}</span
                                >
                            </td>
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
                            {{ $t("cancel") }}
                        </div>
                        <div slot="send" @click="sendClick">
                            {{ $t("send") }}
                        </div>
                    </email-footer>
                </email-view>
            </el-dialog>
        </view-model>
    </review-container>
</template>

<script>
export default {
    name: "settleRecord",
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
            hasAuth: true,
            daySelect: 0,
            dep_ID: -1,
            storeData: "",
            isActive: true,
            //弹出窗下载报表
            emailcheckboxData: false,
            emailinputData: "",
            downDialog: false,
            downDialog_width: "80%",
            // table
            tableTitleData: [
                this.$t("payreport.jiesuanTime"),
                this.$t("payreport.jiaoyiDate"),
                this.$t("report.jingshou"),
                this.$t("payreport.sevirceAmount"),
                this.$t("payreport.dakuanAmount"),
                this.$t("payreport.caozuo"),
            ],

            requestData: {
                page_num: 0,
                page_size: 10,
                dep_id: "-1",
                // begin_date: "",
                // end_date: "",
                email: "",
				report_type: null,
				delivery_flag: 0,
            },
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
        //   对账操作
        balanceBtn(item, event) {
            var beginDate = item.begin_date;
            var endDate = item.end_date;
            this.$router.push({
                path: "/recordCenter",
                query: {
                    dep_ID: this.$route.query.dep_ID,
                    token: this.$route.query.token,
                    lang: this.$route.query.lang,
                    type: this.$route.query.type,
                    begin_date: beginDate,
                    end_date: endDate,
                    daySelect: this.daySelect,
                },
            });
        },

        //结算记录
        depSettlePages() {
            let that = this;
            this.requestData.dep_id = this.currentStore.dep_ID; //传入dep_id
			this.requestData.page_num = this.currentPage.page - 1; //传入当前页
            this.requestData.page_size = this.currentPage.size; //传入每页展示数据条数
            this.request.depSettlePages(this.requestData, function (res) {
                if (res.code == "1") {
                    if (res.data == null) {
                        return;
                    }
                    let req_data = res.data;
					that.filltableData = req_data.list; //填充表格内数据
					that.currentPage.total = req_data.total;
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        //分页初始化
        initPagination() {
            this.indentCurPage = 1;
            this.currentPage.page = 1;
        },
        // 分页
        handleCurrentChange(page) {
            this.currentPage.page = page;
            this.depSettlePages();
        },
        handleSizeChange(size) {
            //当分页不在第一页时，切换每页显示条数 使得page返回参数为1
            this.currentPage.page = 1;
            this.currentPage.size = size;
            this.depSettlePages();
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
            this.depSettlePages();
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
            // this.depSettlePages();
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
            // this.requestData.dep_id = this.currentStore.dep_ID.toString(); //传入dep_id
            this.requestData.report_type = "0";
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
        this.emailstorages();
        this.hasAuth = this.$route.query.hasAuth;
        // console.log(this.hasAuth);
    },
    watch: {
        currentStore: {
            handler(newVal, oldVal) {
                if (newVal != undefined && newVal != null) {
					this.depSettlePages();
                    // this.daySelectClick(0);
                }
            },
        },
    },
};
</script>
<style scoped>
</style>
