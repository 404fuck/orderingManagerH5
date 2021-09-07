<!--
 * @Author: zzt
 * @Date: 2021-04-06 20:00:43
 * @LastEditTime: 2021-05-20 18:01:41
 * @LastEditors: Please set LastEditors
 * @Description: 口味做法销售报表
 * @FilePath: \sjoyOrderingManagerH5\src\views\report\pages\tasteReport.vue
-->
<template>
    <div class="main-layout reports">
        <div class="row">
            <div class="padding15 row">
                <div class="col-100">
                    <SelectStore :dep_ID="dep_ID"></SelectStore>
                    <a
                        class="button button-round downBtn"
                        style="margin-right: 25px"
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
            <div class="row top10" style="padding: 0px 15px">
                <!-- 销售金额-->
                <reportCount
                    class="top15"
                    :title="$t('report.amountSales')"
                    :titleText="titleText[titleSelect]"
                    :now="overviewdata.sale_amount | price"
                    :befor="
                        overviewdata.sale_amount_proportion == -1
                            ? '---'
                            : overviewdata.sale_amount_proportion
                    "
                ></reportCount>
                <!-- 赠送金额 -->
                <reportCount
                    class="top15"
                    :title="$t('report.amountGift')"
                    :titleText="titleText[titleSelect]"
                    :now="overviewdata.rush_amount | price"
                    :befor="
                        overviewdata.rush_amount_proportion == -1
                            ? '---'
                            : overviewdata.rush_amount_proportion
                    "
                ></reportCount>
                <!-- 退回金额 -->
                <reportCount
                    class="top15"
                    :title="$t('report.amountRefund')"
                    :titleText="titleText[titleSelect]"
                    :now="overviewdata.return_amount | price"
                    :befor="
                        overviewdata.return_amount_proportion == -1
                            ? '---'
                            : overviewdata.return_amount_proportion
                    "
                ></reportCount>
            </div>
        </div>
        <div class="row">
            <div class="col-100">
                <div class="data-table font10 border">
                    <table
                        class="storeTable"
                    >
                        <thead>
                            <tr>
                                <th class="numeric-cell fontWeight">
                                    {{$t('report.tasteTag')}}
                                </th>
                                <th class="numeric-cell fontWeight">
                                    {{$t('report.tasteName')}}
                                </th>
                                <th class="numeric-cell fontWeight">{{$t('report.tasteJJ')}}</th>
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
                                <td class="numeric-cell">
                                    {{ item.taste_tag }}
                                </td>
                                <td class="numeric-cell">
                                    {{ item.taste_name | text }}
                                </td>
                                <td class="numeric-cell">
                                    {{ item.add_price | price }}
                                </td>
                                <td class="numeric-cell">
                                    {{ item.sale_num }}
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
                    <div class="col-100 font14 fontWeight">{{$t('orderDetail.orderCome')}}</div>
                    <div class="col-100">
                        <a
                            class="button button-round font12"
                            @click="orderSourceClick(index,item.type)"
                            :class="orderSourceIndex == index ? 'active' : 'unActive'"
                            v-for="(item,index) in orderSourceList"
                            :key="index"
                            >{{item.name}}</a
                        >
                    </div>
                </div>
                <!-- 口味名称 -->
                <div class="row top20">
                    <div class="col-100 font14 fontWeight">{{$t('report.tasteName')}}</div>
                    <div class="col-100">
                        <a
                            class="button button-round font12"
                            @click="getTasteDictClick(index,item)"
                            :class="getTasteDictIndex == index ? 'active' : 'unActive'"
                            v-for="(item,index) in getTasteDictList"
                            :key="index"
                            >{{item}}</a
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
        <van-popup v-model="propShow" style="border-radius: 15px; width: 80%">
            <EmailPop
                :propShow="propShow"
                title="日销售报表"
                :file="file"
                @closeClick="closeClick"
                @sendEmailClick="sendEmailClick"
            ></EmailPop>
        </van-popup>
    </div>
</template>

