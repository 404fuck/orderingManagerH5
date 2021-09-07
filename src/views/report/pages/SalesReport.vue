<!--
 * @Author: your name
 * @Date: 2021-04-06 14:27:34
 * @LastEditTime: 2021-05-20 17:58:54
 * @LastEditors: Please set LastEditors
 * @Description: 菜品销售
 * @FilePath: \sjoyOrderingManagerH5\src\views\report\pages\SalesReport.vue
-->
  <template>
    <div class="main-layout reports">
        <div class="row">
            <div class="col-100 padding15">
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
            <div class="col-100">
                <div class="row">
                    <div class="col-100 tabBtn" style="padding: 0 15px">
                        <a
                            class="button button-round font12"
                            v-for="(item,index) in tabTitles"
                            :key="index"
                            @click="tabClick(index+1)"
                            :class="{ active: tabSelect == index+1 }"
                            >{{item}}</a
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
                    <div class="col-100 font12 timeShow">
                        <span>{{$t('dataRange')}}：</span>
                        <span>{{ getTimeRange }}</span>
                    </div>
                </div>

                <div v-if="tabSelect != 2">
                    <div class="row padding15">
                        <reportCount
                            :title="$t('report.Sales')"
                            :titleText="titleText[screenDataIndex]"
                            :now="overviewdata.sale_amount | price"
                            :befor="overviewdata.sale_amount_proportion == -1? '---': overviewdata.sale_amount_proportion"
                        ></reportCount>
                        <reportCount
                            :title="$t('report.salesVolume')"
                            :titleText="titleText[screenDataIndex]"
                            :now="overviewdata.sale_count"
                            :befor="overviewdata.sale_count_proportion == -1? '---': overviewdata.sale_count_proportion"
                        ></reportCount>
                    </div>
                    <div class="row padding15">
                        <reportCount
                            :title="$t('report.Amount')"
                            :titleText="titleText[screenDataIndex]"
                            :now="overviewdata.rush_amount | price"
                            :befor="overviewdata.rush_amount_proportion == -1? '---': overviewdata.rush_amount_proportion"
                        ></reportCount>
                        <reportCount
                            :contentText="$t('report.salesCont1')"
                            :showImg="true"
                            v-if="overviewdata.rush_count_proportion == -1"
                            :title="$t('report.Number')"
                            :titleText="titleText[screenDataIndex]"
                            :now="overviewdata.rush_count"
                            :befor="overviewdata.rush_count_proportion == -1? '---': overviewdata.rush_count_proportion"
                        ></reportCount>
                    </div>
                    <div class="row padding15">
                        <reportCount
                            :title="$t('report.Refund')"
                            :titleText="titleText[screenDataIndex]"
                            :now="overviewdata.return_amount | price"
                            :befor="overviewdata.return_amount_proportion == -1? '---': overviewdata.return_amount_proportion"
                        ></reportCount>
                        <reportCount
                            :contentText="$t('report.salesCont2')"
                            :showImg="true"
                            :title="$t('report.return Number')"
                            :titleText="titleText[screenDataIndex]"
                            :now="overviewdata.return_count"
                            :befor="overviewdata.return_count_proportion == -1? '---': overviewdata.return_count_proportion"
                        ></reportCount>
                    </div>
                </div>
                <!-- 称重菜 tabSelect==2-->
                <div v-show="tabSelect == 2">
                    <div class="row padding15">
                        <reportCount
                            :title="$t('report.Sales')"
                            :titleText="titleText[screenDataIndex]"
                            :now="overviewdata.sale_amount | price"
                            :befor="overviewdata.sale_amount_proportion == -1? '---': overviewdata.sale_amount_proportion"
                        ></reportCount>
                        <reportCount
                            :contentText="$t('report.salesCont1')"
                            :showImg="true"
                            :title="$t('report.Amount')"
                            :titleText="titleText[screenDataIndex]"
                            :now="overviewdata.rush_amount | price"
                            :befor="overviewdata.rush_amount_proportion == -1? '---': overviewdata.rush_amount_proportion"
                        ></reportCount>
                    </div>
                    <div class="row padding15">
                        <reportCount
                            :contentText="$t('report.salesCont2')"
                            :showImg="true"
                            :title="$t('report.Refund')"
                            :titleText="titleText[screenDataIndex]"
                            :now="overviewdata.return_amount | price"
                            :befor="overviewdata.return_amount_proportion == -1? '---': overviewdata.return_amount_proportion"
                        ></reportCount>
                    </div>
                </div>
                <div class="day-tab">
                    <div>
                        <div class="row">
                            <div class="col-50" style="padding: 20px 12px">
                                <h4>{{tabSelect==3?$t("report.TOP210"):$t("report.TOP10")}}</h4>
                            </div>
                            <div
                                class="col-50 reportBtn"
                                style="padding: 20px 12px"
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
                                        >{{tabSelect!=2? $t("report.anNum"):$t("report.anWeight")}}</a
                                    >
                                </p>
                            </div> 
                            <div class="col-100">
                                <div
                                    ref="myChart"
                                    style="width:97%;height:300px;"
                                ></div>
                            </div>
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
                                <th class="numeric-cell fontWeight">
                                    {{tabSelect!=3? $t("report.productName"):$t("report.sealName")}}
                                </th>
                                <th class="numeric-cell fontWeight">
                                    {{tabSelect==1? $t("report.dishsSpecial"):tabSelect==2?$t("report.dishsUnit"):$t("report.dishsType")}}
                                </th>
                                <SortImg
                                    v-for="(item, index) in titleData"
                                    :title="item.title"
                                    :sort="item.sort"
                                    :index="index"
                                    :key="index"
                                    :isSort="item.title!=$t('report.salesWeight')"
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
                                    {{ item.dish_name }}
                                </td>
                                <td class="numeric-cell">
                                    <span v-if="tabSelect==1">{{ item.spec_name |text }}</span>
                                    <span v-else-if="tabSelect==2">{{ item.unit_type |text }}</span>
                                    <span v-else>{{ item.weight_spec==3? $t("report.setMealFixed"):item.weight_spec==4?$t("report.setMealSelf"):'-' }}</span>
                                </td>
                                <td class="numeric-cell">
                                    <span v-if="tabSelect==2">{{ item.dish_weight|price }}</span>
                                    <span v-else>{{ item.dish_num }}</span>
                                </td>
                                <td class="numeric-cell">
                                    {{ item.total_dish_count | price }}
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
                        {{ $t("orderDetail.orderCome") }}
                    </div>
                    <div class="col-100">
                        <a  
                           
                            class="button button-round font12"
                            v-for="(item,index) in orderLists"
                            :key="index"
                            @click="orderValue = index"
                            :class="orderValue == index ? 'active' : 'unActive'"
                            >{{ item }}</a
                        >
                    </div>
                </div>
                <!-- 就餐类型 -->
                <div class="row top20">
                    <div class="col-100 font14 fontWeight">
                        {{ $t("orderDetail.eatType_") }}
                    </div>
                    <div class="col-100">
                        <span
                            class="button button-round font12 top10"
                            v-for="(item, index) in eatTypeTits"
                            :key="index"
                            @click="eatType = item.id"
                            :class="eatType == item.id ? 'active' : 'unActive'"
                            >{{ item.name }}</span
                        >
                    </div>
                </div>
                <!-- 菜品类型 -->
                <div class="row top20" v-if="tabSelect == 1">
                    <div class="col-100 font14 fontWeight">{{$t('report.proType')}}</div>
                    <div class="col-100">
                        <a
                            class="button button-round font12"
                            v-for="(item, index) in dishTypeLists"
                            :key="index"
                            @click="dishTypeClick(index)"
                            :class="dishType == index ? 'active' : 'unActive'"
                            >{{item}}</a
                        >
                    </div>
                </div>
                <!-- 产品分类 -->
                <div class="row top20" v-if="tabSelect != 3">
                    <div class="col-100 font14 fontWeight">{{$t('report.proCategory')}}</div>
                    <div class="col-100 top10 salesreport">
                        <el-select
                            class="store-select"
                            v-model="itemValue"
                            size="small"
                            style="border: 1px #d8d8d8 solid; width: 100%"
                        >
                            <el-option
                                v-for="item in typeList"
                                :key="item.id"
                                :label="item.type_name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </div>
                </div>
                <!-- 套餐类型 -->
                <div class="row top20" v-if="tabSelect == 3">
                    <div class="col-100 font14 fontWeight">{{$t('report.setMealType')}}</div>
                    <div class="col-100">
                        <a
                            class="button button-round font12"
                            @click="packageTypeClick(3)"
                            :class="packageType == 3 ? 'active' : 'unActive'"
                            >{{$t('report.setMealFixed')}}</a
                        >
                        <a
                            class="button button-round font12"
                            @click="packageTypeClick(4)"
                            :class="packageType == 4 ? 'active' : 'unActive'"
                            >{{$t('report.setMealSelf')}}</a
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
    name: "SalesReport",
    components: {
        SelectStore: (resolve) =>require(["../components/SelectStore"], resolve),
        EmailPop: (resolve) => require(["../components/EmailPop"], resolve),
        reportCount: (resolve) => require(["../components/reportCount"], resolve),
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
            tabTitles:[this.$t('report.proSingle'),this.$t('report.proWeight'),this.$t('report.proSetMeal')],
            propShow: false,
            file: null,
            dep_ID: "",
            tabSelect: 1,
            yingyeSelect: 0,
            eatType: "",
            eatTypeTits: [
                { name: this.$t("orderDetail.tangshi"), id: '0' },
                { name: this.$t("orderDetail.waidai"), id: '1' },
            ],
            dishType: null,
            dishTypeLists:[this.$t('report.proType1'),this.$t('report.proType4'),this.$t('report.proType2'),this.$t('report.proType3')],
            packageType: 0,
            requestData: {
                dep_id: "", //门店id
                dish_classify: 0, //菜品二级分类,可以不传，默认为全部 ,
                end_time: 0, //统计结束时间，格式yyyyMMdd 今日为4 昨日为1，本周为2，本月为3，自定义就是yyyyMMdd格式 ,
                start_time: 0, //统计开始时间,格式yyyyMMdd 今日为4 昨日为1，本周为2，本月为3，自定义就是yyyyMMdd格式 ,
                waiter_service: "",
                dishQueryType: 1, //查询的菜品类型 1:单品 2: 称重菜 3:套餐
                take_out: "", //就餐方式,0为堂食,1外带
                weight_spec: "", //菜品类型 0:普通菜，1：称重菜，2：规格菜,,3：固定套餐,4：自选套餐
                is_temporary: "", //是否临时菜：0否，1是
                for_suits:'',//默认传空选中传1
            },
            titleData: [
                {
                    sort: 0,
                    title: this.$t("report.salesVolume"),
                    key: "dish_num",
                },
                { 
                    sort: 0, 
                    title: this.$t("report.Sales"),
                    key: "dish_price" 
                },
            ],
            titleText: [
                this.$t("report.aaa"),
                this.$t("report.bbb"),
                this.$t("report.ccc"),
                this.$t("report.ddd"),
            ],
            overviewdata: {},
            orderSource: {
                daily_count: [], //每日的销售金额统计
                daily_num: [], //每日的销售数量统计 ,
            },
            defaultData: null,
            yinyeShows: 1,
            tableData: [], //当前页要显示的数据 表格和图表
            morePage: false,
            typeList: { type_name: this.$t("report.allType"), id: 0 },
            itemValue: 0,
            orderValue: null,
            orderLists:[this.$t("report.cashierTerminal"),this.$t("report.scanOrder"),this.$t("report.waiterApp")+'(HD)'],
            // 新版时间范围筛选
            isRestData:true,
            screenDataIndex:0,

            getTimeRange: "", //时间范围
        };
    },
    methods: {
        tabClick(val) {
            if(val==2){
                this.requestData.weight_spec = 1;
                this.titleData[0].title = this.$t("report.salesWeight");
            }else{
                this.titleData[0].title = this.$t("report.salesVolume");
            }
            this.resetClick();
            this.requestData.weight_spec = "";
            this.requestData.is_temporary = "";
            this.requestData.for_suits="";
            this.tabSelect = val;
            this.requestData.dishQueryType = val;
            this.Saledish();
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
        // 确定
        confirmClick() {
            this.Saledish();
            this.morePage = false;
        },
        // 重置
        resetClick() {
            this.itemValue = 0;
            this.orderValue = null;
            this.eatType = "";
            this.dishType = null;
            this.requestData.is_temporary = "";
            this.requestData.for_suits="";
        },
        dishTypeClick(val) {
            this.dishType = val;
            if (val == 3) {
                this.requestData.is_temporary = "1";
                this.requestData.weight_spec = "";
                this.requestData.for_suits="";
            } else if(val == 1) {
                this.requestData.for_suits="1";
                this.requestData.is_temporary = "";
                this.requestData.weight_spec = "";
            } else {
                this.requestData.weight_spec = val;
                this.requestData.is_temporary = "";
                this.requestData.for_suits="";
            }
        },
        packageTypeClick(val) {
            this.packageType = val;
            this.requestData.is_temporary = "";
            this.requestData.for_suits="";
            this.requestData.weight_spec = val;
        },
        //获取所有分类列表
        getdish() {
            let that = this;
            this.request.getdish(
                { dep_id: this.currentStore.dep_ID },
                function (res) {
                    if (res.code == "1") {
                        var list = [
                            { type_name: that.$t("report.allType"), id: 0 },
                        ];
                        for (let i in res.data) {
                            for (let j in res.data[i].childen) {
                                list.push(res.data[i].childen[j]);
                            }
                        }
                        that.typeList = "";
                        that.typeList = list;
                    } else {
                        that.toast.fail(res.msg);
                    }
                }
            );
        },
        downloadClick() {
            this.propShow = true;
        },
        closeClick(val) {
            this.propShow = val;
        },
        dishsale(email, isdefault) {
            let that = this;
            this.requestData.dep_id = this.currentStore.dep_ID; //门店id
            this.requestData.mail = email;
            this.requestData.isdefault = isdefault;
            this.request.dishsale(this.requestData, function (res) {
                if (res.code == "1") {
                    that.toast.success(that.$t("sendSuccess"));
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        sendEmailClick(email, isdefault) {
            this.dishsale(email, isdefault);
        },
        Saledish() {
            let that = this;
            this.requestData.mail = "";
            this.requestData.dep_id = this.currentStore.dep_ID; //门店id
            this.requestData.take_out = this.eatType;
            this.requestData.dish_classify = this.itemValue;
            this.requestData.waiter_service = this.orderValue==null?'':this.orderValue;
            this.request.Saledish(this.requestData, function (res) {
                if (res.code == "1") {
                    let res_data = res.data;
                    // 时间范围转换
                    //06/02/2021 01:00 - 07/02/2021 00:59
                    let timeRange = res_data.timeRange;
                    let startTime = that
                        .moment(timeRange.startTime)
                        .format("MM/DD/YYYY");
                    let endTime = that
                        .moment(timeRange.endTime)
                        .format("MM/DD/YYYY");
                    that.getTimeRange = `${startTime} ${timeRange.fontTime} - ${endTime} ${timeRange.backTime}`;
                    that.tableData = [];
                    that.overviewdata = {};
                    that.tableData = res_data.count_list;
                    that.overviewdata = res_data.dishSaleManage;
                    console.log(that.tableData);
                    // that.yinyefenxi(that.tableData, date)
                    that.yingyeSelectClick(0);
                    that.defaultData = that.stringutils.deepClone(
                        res_data.count_list
                    );
                    
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        yingyeSelectClick(isNum) {
            if (isNum == 0) {
                this.yinyeShows = 1;
            } else {
                this.yinyeShows = 0;
            }
            this.yingyeSelect = isNum;
            let dataNameList = [];
            let originalData = [];
            let arry = [];
            let delNum = this.tableData.length >= 10 ? 9 : this.tableData.length - 1;
            for (let i in this.tableData) {
                // 取TOP10
                if (i > 9) {
                    break;
                }
                arry.push(this.tableData[delNum - i]);
            }
            for (let i in arry) {
                // 取TOP10
                if (i > 9) {
                    break;
                }
                dataNameList.push(arry[i].dish_name);
                originalData.push(isNum == 1 ? this.tabSelect==2?this.stringutils.formatPrice(arry[i].dish_weight): arry[i].dish_num : this.stringutils.formatPrice(arry[i].total_dish_count));
            }
            this.yinyefenxi(dataNameList, originalData);
        },
       
        yinyefenxi(dataNameList, originalData) {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(
                this.$refs.myChart
            );
            var option = {
                color: ["#30CFB7"],
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                    },
                },
                grid: {
                    top: 0,
                    left: "3%",
                    right: "3%",
                    bottom: "3%",
                    containLabel: true,
                },
                xAxis: {
                    type: "value",
                },

                yAxis: {
                    type: "category",
                    data: dataNameList,
                    axisLabel: {
                        formatter: function (value) {
                            var v = value.substring(0, 5) + "...";
                            return value.length > 7 ? v : value;
                        },
                    },
                },
                series: [
                    {
                        name:this.yinyeShows == 1? this.$t("report.Sales"):this.tabSelect==2?this.$t('report.salesWeight'):this.$t("report.salesVolume"),
                        barWidth: 15,
                        type: "bar",
                        data: originalData,
                    },
                ],

            }
            myChart.setOption(option);
           
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
        valueChange(val) {
            this.requestData.dish_classify = val;
            this.Saledish();
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
        this.requestData.mail = "";
    },
    watch: {
        currentStore: {
            handler(newVal, oldVal) {
                if (newVal != undefined && newVal != null) {
                    this.getdish();
                    this.Saledish();
                }
            },
        },
    },
};
</script>
<style scoped>
</style>