<!--
 * @Author: zzt
 * @Date: 2021-04-06 20:00:43
 * @LastEditTime: 2021-05-20 17:58:07
 * @LastEditors: Please set LastEditors
 * @Description: 菜品促销详情
 * @FilePath: \sjoyOrderingManagerH5\src\views\report\pages\dishProDetail.vue
-->
<template>
    <div class="main-layout reports">
        <div class="row padding15">
            <div class="col-100">
                <a
                    class="button button-round downBtn"
                    style="margin-right:25px;"
                    @click="downloadCLick"
                >
                    {{ $t("report.downReport") }}
                    <img
                        src="../../../assets/images/downloadReport.png"
                        alt
                        class="downImg"
                    />
                </a>
                <a
                    class="moreScreen right"
                    @click="moreClick"
                    style="position: absolute; right: 15px; margin-top: 5px"
                >
                    <img src="../../../style/images/select.png" width="16" />
                </a>
            </div>
        </div>
        <div class="row">
            <div class="col-100 font12 timeShow">
                <span>{{$t('dataRange')}}：</span>
                <span>{{ getTimeRange }}</span>
            </div>
        </div>
        <div class="row">
            <div class="col-100 font12 padding15" style="color: #505050;">
                {{$t('report.discountPrice')}}：<span style="color: #fe813e; margin-right: 20px"
                    >{{totalAmount | price}}</span
                >
                {{$t('report.number')}}：<span style="color: #fe813e">{{totalNum}}</span>
            </div>
            <div class="col-100">
                <div class="data-table font10" style="padding: 0 15px;">
                    <table
                        class="storeTable"
                    >
                        <thead>
                            <tr>
                                <th class="numeric-cell">{{$t('report.promotionType')}}</th>
                                <th class="numeric-cell">{{$t('report.activityName')}}</th>
                                <th class="numeric-cell">{{$t('report.status')}}</th>
                                <th class="numeric-cell">{{$t('report.number')}}</th>
                                <th class="numeric-cell">{{$t('report.discountPrice')}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                               v-for="(item,index) in dataTable"
                               :key="index"
                            >
                                <td class="numeric-cell">{{item.promotion_type_name}}</td>
                                <td class="numeric-cell">{{item.name |text}}</td>
                                <td class="numeric-cell">{{item.status_name |text}}</td>  
                                <td class="numeric-cell">{{item.promotion_num}}</td>  
                                <td class="numeric-cell">{{item.promotion_amount |price}}</td>      
                            </tr>
                                                        
                        </tbody>
                    </table>
                    <!-- 暂无数据 -->
                    <div
                        class="noData-warp"
                        v-if="dataTable == null || dataTable.length == 0"
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
                <!-- 活动渠道 -->
                <div class="row top20">
                    <div class="col-100 font14 fontWeight">{{$t('report.activityChannel')}}</div>
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
                <!-- 促销类型 -->
                <div class="row top20">
                    <div class="col-100 font14 fontWeight">{{$t('report.promotionType')}}</div>
                    <div class="col-100" v-if="currType==1">
                        <a  
                            class="button button-round font12"
                            @click="getCouponClick(index,item.type)"
                            :class="getCouponIndex == index ? 'active' : 'unActive'"
                            v-for="(item,index) in getCouponList1"
                            :key="index"
                            >{{item.name}}</a
                        >
                    </div>
                    <div class="col-100" v-else>
                        <a  
                            class="button button-round font12"
                            @click="getCouponClick(index,item.type)"
                            :class="getCouponIndex == index ? 'active' : 'unActive'"
                            v-for="(item,index) in getCouponList2"
                            :key="index"
                            >{{item.name}}</a
                        >
                    </div>
                </div>
                <!-- 活动名称 -->
                <div class="row top20" v-show="getCouponIndex!=-1">
                    <div class="col-100 font14 fontWeight">{{$t('report.activityName')}}</div>
                    <div class="col-100 top10 salesreport">
                        <el-select
                            class="store-select"
                            v-model="activeNameSpliceId"
                            size="small"
                            style="border: 1px #d8d8d8 solid; width: 100%"
                        >
                            <el-option
                                v-for="(item,index) in activeNameList"
                                :key="index"
                                :label="item.name"
                                :value="item.splice_id"
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
        <van-popup
            v-model="propShow"
            style="border-radius: 15px; width: 80%"
        >
            <EmailPop
                :propShow="propShow"
                title="菜品促销报表"
                :file="file"
                @closeClick="closeClick"
                @sendEmailClick="sendEmailClick"
            ></EmailPop>
        </van-popup>
    </div>
</template>

<script>
export default {
    name: "dishProDetail",
    components: {
        EmailPop: (resolve) => require(["../components/EmailPop"], resolve),
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
            currType:'',//查询的促销优惠方式 1: 菜品促销 2: 结账优惠,
            file: null,
            propShow:false,
            morePage:false,
            dataTable:null,
            totalAmount:0,
            totalNum:0,
            requestData: {
                dep_id: '',
                start_time: 0,
                end_time: 0,
                waiter_service: '',//订单来源: 服务员端，0：服务员点餐，1：扫码点餐,4:外卖
                promotionQueryType:'', //查询的促销优惠方式 1: 菜品促销 2: 结账优惠,
                promotion_type: '', //菜品促销 : 1: 特价 2:买赠 3:第二份优惠 4:会员价 5:手动折扣 6:手动赠菜 结账优惠 : 7: 整单折扣 8: 优惠券 9: 直减 10: 会员整单折扣 11: 会员积分抵现,
                splice_id:'', //拼接的促销活动名称查询条件
                mail: "",
            },
            // 活动渠道
            orderSourceList:[{name:this.$t('report.cashierTerminal'),type:'0'},{name: this.$t('report.scanOrder'),type:'1'},{name:this.$t('report.delivery'),type:'4'}],
            orderSourceIndex:-1,
            getCouponInfoData:null,
            //--促销类型 菜品促销 : 1: 特价 3:买赠 5:第二份优惠 7:会员价 9:手动折扣 11:手动赠菜
            getCouponList1:[{name: this.$t('report.tejia'),type:'1'},{name:this.$t('report.maizeng'),type:'3'},{name:this.$t('report.twoSale'),type:'5'},{name:this.$t('report.vipPrice'),type:'7'},{name:this.$t('report.shoudongOff'),type:'9'},{name:this.$t('report.shoudongzengcai'),type:'11'}],
            //--促销类型 结账优惠 : 2: 整单折扣 4: 优惠券 6: 直减 8: 会员整单折扣 10: 会员积分抵现
            getCouponList2:[{name:this.$t('report.zhengdanOff'),type:'2'},{name:this.$t('report.copon'),type:'4'},{name:this.$t('orderDetail.lijian'),type:'6'},{name:this.$t('report.vipzhekou'),type:'8'},{name:this.$t('report.vipjifen'),type:'10'}], 
            getCouponIndex:-1,
            //活动名称
            activeNameList:[],
            activeNameSpliceId:'',
            // 新版时间范围筛选
            isRestData:true,
            screenDataIndex: 0,
            
            getTimeRange: "", //时间范围
        };
    },
    methods: {
        // 下载报表
        downloadCLick() {
            this.propShow = true;
        },
        closeClick(val) {
            this.propShow = val;
        },
        sendEmailClick(email, isdefault) {
            this.downReport(email, isdefault);
        },
        downReport(email, isdefault) {
            let that = this;
            this.requestData.dep_id =  this.$route.query.dep_ID; //门店id
            this.requestData.mail = email;
            this.requestData.isdefault = isdefault;
            this.request.promotionReport(this.requestData, function (res) {
                if (res.code == "1") {
                    that.toast.success(that.$t("sendSuccess"));
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        
        orderSourceClick(index,val){
            this.orderSourceIndex = index;
            this.requestData.waiter_service = val;
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
            this.promotionReport();
            this.morePage = false;
        },
        // 重置
        resetClick() {
            this.requestData.promotion_type = "";
            this.requestData.waiter_service = "";
            this.orderSourceIndex = -1;
            this.getCouponIndex = -1;
            this.activeNameSpliceId ="";
        },
        getCouponClick(index,val){
            this.getCouponIndex = index;
            this.activeNameSpliceId = "",
            this.activeNameList = [];
            this.getCouponInfoData.forEach(item => {
                if(item.promotion_type==val){
                    this.activeNameList.push(item);
                }
            });
            this.requestData.promotion_type = val;
        },
        
        promotionReport() {
            let that = this;
            this.requestData.dep_id = this.$route.query.dep_ID; 
            this.requestData.promotionQueryType = this.currType;
            this.requestData.splice_id = this.activeNameSpliceId;
            this.requestData.mail = "";
            this.request.promotionReport(this.requestData, function (res) {
                if (res.code == "1") {
                    // 时间范围转换
                    //06/02/2021 01:00 - 07/02/2021 00:59
                    let timeRange = res.data.timeRange;
                    let startTime = that.moment(timeRange.startTime).format("MM/DD/YYYY");
                    let endTime = that.moment(timeRange.endTime).format("MM/DD/YYYY");
                    that.getTimeRange = `${startTime} ${timeRange.fontTime} - ${endTime} ${timeRange.backTime}`;
                    let res_data = res.data;
                    that.dataTable = res_data.list;
                    that.totalAmount = res_data.total_amount;
                    that.totalNum = res_data.total_num;
                    // console.log(res_data);
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        //获取筛选条件原数据
        getCouponInfoSelectList(){
            let that = this;
            let data = {
                dep_id:this.$route.query.dep_ID,
                promotionQueryType: this.currType,

            };
            this.request.getCouponInfoSelectList(data, function (res) {
                if (res.code == "1") {
                    let res_data = res.data;
                    that.getCouponInfoData = res_data;
                    console.log(res_data);
                } else {
                    that.toast.fail(res.msg);
                }
            });

        }
        
    },
    created() {
        this.currType = this.$route.query.type;
        if(this.currType==1){
            document.title = this.$t('report.productDetails');
        }else if(this.currType==2){
           document.title = this.$t('report.collectionDetails');
        }else{
            return false;
        }
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
        this.promotionReport();
        this.getCouponInfoSelectList();
        this.requestData.mail = "";

    },
    
};
</script>
<style scoped>

</style>