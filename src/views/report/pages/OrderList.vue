<!--
 * @Author: zzt
 * @Date: 2021-04-06 14:27:34
 * @LastEditTime: 2021-05-20 17:52:21
 * @LastEditors: Please set LastEditors
 * @Description: 订单明细
 * @FilePath: \sjoyOrderingManagerH5\src\views\report\pages\OrderList.vue
-->
<template>
    <div class="main-layout reports">
        <div class="row">
            <div class="padding15 row">
                <div class="col-100">
                    <SelectStore :dep_ID="dep_ID"></SelectStore>
                    <a class="button button-round downBtn" @click="downloadCLick">
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
                    <ScreenData 
                        @changeScreenClick="changeScreenClick" 
                        :screenData="daySelect"
                        :isStyleBlock = 'true'
                    ></ScreenData>
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
            <div class="row top10">
                <div class="col-100">
                    <div
                        class="data-table font10 border"
                        style="padding: 0 15px 15px"
                    >
                        <table
                            v-loading="dataLoading"
                            class="storeTable"
                        >
                            <thead>
                                <tr>
                                    <th class="numeric-cell fontWeight" style="width:22%">
                                        {{ $t("orderDetail.orderNum") }}
                                    </th>
                                    <th class="numeric-cell fontWeight">
                                        {{ $t("orderDetail.orderState") }}
                                    </th>
                                    <th class="numeric-cell fontWeight">
                                        {{ $t("orderDetail.orderPrice") }}
                                    </th>
                                    <th class="numeric-cell fontWeight">
                                        {{ $t("payreport.shishouAmount") }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(item, index) in tableData"
                                    :key="index"
                                    @click="cellClick(item.order_id_show)"
                                >
                                    <td class="numeric-cell" style="width:22%">
                                        {{ item.order_id_show | text }}
                                    </td>
                                    <td class="numeric-cell">
                                        {{ item.order_status_name }}
                                    </td>
                                    <td class="numeric-cell">
                                        {{ item.should_pay | price }}
                                    </td>
                                    <td class="numeric-cell">
                                        {{ item.total_price | price }}
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
        <van-popup v-model="propShow" style="border-radius: 15px; width: 80%">
            <EmailPop
                :propShow="propShow"
                :file="file"
                @closeClick="closeClick"
                @sendEmailClick="sendEmailClick"
            ></EmailPop>
        </van-popup>
        <van-popup
            v-model="morePage"
            position="right"
            :style="{ height: '100%', width: '80%' }"
        >
            <ReportSelect
                :morePage="morePage"
                @confirmClick="confirmClick"
            ></ReportSelect>
        </van-popup>
    </div>
</template>

<script>
export default {
    name: "OrderList",
    components: {
        SelectStore: (resolve) =>require(["../components/SelectStore"], resolve),
        EmailPop: (resolve) => require(["../components/EmailPop"], resolve),
        ReportSelect: (resolve) =>require(["../components/ReportSelect"], resolve),
        ScreenData: (resolve) => require(["../components/ScreenData"], resolve),
            
    },
    computed: {
        currentStore() {
            return this.$store.getters.currentStore;
        },
    },
    data() {
        return {
            morePage: false,
            file: null,
            propShow: false,
            dep_ID: "",
            orderSelect: -1,
            dataLoading: false, //数据懒加载
            //element page
            tableData: null,
            //点评门店审核列表 参数
            requestData: {
                eat_type: -1, // 就餐类型,0为堂食,1外带,2服务员点餐 ,
                name: "", //收银员姓名 ,
                order_id: "", //订单号 ,
                order_source: -1, // 订单来源 服务员点餐，0：否，1：是 ,
                order_state: -1, // 订单状态，0未付款，1已付款,2已撤单,3已退款，默认为0 ,
                pay_type: -1, // 支付方式,0钱包,1现金,2银行卡,
                pay_typeTit: -1, //支付方式标题
                preferential_type: -1, // 优惠方式 ,
                start_time: 0, //结账开始时间 格式 2019-07-24 15:18:17 ,
                end_time: 0, //结账结束时间 格式 2019-07-24 15:18:17 ,
                dish_classify: 0,
                pageNum: 0,
                pageSize: 10,
                code_mode: "", //0 牌号送餐，1：桌台点餐, 2: 叫号取餐 默认传空
            },
            diancanType: [
                {
                    value: 0,
                    label: this.$t("orderDetail.tangshi"),
                },
                {
                    value: 1,
                    label: this.$t("orderDetail.waimai"),
                },
            ],
            currentPage: {
                total: 0,
                page: 1,
                size: 10,
            },
            getcellClick: false, //得到返回详情缓存是否状态点击了
            indentCurPage: 1, //得到返回详情缓存当前页
            indentStatePage: -1, //得到返回详情缓存当前状态
            getFlag: true, //判断是否缓存了 cookie
            // 新版时间范围筛选
            daySelect: 0,
            isRestData:true,

            getTimeRange: "", //时间范围
        };
    },
    methods: {
        confirmClick(val) {
            this.morePage = val.isShow;
            this.requestData = val.resData;
            console.log(this.requestData);
            this.detail();
        },
        
        downloadCLick() {
            this.propShow = true;
        },
        closeClick(val) {
            this.propShow = val;
        },
        sendEmailClick(email, isdefault) {
            this.orderReport(email, isdefault);
        },
        orderReport(email, isdefault) {
            let that = this;
            this.requestData.dep_id = this.currentStore.dep_ID; //门店id
            this.requestData.mail = email;
            this.requestData.isdefault = isdefault;
            this.request.orderReport(this.requestData, function (res) {
                if (res.code == "1") {
                    that.toast.success(that.$t("sendSuccess"));
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        //跳转至详情页
        cellClick(order_id_show) {
            this.$store.dispatch("setRequestData", this.requestData);
            let currentPage = this.currentPage.page;
            document.cookie = "indentCurPage===" + currentPage;
            let statePage = this.requestData.order_state;
            document.cookie = "statePage===" + statePage;

            sessionStorage.setItem("iscellClick", true); //缓存判断是否点击  否则初始化会请求三次接口
            this.$router.push({
                path: "/SetorderDetail",
                query: { token:this.$route.query.token,dep_ID:this.currentStore.dep_ID,lang:this.$route.query.lang,id:order_id_show, },
            });
        },
        // cookie得到当前页
        getPageNum() {
            let cPage = 1;
            let name = "indentCurPage";
            let arrStr = document.cookie.split("; ");
            for (let i = 0; i < arrStr.length; i++) {
                let temp = arrStr[i].split("===");
                if (temp[0] == name) {
                    cPage = decodeURI(temp[1]);
                }
            }
            return cPage;
        },
        getPagestate() {
            let statePage = -1;
            let name = "statePage";
            let arrStr = document.cookie.split("; ");
            for (let i = 0; i < arrStr.length; i++) {
                let temp = arrStr[i].split("===");
                if (temp[0] == name) {
                    statePage = decodeURI(temp[1]);
                }
            }
            return statePage;
        },
        //分页初始化
        initPagination() {
            this.indentCurPage = 1;
            this.currentPage.page = 1;
        },

        orderSelectClick(val) {
            this.requestData.mail = "";
            this.orderSelect = val;
            this.requestData.order_state = val;

            if (this.getcellClick) {
                this.currentPage.page = this.indentCurPage;
                if (this.requestData.order_state !== this.indentStatePage) {
                    this.initPagination(); //初始化
                }
            } else {
                this.currentPage.page = 1;
            }

            this.detail();
        },
        // 筛选
        moreClick() {
            this.morePage = true;
        },
        changeScreenClick(start,end,index,isRestData){
            this.daySelect = index;
            this.requestData.start_time = this.moment(start).format("YYYYMMDD");
            this.requestData.end_time = this.moment(end).format("YYYYMMDD");
            sessionStorage.setItem("start_time", this.requestData.start_time);
            sessionStorage.setItem("end_time", this.requestData.end_time);
            sessionStorage.setItem("daySelect", this.daySelect);
            this.isRestData = isRestData;
            if(start!=null&&end!=null){
                this.initPagination();
                this.detail();
            }
        },
        // 分页
        handleCurrentChange(page) {
            this.currentPage.page = page;
            this.detail();
        },
        handleSizeChange(size) {
            //当分页不在第一页时，切换每页显示条数 使得page返回参数为1
            this.currentPage.page = 1;
            sessionStorage.setItem("sizes", size);
            this.currentPage.size = size;
            this.detail();
        },
        detail() {
            this.dataLoading = true;
            let that = this;
            
            this.requestData.dep_id = this.currentStore.dep_ID; //门店id
            this.requestData.pageNum = this.currentPage.page - 1;
            this.requestData.pageSize = this.currentPage.size;

            this.request.detail(this.requestData, function (res) {
                if (res.code == "1") {
                    that.dataLoading = false;
                    that.requestData.mail = "";
                    let req_data = {};
                    req_data = res.data;
                    // 时间范围转换
                    //06/02/2021 01:00 - 07/02/2021 00:59
                    let timeRange = req_data.timeRange;
                    let startTime = that
                        .moment(timeRange.startTime)
                        .format("MM/DD/YYYY");
                    let endTime = that
                        .moment(timeRange.endTime)
                        .format("MM/DD/YYYY");
                    that.getTimeRange = `${startTime} ${timeRange.fontTime} - ${endTime} ${timeRange.backTime}`;

                    // console.log(req_data);
                    let totalNum = req_data.total_num;
                    that.currentPage.total = 0;
                    that.tableData = req_data.waiter;
                    that.currentPage.total = Number(totalNum);
                    that.getcellClick = sessionStorage.getItem("iscellClick");
                    if (that.getcellClick) {
                        if (that.getFlag) {
                            hat.indentCurPage = Number(that.getPageNum());
                            that.indentStatePage = Number(that.getPagestate());
                            that.handleCurrentChange(that.indentCurPage);
                            document.cookie = "indentCurPage===" + 1;
                            that.orderSelectClick(that.indentStatePage);
                            document.cookie = "indentStatePage===" + -1;
                            that.getFlag = false;
                        }
                    }
                } else {
                    that.toast.fail(res.msg);
                }
            });
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
        this.$store.dispatch("setToken", this.$route.query.token);

        this.dep_ID = this.$route.query.dep_ID;
        this.currentStore.dep_ID = this.$route.query.dep_ID;
        //判断每页显示条数有无缓存
        let getpageSizes = Number(sessionStorage.getItem("sizes"));
        let getStartTime = sessionStorage.getItem("start_time");
        let getEndTime = sessionStorage.getItem("end_time");
        let getDaySelect = sessionStorage.getItem("daySelect");
        if (getpageSizes) {
            this.currentPage.size = getpageSizes;
        }
        //判断是否得到了时间有无缓存
        if (getStartTime && getEndTime) {
            this.requestData.start_time = getStartTime;
            this.requestData.end_time = getEndTime;
            this.daySelect = getDaySelect;
            console.log(getDaySelect);
        } else {
            this.requestData.start_time = 0;
            this.requestData.end_time = 0;
        }
    },
    watch: {
        currentStore: { 
            handler(newVal, oldVal) {
                if (newVal != undefined && newVal != null) {
                    this.detail();
                }
                
            },
        },
    },
};
</script>
<style scoped>
</style>