<script>
export default {
    name: "tasteReport",
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
        language: {
            get() {
                return this.$store.getters.language;
            },
            set(val) {},
        },
    },
    data() {
        return {
            dep_ID: "",
            file: null,
            propShow: false,
            morePage:false,
            overviewdata: {},
            daySelect: 0,
            titleSelect:0,
            titleText: [
                this.$t("report.aaa"),
                this.$t("report.aaa"),
                this.$t("report.bbb"),
                this.$t("report.ccc"),
                this.$t("report.ddd"),
            ],
            tableData: null,
            titleData: [
                { sort: 0, title: this.$t('report.salesvolume_'), key: "sale_num" },
                {
                    sort: 0,
                    title: this.$t('report.xiaoshoue'),
                    key: "sale_amount",
                },
            ],
            requestData: {
                dep_id: "",
                end_time: 0,
                start_time: 0,
                mail: "",
                waiter_service: "", //订单来源: 服务员端，0：服务员点餐，1：扫码点餐 2:服务员app(Hd) 默认传空
                tasteName: "", //口味名称 默认传空
            },
            dateTabTits: [
                this.$t("report.today"),
                this.$t("report.yesterday"),
                this.$t("report.week"),
                this.$t("report.month"),
            ],
            // 订单来源
            orderSourceList:[{name: this.$t('report.waiterApp'),type:'0'},{name: this.$t('report.waiterApp')+'(HD)',type:'2'},{name: this.$t('report.scanOrder'),type:'1'}],
            orderSourceIndex:-1,
            // 口味名称
            getTasteDictList:null,
            getTasteDictIndex:-1,
            orderType: 0, //按价格还是数量 0.价格 1.数量
            orderClass: 0, //降序还是升序
            // 新版时间范围筛选
            isRestData:true,
            screenDataIndex:-1,
            
            getTimeRange: "", //时间范围
        };
    },
    methods: {
        // 下载报表
        downReport(email, isdefault) {
            let that = this;
            this.requestData.dep_id = this.currentStore.dep_ID; //门店id
            this.requestData.mail = email;
            this.requestData.isdefault = isdefault;
            this.request.tasteReport(this.requestData, function (res) {
                if (res.code == "1") {
                    that.toast.success(that.$t("sendSuccess"));
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        sendEmailClick(email, isdefault) {
            this.downReport(email, isdefault);
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
            this.tasteReport();
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
        
        orderSourceClick(index,val){
            this.orderSourceIndex = index;
            this.requestData.waiter_service = val;
        },
        getTasteDictClick(index,val){
            this.getTasteDictIndex = index;
            this.requestData.tasteName = val;
        },
        // 确定
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
            this.tasteReport();
            this.morePage = false;
        },
        // 重置
        resetClick() {
            this.screenDataIndex = -1;
            this.orderSourceIndex = -1,
            this.getTasteDictIndex = -1,
            this.requestData.tasteName = "";
            this.requestData.waiter_service = "";
        },
        //口味做法报表
        tasteReport() {
            let that = this;
            this.requestData.dep_id = this.currentStore.dep_ID; //门店id
            this.requestData.mail ="";
            this.request.tasteReport(this.requestData, function (res) {
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
                    that.overviewdata = {};
                    let res_data = res.data;
                    that.overviewdata = res_data.dishSaleManage;
                    that.tableData = res_data.list;
                    // console.log(res_data);
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        //获取口味字典
        getKouwei(){
            let that = this;
            let data = {
                dep_id:this.currentStore.dep_ID,
                company_id: this.currentStore.faher_ID,
            }
            this.request.getKouwei(data, function (res) {
                if (res.code == "1") {
                    let tasteArr = [];
                    let res_data = res.data;
                    let dictList= res_data.dict_list;
                    dictList.forEach(item => {
                        if(item.need_i18n==1){
                            if(that.language=='en_US'){
                                tasteArr.push(item.taste_name_en);
                            }else if(that.language == "ms_MY"){
                                tasteArr.push(item.taste_name_my);
                            }else{
                                tasteArr.push(item.taste_name_zh);
                            }
                        }else{
                            tasteArr.push(item.taste_name);
                        }
                        
                    });
                    that.getTasteDictList = tasteArr;
                } else {
                    that.toast.fail(res.msg);
                }
            });
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
                    this.tasteReport();
                    this.getKouwei();
                }
            },
        },
    },
};
</script>
<style scoped>
</style>