<template>
    <div class="main-layout reports">
        <div class="row">
            <div class="padding15 row">
                <div class="col-50">
                    <SelectStore :dep_ID="dep_ID"></SelectStore>
                </div>
                <div class="col-30" style="folat:rigt">
                    <!-- @click="downloadCLick" -->
                    <a  class="button button-round downBtn" @click="downloadCLick">
                        {{ $t("report.downReport") }}
                        <img src="../../../assets/images/downloadReport.png" alt class="downImg" />
                    </a>
                </div>
            </div>
            <div class="row" style="padding: 2px 20px;">
                <!-- 会员总数 -->
                <div class="col-50 countDiv">
                    <div class="row">
                        <div class="col-100" style="padding: 10px;">
                            <span class="left font12 colorBlack" style="text-align: justify;word-break: break-all;display:inline-block">{{$t("report.memberCount")}}</span>
                        </div>
                        <div class="col-100 center font22">
                            <b>{{totalDataRes.member_total_count}}</b>
                        </div>
                        <div class="col-100 center top10 font10 colorBlack text">
                            <span class="greenAdd">+ </span>
                            <span>{{totalDataRes.member_add_count}}</span>
                        </div>
                    </div>
                </div>
                <!-- 订单总数 -->
                <div class="col-50 countDiv">
                    <div class="row">
                        <div class="col-100" style="padding: 10px;">
                            <span class="left font12 colorBlack" style="text-align: justify;word-break: break-all;display:inline-block">{{$t("report.dingCount") }}</span>
                        </div>
                        <div class="col-100 center font22">
                            <b>{{totalDataRes.total_order_count}}</b>
                        </div>
                        <div class="col-100 top10 center font10 colorBlack text">
                            <span>
                                <span class="greenAdd">+ </span><span>{{totalDataRes.order_count}}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <!-- 剩余积分总数 -->
                <div class="col-50 countDiv top10">
                    <div class="row">
                        <div class="col-100" style="padding: 10px;">
                            <span class="left font12 colorBlack" style="text-align: justify;word-break: break-all;display:inline-block">{{$t("report.jifenCount")}}</span>
                        </div>
                        <div class="col-100 center font22">
                            <b>{{totalDataRes.remain_score}}</b>
                        </div>
                        <div class="col-100 center top10 font10 colorBlack text">
                            <span>
                                <span class="greenAdd">+ </span><span>{{totalDataRes.add_score}}</span>
                            </span>
                            <span class="left10">
                                <span class="redLess">- </span><span>{{totalDataRes.reduce_score}}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <!-- 会员卡总余额 -->
                <div class="col-50 countDiv top10">
                    <div class="row">
                        <div class="col-100" style="padding: 10px;">
                            <span class="left font12 colorBlack" style="text-align: justify;word-break: break-all;display:inline-block">{{$t("report.vipCardCount")}}</span>
                        </div>
                        <div class="col-100 center  font22">
                            <b>{{totalDataRes.member_card_amount | price}}</b>
                        </div>
                        <div class="col-100 center top10 font10 colorBlack text">
                            <span>
                                <span class="greenAdd">+ </span><span>{{totalDataRes.add_card_amount | price}}</span>
                            </span>
                            <span class="left10">
                                <span class="redLess">- </span><span>{{totalDataRes.reduce_card_amount | price}}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-100 top20">
                <div class="tab-contents">
                    <div>
                        <div class="row dateSelect" style="padding: 0 15px">
                            <div class="col-100">
                                <a class="button button-round font12"  @click="daySelectClick(0)" :class="{ active: daySelect == 0 }" >{{$t("report.today") }}</a >
                                <a class="button button-round font12" @click="daySelectClick(1)" :class="{ active: daySelect == 1 }">{{$t("report.yesterday") }}</a >
                                <a class="button button-round font12" @click="daySelectClick(2)" :class="{ active: daySelect == 2 }" >{{$t("report.week") }}</a >
                                <a class="button button-round font12" @click="daySelectClick(3)" :class="{ active: daySelect == 3 }" >{{$t("report.month") }}</a >
                                <a class="button button-round font12" @click="daySelectClick(4)" :class="{ active: daySelect == 4 }" >{{$t("report.diy") }}</a>
                            </div>
                        </div>
                        <div v-show="daySelect == 4" style="padding: 0 15px">
                            <SelectDate  @confirmDataClick="confirmDataClick"></SelectDate>
                        </div>

                        <div class="day-tab top15">
                            <div>
                                <div class="row" style="padding: 5px 17px 20px 17px;">
                                    <div class="col-100" style="box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);">
                                        <div class="leftDiv">
                                            <p><span>{{memberDiscountRes.should_pay | price}}</span> / <span style="font-size:14px">{{memberDiscountRes.order_num}}</span></p>
                                            <span class="font12" style="color:#303336">{{$t("report.memberOrderCount") }} / {{$t("supplyReport.count") }}</span>
                                        </div>
                                        <div class="rightDiv">
                                            <p>{{memberDiscountRes.discount_total_amount | price}}</p>
                                            <span class="font12" style="color:#303336">{{$t("report.discouns") }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-100" style="padding: 0 12px">
                                        <h4>{{ $t("report.addMember")}}</h4>
                                    </div>
                                    <div class="col-100">            
                                        <div id="myChart" :style="{ width: '97%', height: '300px', }"></div>
                                    </div>
                                </div>
                                <hr style="background: #E6EAEF;border: none;height: 1px;margin: 0 15px 15px;">
                                <div class="row">
                                    <div class="col-100" style="padding: 0 12px">
                                        <h4>{{ $t("report.member0rderPay")}}</h4>
                                    </div>
                                    <div class="col-100">            
                                        <div id="myChart1" :style="{ width: '97%', height: '300px', }"></div>
                                    </div>
                                </div>
                                <hr style="background: #E6EAEF;border: none;height: 1px;margin: 20px 15px 15px;">
                                <div class="row">
                                    <div class="col-100" style="padding: 0 12px">
                                        <h4>{{ $t("report.memberOrderDiscount")}}</h4>
                                    </div>
                                    <div class="col-100">            
                                        <div id="myChart2" :style="{ width: '97%', height: '300px', }"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <van-popup v-model="propShow" style="border-radius: 15px; width: 80%" >
                <EmailPop
                    :propShow="propShow"
                    title="日销售报表"
                    :file="file"
                    @closeClick="closeClick"
                    @sendEmailClick="sendEmailClick"
                ></EmailPop>
            </van-popup>
        </div>
    </div>
</template>

<script>
import echarts from "echarts";
export default {
    name: "Report",
    components: {
        SelectStore: (resolve) => require(["../components/SelectStore"], resolve),
        SelectDate: (resolve) => require(["../components/SelectDate"], resolve),
        EmailPop: (resolve) => require(["../components/EmailPop"], resolve),
        reportCount: (resolve) => require(["../components/reportCount"], resolve),
    },
    computed: {
        currentStore() {
            return this.$store.getters.currentStore;
        },
    },
    data() {
        return {
            propShow: false,
            dep_ID: -1,
            daySelect: 0,
            requestData: {
                dep_id: "-1", //门店id
                end_time: 0, //昨日为1，本周为2，本月为3，当天为0，自定义就是yyyyMMdd格式,
                start_time: 0, //昨日为1，本周为2，本月为3，当天为0，自定义就是yyyyMMdd格式,
            },
            totalDataRes:{},//会员数据信息
            memberCountRes:{},//新增会员渠道
            payTypeRes:{},//会员订单支付方式
            memberDiscountRes:{},//会员订单优惠方式
            echColorList:["#EB3C1C","#2082ED","#F46F24","#F52C79","#F7B500","#E4C269","#6DD2D2","#64D274"],  //echart 
        };
    },
    methods: {
        valueChange() {
            this.$emit("valueChange", this.requestData.delivery_flag);
            this.managedata();
        },
        downloadCLick() {
            this.propShow = true;
        },
        sendEmailClick(email, isdefault) {
            this.memberReport(email, isdefault);
        },
        closeClick(val) {
            this.propShow = val;
        },
        confirmDataClick(start, end) {
            this.requestData.start_time = this.moment(start).format("YYYYMMDD");
            this.requestData.end_time = this.moment(end).format("YYYYMMDD");
            this.memberManageData()
        },
        daySelectClick(val) {
            this.daySelect = val;
            if (val == 4) {
                return;
            }
            this.requestData.start_time = val;
            this.requestData.end_time = val;
            this.memberManageData()
        },
        // 会员概览数据统计
        memberManageData(){
            let that = this;
            this.requestData.dep_id = this.currentStore.dep_ID; //门店id
            this.request.memberManageData(this.requestData, function (res) {
                if (res.code == "1") {
                    that.totalDataRes = res.data.totalDataRes
                    that.memberCountRes = res.data.memberCountRes
                    that.payTypeRes = res.data.payTypeRes
                    that.memberDiscountRes = res.data.memberDiscountRes
                    that.memberChartClick()
                    that.memberOrderChartClick()
                    that.memberDiscountChartClick()
                }else{
                    that.toast.fail(res.msg);
                }
            })
        },
        memberReport(email, isdefault){
            let that = this;
            this.requestData.dep_id = this.currentStore.dep_ID; //门店id
            this.requestData.mail = email;
            this.requestData.isdefault = isdefault;
            this.request.memberManageData(this.requestData, function (res) {
                if (res.code == "1") {
                    that.toast.success(that.$t("sendSuccess"));
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        // 新增会员渠道
        memberChartClick() {
            let that = this;
           var date = [
                {
                    value:that.memberCountRes.company_add_count,
                    name: that.$t("report.guanjiaApp"),
                },
                {
                    value:that.memberCountRes.waiter_add_count,
                    name: that.$t("report.waiterApp"),
                },
                {
                    value:that.memberCountRes.mjoyfood_add_count,
                    name: that.$t("report.MjoyfoodApp"),
                },
            ];
            that.memberChart(
                date
            );
        },
        memberChart(data, unitTile) {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init( document.getElementById("myChart"));
            // 绘制图表
            myChart.setOption({
                tooltip: {
                    trigger: "item",
                    position: 'inside',
                    formatter: "{b} : {c} ({d}%)",
                },
                color: ["#2082ED", "#FE813C","#F7B500"],
                legend: {
                    top: "20",
                    left: "10",
                    data: data,
                },
                series: [
                    {
                        //显示指示线
                        name: unitTile,
                        type: "pie",
                        radius: "50%", //饼图的半径大小
                        center: ["50%", "55%"], //饼图的位置
                        data:data,
                        itemStyle: {
                            normal: {
                                //指示线上的文本显示
                                label: {
                                    show: true,
                                    position: "",
                                    formatter: "{c} ", //数值
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
                        radius: "50%",
                        center: ["50%", "55%"],
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
        // 会员订单支付方式
        memberOrderChartClick() {
            let date = [];
            let that = this;
            for (let i in that.payTypeRes.list) {
                    date.push({
                    value:this.stringutils.formatPrice(that.payTypeRes.list[i].count),
                    name: that.payTypeRes.list[i].name,})
                }
                that.memberOrderChart(date,'会员订单');
        },
        memberOrderChart(data, unitTile) {
            // 基于准备好的dom，初始化echarts实例
            let myChart1 = this.$echarts.init( document.getElementById("myChart1"));
            // 绘制图表
            myChart1.setOption({
                tooltip: {
                    trigger: "item",
                    position: 'inside',
                    formatter:function(data){ 
                        return data.name +' : '+data.value + '('+data.percent.toFixed(2)+"%" +')' ;
                    },
                },
                color: this.echColorList,
                    
                legend: {
                    top: "20",
                    left: "10",
                    data: data,
                },
                series: [
                    {
                        //显示指示线
                        name: unitTile,
                        type: "pie",
                        radius: "50%", //饼图的半径大小
                        center: ["55%", "70%"], //饼图的位置
                        data:data,
                        itemStyle: {
                            normal: {
                                //指示线上的文本显示
                                label: {
                                    show: true,
                                    position: "",
                                    formatter: "{c} ", //数值
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
                        radius: "50%",
                        center: ["55%", "70%"],
                        data: data,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    formatter:function(data){ 
                                        return data.percent.toFixed(2)+"%" ;
                                    },
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
        // 会员订单优惠方式
        memberDiscountChartClick() {
            let that = this;
            var date = [
                {
                    value:this.stringutils.formatPrice(that.memberDiscountRes.member_price_amount),
                    name: that.$t("report.vipPrice"),
                },
                {
                    value:this.stringutils.formatPrice(that.memberDiscountRes.discount_amount),
                    name: that.$t("report.zhengdanOff"),
                },
                {
                    value:this.stringutils.formatPrice(that.memberDiscountRes.point_user_amount),
                    name: that.$t("report.vipJifen"),
                },
            ];
            that.memberDiscountChart(
                date,
                that.$t("accountsDetail.discountPrice")
            );
        },
        memberDiscountChart(data, unitTile) {
            // 基于准备好的dom，初始化echarts实例
            let myChart2 = this.$echarts.init( document.getElementById("myChart2"));
            // 绘制图表
            myChart2.setOption({
                tooltip: {
                    trigger: "item",
                    position:  ['14%', '50%'],
                    formatter:function(data){ 
                        return data.name +' : '+data.value + '('+data.percent.toFixed(2)+"%" +')' ;
                    },
                },
                color: ["#2082ED", "#FE813C","#30CFB7"],
                legend: {
                    top: "20",
                    left: "10",
                    data: data,
                },
                series: [
                    {
                        //显示指示线
                        name: unitTile,
                        type: "pie",
                        radius: "50%", //饼图的半径大小
                        center: ["50%", "55%"], //饼图的位置
                        data:data,
                        itemStyle: {
                            normal: {
                                //指示线上的文本显示
                                label: {
                                    show: true,
                                    formatter: "{c} ", //数值
                                    
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
                        radius: "50%",
                        center: ["50%", "55%"],
                        data: data,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    formatter:function(data){ return data.percent.toFixed(2)+"%";},
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
    },
    mounted() {},
    watch: {
        currentStore: {
            handler(newVal, oldVal) {
                if (newVal != undefined && newVal != null) {
                   this.memberManageData()
                }
            },
        },
    },
};
</script>
<style scoped>
.countDiv {
  background: white;
  height: 100px;
  border-radius: 6px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
}
.greenAdd{
    color:#64D274
}
.redLess{
    color: #FE5353;
}
.text{
    transform: scale(0.83);
    display: inline-block;
    font-size: 10px;
}
.colorBlack{
    color: #303336;
}
.leftDiv{
    display: inline-block;
    width: 60%;
    text-align: center;
    border-right: 1px solid #EFF1F2;
    margin: 24px 0px 17px;
}
.rightDiv{
    display: inline-block;
    text-align: center;
    width: 40%;
}
.rightDiv p,.leftDiv p{
    color: rgb(35, 36, 38);
    font-size: 22px;
    font-weight: bold;
    margin: 0px;
}
</style>