<!--
 * @Author: zzt
 * @Date: 2021-04-06 20:00:43
 * @LastEditTime: 2021-05-11 15:36:28
 * @LastEditors: Please set LastEditors
 * @Description: 促销分析
 * @FilePath: \sjoyOrderingManagerH5\src\views\report\pages\promotionReport.vue
-->
<template>
    <div class="main-layout">
        <div class="row padding15 ">
            <div class="col-100">
                <SelectStore :dep_ID="dep_ID"></SelectStore>
            </div>
        </div>
        <div class="row dateSelect" style="padding:0 15px;">
            <div class="col-100">
                <ScreenData 
                    @changeScreenClick="changeScreenClick" 
                    :screenData="screenDataIndex"
                    :isStyleBlock = 'true'
                ></ScreenData>
            </div>
        </div>
        <div class="row">
            <div class="col-100 font12 timeShow">
                <span>{{ $t("dataRange") }}：</span>
                <span>{{ getTimeRange }}</span>
            </div>
        </div>
        <div class="row">
            <div class="col-100">
                <ul class="proCount row" style="padding: 15px">
                    <li class="col-50">
                        <span class="font12">{{$t('report.promotionAmount')}}</span>
                        <span class="proSpan">{{proData.total_amount | price}}</span>
                    </li>
                    <li class="col-50">
                        <span class="font12">
                            {{$t('report.promotionNumber')}}
                            <el-popover
                                placement="top-start"
                                trigger="click"
                                style="margin-right: 5px"
                                :content="$t('report.promotionCont')"
                            >
                                <img
                                    slot="reference"
                                    src="../../../style/toolsImg/tip.png"
                                    alt=""
                                    width="9"
                                    style="position: relative; left: 2px; top: -5px"
                                />
                            </el-popover>
                        </span>
                        <span class="proSpan">{{proData.total_num}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 菜品促销 -->
        <div class="row padding15">
            <div class="col-100">
                <span class="font16 fontWeight" style="color:#393939">{{$t('report.dishPromotion')}}</span>
                <span @click="dishProClick(1)" class="font12" style="float:right;color:#FE813C">{{$t('report.detail')}} 》</span>
            </div>
            <div class="col-100 top10">
                <ul class="row dateUl">
                    <li class="col-50">
                        <span class="dateNum">{{dishData.total_amount | price}}</span>
                        <span class="dateCount">{{$t('report.price')}}</span>
                    </li>
                    <li class="col-50">
                        <span class="dateNum">{{dishData.total_num}}</span>
                        <span class="dateCount">{{$t('report.number')}}</span>
                    </li>
                </ul>
            </div>
            <div class="col-100 reportBtn top15">
                 <p  class="buttons-row" style=" margin: 0px;padding: 0px;float: right;">
                    <a style="margin-right: 0" class="button button-round" @click="discountTypeClick(0)" :class="{active: discountType == 0}">{{ $t("report.anPrice") }}</a>
                    <a class="button button-round" @click="discountTypeClick(1)" :class="{ active: discountType == 1}">{{ $t("report.anDanNum") }}</a>
                </p>
            </div>
            <div class="col-100 top10">
                <div id="myChart1" :style="{ width: '100%', height: '300px',}"></div>
            </div>
        </div>
        <!-- 结账优惠 -->
        <div class="row padding15">
            <div class="col-100">
                <span class="font16 fontWeight" style="color:#393939">{{$t('report.jiezhangyouhui')}}</span>
                <span @click="dishProClick(2)" class="font12" style="float:right;color:#FE813C">{{$t('report.detail')}} 》</span>
            </div>
            <div class="col-100 top10">
                <ul class="row dateUl">
                    <li class="col-50">
                        <span class="dateNum">{{settleData.total_amount | price}}</span>
                        <span class="dateCount">{{$t('report.price')}}</span>
                    </li>
                    <li class="col-50">
                        <span class="dateNum">{{settleData.total_num}}</span>
                        <span class="dateCount">{{$t('report.number')}}</span>
                    </li>
                </ul>
            </div>
            <div class="col-100 reportBtn top15">
                 <p  class="buttons-row" style=" margin: 0;padding: 0;float: right;">
                    <a style="margin-right: 0" class="button button-round" @click="zhifuSelectClick(0)" :class="{active: zhifuSelect == 0}">{{ $t("report.anPrice") }}</a>
                    <a class="button button-round" @click="zhifuSelectClick(1)" :class="{ active: zhifuSelect == 1}">{{ $t("report.anDanNum") }}</a>
                </p>
            </div>
            <div class="col-100 top10">
                <div id="myChart2" :style="{ width: '100%', height: '300px',}"></div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "promotionReport",
    components: {
        SelectStore: (resolve) => require(["../components/SelectStore"], resolve),
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
            set(val) {}
        }
    },
    data() {
        return {
            dep_ID: '',
            daySelect: 0,
            requestData:{
                dep_id: "-1", //门店id
                end_time: 0, //统计结束时间，格式yyyyMMdd 今日为4 昨日为1，本周为2，本月为3，自定义就是yyyyMMdd格式 ,
                start_time: 0, //统计开始时间,格式yyyyMMdd 今日为4 昨日为1，本周为2，本月为3，自定义就是yyyyMMdd格式 ,
            },
            proData:{},
            settleData:{},
            dishData:{},
            discountType:0,
            zhifuSelect:0,
            // 新版时间范围筛选
            isRestData:true,
            screenDataIndex:0,
            
            getTimeRange: "", //时间范围
        };
    },
    methods: {
        // 快捷时间选择
        changeScreenClick(start,end,index,isRestData){
            this.screenDataIndex = index;
            this.requestData.start_time = this.moment(start).format("YYYYMMDD");
            this.requestData.end_time = this.moment(end).format("YYYYMMDD");
            this.isRestData = isRestData;
            if(start!=null&&end!=null){
                this.promotionData();
            }
        },
        // 跳转详情
        dishProClick(val){
            let curType = String(val);
            let curToken = this.$route.query.token;
            let curDepId = this.currentStore.dep_ID;
            let curLang = this.$route.query.lang;
            this.$router.push({ path: "/dishProDetail", query: { type:curType,token:curToken,dep_ID:curDepId,lang: curLang}});
        },
        // 菜品促销echarts切换
        discountTypeClick(isNum){
            this.discountType = isNum;
            let that = this;
            let data = [];
            for (let i in this.dishData.list) {
                data.push({ value:isNum == 1? this.dishData.list[i].num:this.stringutils.formatPrice(this.dishData.list[i].count),name: this.dishData.list[i].name});
            }

            that.drawDiscountType(
                data,
                isNum == 1 ? this.$t("report.danshu") : this.$t("report.price"),
                isNum == 1 ? "单数" : ""
            );
        },
       
        drawDiscountType(data, unitTile, unit) {
            let myChart1 = this.$echarts.init(
                document.getElementById("myChart1")
            );
            myChart1.setOption({
                tooltip: {
                    trigger: "item",
                    position: 'inside',
                    formatter: "{a} <br/>{b} : {c} ({d}%)",
                },
                color: [
                    "#EB3C1C",
                    "#00CCCC",
                    "#42CD3C",
                    "#4C9BF0",
                    "#F46F24",
                    "#E4C269",
                    "#6DD2D2"
                ],
                legend: {
                    left: "left",
                    data: data,
                },
                series: [
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
                                    formatter: "{c} " + unit, //数值
                                    position: "",
                                    textStyle: {
                                        fontSize: 12,
                                        color: "#303336",
                                        fontWeight: "bolder",
                                    },
                                },
                                labelLine: { show: true },
                            },
                        },
                    },
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
                                    position: "inner",
                                    formatter: "{d}%",
                                    textStyle: {
                                        fontWeight: 300,
                                        fontSize: 12, //文字的字体大小
                                    },
                                },
                                labelLine: {
                                    show: true,
                                },
                                
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
        // 结账优惠echarts切换
        zhifuSelectClick(isNum){
            this.zhifuSelect = isNum;
            let that = this;
            let data = [];
            for (let i in this.settleData.list) {
                data.push({ value:isNum == 1? this.settleData.list[i].num:this.stringutils.formatPrice(this.settleData.list[i].count),name: this.settleData.list[i].name});
            }

            that.drawZhifu(
                data,
                isNum == 1 ? this.$t("report.danshu") : this.$t("report.price"),
                isNum == 1 ? "单数" : ""
            );
        },
        drawZhifu(data, unitTile, unit) {
            let myChart2 = this.$echarts.init(
                document.getElementById("myChart2")
            );
            myChart2.setOption({
                tooltip: {
                    trigger: "item",
                    position: 'inside',
                    formatter: "{a} <br/>{b} : {c} ({d}%)",
                },
                color: [
                    "#EB3C1C",
                    "#00CCCC",
                    "#42CD3C",
                    "#4C9BF0",
                    "#F46F24",
                    "#E4C269",
                    "#6DD2D2"
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
        // 促销分析数据概览
        promotionData(){
            let that = this
            this.requestData.dep_id = this.currentStore.dep_ID; //门店id
            this.request.promotionData(this.requestData, function (res) {
                if (res.code == "1") {
                    // 时间范围转换
                    //06/02/2021 01:00 - 07/02/2021 00:59
                    let timeRange = res.data.timeRange;
                    let startTime = that.moment(timeRange.startTime).format("MM/DD/YYYY");
                    let endTime = that.moment(timeRange.endTime).format("MM/DD/YYYY");
                    that.getTimeRange = `${startTime} ${timeRange.fontTime} - ${endTime} ${timeRange.backTime}`;
                    let res_data = res.data;
                    // console.log(res_data);
                    that.proData = res_data;
                    that.dishData = res_data.dishData
                    that.settleData = res_data.settleData;
                    that.discountTypeClick(0);
                    that.zhifuSelectClick(0);
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
        
    },
    watch: {
        currentStore: {
            handler(newVal, oldVal) {
                if (newVal != undefined && newVal != null) {
                    this.promotionData();
                }
            },
        },
    },
};
</script>
<style scoped>

.proCount li{
    display: inline-block;
    margin-right: 12px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    padding: 10px;
    border-radius: 6px;
}
.proCount li:last-child{
    margin-right: 0;
}
.proCount li .proSpan{
    color: #FE813C;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    display: block;
    margin: 6px 0 20px 0;
}
.dateUl li{
    display: inline-block;
    border-right: 1px #EFF1F2 solid;
}
.dateUl li:last-child{
    border-right: none;
}
.dateUl li .dateCount{
    font-size: 12px;
    color: #303336;
    margin-top: 6px;
    display: inline-block;
}
.dateUl li .dateNum{
    color: #232426;
    font-size: 22px;
    display: block;
    font-weight: bold;
}
.dateUl{
    border-radius: 6px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    padding: 18px 0px;
    text-align: center;
}

</style>