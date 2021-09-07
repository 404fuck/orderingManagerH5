<!--
 * @Author: zzt
 * @Date: 2021-04-06 14:27:34
 * @LastEditTime: 2021-07-10 11:56:01
 * @LastEditors: Please set LastEditors
 * @Description: 支付分析
 * @FilePath: \sjoyOrderingManagerH5\src\views\report\pages\PayReport.vue
-->
<template>
    <div class="main-layout reports">
        <div class="row padding15">
            <div class="col-50">
                <SelectStore :dep_ID="dep_ID"></SelectStore>
            </div>
            <div class="col-50">
                <a class="button button-round downBtn" @click="downloadClick">
                    {{$t('report.downReport')}}
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
                    :screenData="screenDataIndex"
                    :isStyleBlock = 'false'
                ></ScreenData>
            </div>
        </div>
        <div class="row">
            <div class="col-100 font12 timeShow">
                <span>{{ $t("dataRange") }}：</span>
                <span>{{ getTimeRange }}</span>
            </div>
        </div>
        <div class="row" style="padding:10px 20px">
            <div class="col-50 font14 top15" style="color:#303336">{{$t('payreport.shoukuanType')}}</div>
            <div class="col-50 reportBtn">
                <p class="buttons-row" style="margin:0px ;padding:0px;float: right;">
                    <a
                        style="margin-right:0"
                        class="button button-round"
                        @click="zhifuSelectClick(0)"
                        :class="{active:zhifuSelect==0}"
                    >{{$t('report.anPrice')}}</a>
                    <a
                        class="button button-round"
                        @click="zhifuSelectClick(1)"
                        :class="{active:zhifuSelect==1}"
                    >{{$t('report.anNum')}}</a>
                </p>
            </div>
            <div class="col-100 top10">
                <div id="myChart3" :style="{width: '100%', height: '250px'}"></div>
                <div id="myChart2" :style="{width: '100%', height: '400px'}"></div>
            </div>
        </div>
        <div class="row">
            <div class="col-100">
                <div class="data-table font10 border">
                    <table class="storeTable">
                        <thead>
                            <tr>
                                <th class="numeric-cell fontWeight">{{$t('payreport.shoukuanType')}}</th>
                                <th class="numeric-cell fontWeight">{{$t('payreport.zhifuType')}}</th>
                                <SortImg
                                    v-for="(item,index) in titleData"
                                    :title="item.title"
                                    :contentText='item.contentText'
                                    :showImg='item.showImg'
                                    :sort="item.sort"
                                    :index="index"
                                    :key="index"
                                    @sortChangeClick="sortChangeClick"
                                >
                                </SortImg>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(item,index) in tableData"
                                :key="index"
                                id="rowID"
                            >
                                <td class="numeric-cell">{{item.pay_father_name}}</td>
                                <td class="numeric-cell">{{item.pay_name}}</td>
                                <td class="numeric-cell">{{item.real_count | price}}</td>
                                <td class="numeric-cell">{{item.order_num}}</td>
                                <td class="numeric-cell">{{item.return_count | price}}</td>
                                <td class="numeric-cell">{{item.return_order_num}}</td>
                                <td class="numeric-cell">{{item.net_count | price}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- 暂无数据 -->
                    <div class="noData-warp" v-if="tableData==null||tableData.length==0">
                        <span>{{$t('noData')}}</span>
                    </div>
                </div>
            </div>
        </div>
        <van-popup v-model="propShow" style="border-radius:15px;width:80%;">
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
    name: "storeContrast",
    components: {
        SelectStore: (resolve) => require(["../components/SelectStore"], resolve),
        EmailPop: (resolve) => require(["../components/EmailPop"], resolve),
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
            dep_ID:'',
            propShow: false,
            zhifuSelect: 0,
            requestData: {
                dep_id: "", //门店id
                end_time: 0, //统计结束时间，格式YYYYMMDD 今日为4 昨日为1，本周为2，本月为3，自定义就是YYYYMMDD格式 ,
                start_time: 0, //统计开始时间,格式YYYYMMDD 今日为4 昨日为1，本周为2，本月为3，自定义就是YYYYMMDD格式 ,
                date: "",
                dish_classify: 0,
            },
            paycount: {},
            title: [],
            num: [],
            count: [],
            mapList:[],
            currList:[],
            titleData: [
                {
                    sort: 0,
                    title: this.$t("payreport.ysAmount"),
                    key: "real_count",
                    contentText:this.$t("payreport.guazhangTip"),
                    showImg:true
                },
                {
                    sort: 0,
                    title: this.$t("report.dingCount"),
                    key: "order_num",
                },
                {
                    sort: 0,
                    title: this.$t("report.returnPrice"),
                    key: "return_count",
                },
                {
                    sort: 0,
                    title: this.$t("report.returnCount"),
                    key: "return_order_num",
                },
                {
                    sort: 0,
                    title: this.$t("report.jingshou"),
                    key: "net_count",
                },
            ],
            tableData: null,
            defaultData: null,
            // 新版时间范围筛选
            isRestData:true,
            screenDataIndex:0,

            getTimeRange:"",//时间范围
        };
    },
    methods: {
        // 下载报表
        downloadClick() {
            this.propShow = true;
        },
        closeClick(val) {
            this.propShow = val;
        },
        payreport(email, isdefault) {
            let that = this;
            this.requestData.dep_id = this.currentStore.dep_ID; //门店id
            this.requestData.mail = email;
            this.requestData.isdefault = isdefault;
            this.request.payreport(this.requestData, function (res) {
                if (res.code == "1") {
                    that.toast.success(that.$t("sendSuccess"));
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        sendEmailClick(email, isdefault) {
            this.payreport(email, isdefault);
        },
        // 快捷时间选择
        changeScreenClick(start,end,index,isRestData){
            this.screenDataIndex = index;
            this.requestData.start_time = this.moment(start).format("YYYYMMDD");
            this.requestData.end_time = this.moment(end).format("YYYYMMDD");
            this.isRestData = isRestData;
            if(start!=null&&end!=null){
                this.ewallrank();
                this.reportPay();
            }

        },
        drawBar(titleData, valueData) {
            let myChart2 = this.$echarts.init(
                document.getElementById("myChart2")
            );
            myChart2.setOption({
                color: ["#F46F24"],
                tooltip: {
                    trigger: "axis",
                    position: 'inside',
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: "line", // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "20%",
                    top: "-2%",
                    containLabel: true,
                },
                xAxis: [
                    {
                        type: "category",
                        data: titleData,
                        // X轴字段倾斜设置
                        axisLabel: {
                            interval: 0,
                            // 旋转度数
                            rotate: 60,
                            textStyle: {
                                color: '#303336',
                                fontSize:'10',
                            }

                        },
                        
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                        position: "right",
                        axisLine: {
                            //y轴
                            show: false,
                        },
                    },
                ],
                series: [
                    {
                        type: "bar",
                        barWidth: "15",
                        data: valueData,
                    },
                ],
            });
        },
        
        ewallrank() {
            //paycount
            let that = this;
            this.requestData.dep_id = this.currentStore.dep_ID; //门店id
            this.request.ewallrank(this.requestData, function (res) {
                if (res.code == "1") {
                     // 时间范围转换
                    //06/02/2021 01:00 - 07/02/2021 00:59
                    let timeRange = res.data.timeRange;
                    let startTime = that.moment(timeRange.startTime).format("MM/DD/YYYY");
                    let endTime = that.moment(timeRange.endTime).format("MM/DD/YYYY");
                    that.getTimeRange = `${startTime} ${timeRange.fontTime} - ${endTime} ${timeRange.backTime}`;

                    that.paycount = res.data;
                    that.currList = [];
                    that.title = [];
                    that.num = [];
                    that.count = [];
                    that.mapList = res.data.mapList;
                    //默认现金
                    that.currList = res.data.mapList[res.data.cash_father_id];
                    for (let i in that.currList) {
                        that.title.push(that.currList[i].name);
                        that.num.push(that.currList[i].num);
                        that.count.push(that.currList[i].count);
                    }
                    that.zhifuSelectClick(0);
                    that.drawBar(that.title, that.count);
                    sessionStorage.setItem('payListStore',JSON.stringify(that.currList));
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        reportPay() {
            this.tableData = null;
            let that = this;
            this.requestData.mail = "";
            this.requestData.dep_id = this.currentStore.dep_ID; //门店id
            this.request.reportPay(this.requestData, function (res) {
                if (res.code == "1") {
                    that.requestData.mail = "";
                    that.tableData = res.data;
                   
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
       
        zhifuSelectClick(isNum) {
            this.zhifuSelect = isNum;
            this.drawBar(this.title, isNum == 0 ? this.count : this.num);

            var date = [
                //此处传入两遍数组为关键处,百分比和指示线文字为两张饼图,叠加在一起显示效果
                
                {
                    value:
                        isNum == 1
                            ? this.paycount.cash_pay_num
                            : this.stringutils.formatPrice(this.paycount.cash_pay_count),
                    name: this.$t("accountsDetail.cash"),
                },
                {
                    value:
                        isNum == 1
                            ? this.paycount.bank_card_pay_num
                            : this.stringutils.formatPrice(this.paycount.bank_card_pay_count),
                    name: this.$t("accountsDetail.bankCard"),
                },
                {
                    value:
                        isNum == 1
                            ? this.paycount.e_wallet_pay_num
                            : this.stringutils.formatPrice(this.paycount.e_wallet_pay_count),
                    name: this.$t("accountsDetail.E-wallet"),
                },
                {
                    value:
                        isNum == 1
                            ? this.paycount.scan_pay_num
                            : this.stringutils.formatPrice(this.paycount.scan_pay_count),
                    name: this.$t("accountsDetail.scan_pay"),
                },
                {
                    value:
                        isNum == 1
                            ? this.paycount.delivery_service_num
                            : this.stringutils.formatPrice(this.paycount.delivery_service_count),
                    name: this.$t("accountsDetail.delivery_service"),
                },
                {
                    value:
                        isNum == 1
                            ? this.paycount.member_card_pay_num
                            : this.stringutils.formatPrice(this.paycount.member_card_pay_count),
                    name: this.$t("report.Membercard"),
                },
                {
                    value:
                        isNum == 1
                            ? this.paycount.super_account_num
                            : this.stringutils.formatPrice(this.paycount.super_on_account_count),
                    name: this.$t("payreport.gzXiaofei"),
                },
                {
                    value:
                        isNum == 1
                            ? this.paycount.super_online_num
                            : this.stringutils.formatPrice(this.paycount.super_online_count),
                    name: this.$t("payreport.zxZhifu"),
                },
                
            ];
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
                    position: 'inside',
                    formatter: "{a} <br/>{b} : {c} ({d}%)",
                },
                color: [
                    "#EB3C1C",
                    "#2082ED",
                    "#F46F24",
                    "#F52C79",
                    "#F7B500",
                    "#E4C269",
                    "#6DD2D2",
                    "#64D274",
                    
                ],
                legend: {
                    left: "left",
                    data: data,
                },
                series: [
                    {
                        //显示指示线
                        name: unitTile,
                        type: "pie",
                        radius: "55%", //饼图的半径大小
                        center: ["50%", "70%"], //饼图的位置
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
            myChart3.on('mousemove', (params)=> {
                this.currList = [];
                this.drawBar([], []);
                switch (params.color) {
                    case "#EB3C1C":
                        this.currList = this.mapList[this.paycount.cash_father_id];
                        break;
                    case "#2082ED":
                        this.currList = this.mapList[this.paycount.bank_father_id];
                        break;
                    case "#F46F24":
                        this.currList = this.mapList[this.paycount.ewallet_father_id];
                        break;
                    case "#F52C79":
                        this.currList = this.mapList[this.paycount.scan_father_id];
                        break;
                    case "#F7B500":
                        this.currList = this.mapList[this.paycount.delivery_father_id];
                        break;
                    case "#E4C269":
                        this.currList = this.mapList[this.paycount.member_card_father_id];
                        break;
                    case "#6DD2D2":
                        this.currList = this.mapList[this.paycount.on_account_father_id];
                        break;
                    case "#64D274":
                        this.currList = this.mapList[this.paycount.online_father_id];
                        break;
                    default:
                        break;
                }
                let titleList = [];
                let numList = [];
                let countList = [];
                for (let i in this.currList) {
                    titleList.push(this.currList[i].name);
                    numList.push(this.currList[i].num);
                    countList.push(this.currList[i].count);
                }
                this.drawBar(titleList, countList);
            })
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
    mounted() {

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
      
        this.dep_ID = this.$route.query.dep_ID;
        this.currentStore.dep_ID = this.$route.query.dep_ID;
        // this.$Local(this.$route.query.lang);
        this.$store.dispatch("setToken", this.$route.query.token);
        this.requestData.mail = "";
       
    },
    watch: {
        currentStore: {
            handler(newVal, oldVal) {
                if (newVal != undefined && newVal != null) {
                    this.ewallrank();
                    this.reportPay();
                }
            },
        },
    },
};
</script>
<style scoped>
</style>