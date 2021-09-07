<!--
 * @Author: zzt
 * @Date: 2021-04-06 14:27:34
 * @LastEditTime: 2021-05-12 14:06:16
 * @LastEditors: Please set LastEditors
 * @Description: 订单明细筛选组件
 * @FilePath: \sjoyOrderingManagerH5\src\views\report\components\ReportSelect.vue
-->
<template>
    <div class="main-layout reportSelect">
        <!-- 堂食 -->
        <!-- v-if="takeoutFlag == 0" -->
        <div>
            <!-- <div class="row top20">
                <div class="col-35 seacherSelect">
                    <el-select class="store-select" v-model="itemValue" size="small">
                        <el-option
                            v-for="item in selectOption"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </div>
                <div  class="col-65 orderIdInput">
                    <input
                        v-if="itemValue == 0"
                        v-model="orderIdInput"
                        type="text"
                        :placeholder="$t('orderDetail.inputOrderNum')"
                        class="searchCss"
                    />
                    <input
                        v-else
                        v-model="nameInput"
                        type="text"
                        :placeholder="$t('orderDetail.inputWaiterName')"
                        class="searchCss"
                    />
                    <img
                        src="../../../style/images/clo.png"
                        class="imgClearText"
                        @click="imgClearText"
                    />
                </div>
            </div> -->
            
            <!-- 订单单号 -->
            <div class="row top20">
                <div class="col-100 font14 fontWeight">
                    {{$t('orderDetail.orderNo')}}
                </div>
                <div class="col-100">
                    <input
                        v-if="itemValue == 0"
                        v-model="orderIdInput"
                        type="text"
                        :placeholder="$t('orderDetail.inputOrderNum')"
                        class="searchCss"
                    />
                </div>
            </div>
            <!-- 服务员 -->
            <div class="row top20">
                <div class="col-100 font14 fontWeight">
                    {{$t('orderDetail.fuwuyuan')}}
                </div>
                <div class="col-100">
                    <input
                        v-model="nameInput"
                        type="text"
                        :placeholder="$t('orderDetail.inputWaiterName')"
                        class="searchCss"
                    />
                </div>
            </div>
            <!-- 营业模式（新加） -->
            <div class="row top20">
                <div class="col-100 font14 fontWeight">
                   {{$t('orderDetail.businessMode')}}
                </div>
                <div class="col-100">
                    <span
                        class="button button-round font12 top10"
                        @click="businessType = item.id"
                        :class="businessType == item.id ? 'active' : 'unActive'"
                        v-for="(item, index) in businessTypeTits"
                        :key="index"
                        >{{ item.name }}</span
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
                        @click="eatType = item.id"
                        :class="eatType == item.id ? 'active' : 'unActive'"
                        v-for="(item, index) in eatTypeTits"
                        :key="index"
                        >{{ item.name }}</span
                    >
                </div>
            </div>
            <!-- 订单来源 -->
            <div class="row top20">
                <div class="col-100 font14 fontWeight">
                    {{ $t("orderDetail.orderCome_") }}
                </div>
                <div class="col-100">
                    <span
                        class="button button-round font12 top10"
                        @click="orderSource = item.id"
                        :class="orderSource == item.id ? 'active' : 'unActive'"
                        v-for="(item, index) in orderSourceTits"
                        :key="index"
                        >{{ item.name }}</span
                    >
                </div>
            </div>
            <!-- 订单状态 -->
            <div class="row top20">
                <div class="col-100 font14 fontWeight">
                    {{ $t("orderDetail.orderState") }}
                </div>
                <div class="col-100">
                    <span
                        class="button button-round font12 top10"
                        @click="orderStatus = item.id"
                        :class="orderStatus == item.id ? 'active' : 'unActive'"
                        v-for="(item, index) in orderStatusTits"
                        :key="index"
                        >{{ item.name }}</span
                    >
                </div>
            </div>
            <!-- 优惠方式 -->
            <div class="row top20">
                <div class="col-100 font14 fontWeight">
                    {{ $t("orderDetail.sales_") }}
                </div>
                <div class="col-100">
                    <span
                        class="button button-round font12 top10"
                        @click="preferentialType = item.id"
                        :class="
                            preferentialType == item.id ? 'active' : 'unActive'
                        "
                        v-for="(item, index) in preferentialTypeTits"
                        :key="index"
                        >{{ item.name }}</span
                    >
                </div>
            </div>
            <!-- 支付方式 -->
            <div class="row payment-box">
                <div class="col-100 font14 fontWeight">
                    {{ $t("orderDetail.payType_") }}
                </div>
                <div class="payment-oh">
                    <div
                        class="payment-fl"
                        v-for="(item, index) in payTypeOptions"
                        :key="index"
                    >
                        <span
                            class="button button-round font12 top10"
                            @click="payTypeTit = item.id"
                            :class="
                                payTypeTit == item.id ? 'active' : 'unActive'
                            "
                        >
                            {{ item.dict }}
                        </span>
                    </div>
                    <div
                        v-for="(item, index) in payTypeOptions"
                        :key="index"
                    >
                        <div
                            class="payment-list"
                            v-if="payTypeTit == item.id"
                        >
                            <span
                                v-for="(listItem, index) in item.e_wallet"
                                :key="index"
                                @click="payTypeId = listItem.id"
                                :class="
                                    payTypeId == listItem.id
                                        ? 'active'
                                        : 'unActive'
                                "
                                >{{ listItem.dict }}</span
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 外卖 -->
        <!-- v-if="takeoutFlag == 1" -->
        <!-- <div> -->
            <!-- <div class="row top20">
                <div class="col-100 orderIdInput">
                    <input
                        v-if="itemValue == 0"
                        v-model="deliverInput"
                        type="text"
                        class="searchCss"
                        :placeholder="$t('orderDetail.inputString')"
                    />
                    <img
                        src="../../../style/images/clo.png"
                        class="imgClearText"
                        @click="imgClearText"
                    />
                </div>
            </div> -->
            <!-- 外卖--订单状态 -->
            <!-- <div class="row top20">
                <div class="col-100 ">
                    {{ $t("takeoutOrder.orderState") }}：
                </div>
                <div class="col-100">
                    <span
                        class="button button-round font12 top10"
                        @click="orderState = item.id"
                        :class="orderState == item.id ? 'active' : 'unActive'"
                        v-for="(item, index) in orderStateTits"
                        :key="index"
                        >{{ item.name }}</span
                    >
                </div>
            </div> -->
            <!-- 已退款原因 -->
            <!-- <div v-if="orderState == 3" class="row font14 top10">
                <div class="col-100 ">
                    {{ $t("takeoutOrder.refund_reason") }}：
                </div>
                <div class="col-100 top10">
                    <el-select
                        :placeholder="$t('accountsDetail.returnWhyPH')"
                        v-model="backDishId"
                        style="border: 1px #d3d9e2 solid; width: 90%"
                    >
                        <el-option
                            v-for="(item, index) in backdishOptions"
                            :value="item.id"
                            :label="item.dictName"
                            :key="index"
                        ></el-option>
                    </el-select>
                </div>
            </div> -->
            <!-- 已取消原因 -->
            <!-- <div
                v-if="orderState == 2"
                class="row top10 font14"
                style="padding: 10px 0"
            >
                <div class="col-100 ">
                    {{ $t("takeoutOrder.cancel_reason") }}：
                </div>
                <div class="col-100 top10">
                    <el-select
                        :placeholder="$t('orderDetail.selectCanceReason')"
                        v-model="cancelValue"
                        @change="valueChangeF"
                        style="border: 1px #d3d9e2 solid; width: 90%"
                    >
                        <el-option
                            v-for="(item, index) in diancanType"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </div>
                <div v-if="cancelValue == 3" class="col-100 top10">
                    <el-select
                        :placeholder="$t('orderDetail.select')"
                        v-model="cancelDishId"
                        size="small"
                        style="border: 1px #d3d9e2 solid; width: 90%"
                    >
                        <el-option
                            v-for="(item, index) in cancelOptions"
                            :key="index"
                            :label="item.dictName"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </div>
            </div> -->
            <!-- 外卖--配送服务 -->
            <!-- <div class="row top20">
                <div class="col-100 ">
                    {{ $t("takeoutOrder.peisongFuwu") }}：
                </div>
                <div class="col-100">
                    <span class="button button-round font12 top10"></span>
                </div>
            </div> -->
            <!--外卖-- 支付方式 -->
            <!-- <div class="row" style="padding: 10px 0 100px">
                <div class="col-100 ">
                    {{ $t("orderDetail.payType_") }}
                </div>
                <div class="col-100">
                    <span
                        class="button button-round font12 top10"
                        v-for="(item, index) in dictTypeOptions"
                        :key="index"
                        @click="dictType = item.id"
                        :class="dictType == item.id ? 'active' : 'unActive'"
                        >{{ item.dictName }}</span
                    >
                </div>
            </div> -->
        <!-- </div> -->

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
</template>

<script>
export default {
    name: "ReportSelect",
    components: {
    },
    props: {
        morePage: {
            type: Boolean,
            default: false,
        },
       
    },
    computed: {
        currentStore: {
            get() {
                return this.$store.getters.currentStore;
            },
            set(val) {},
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
            dep_ID: '',
            daySelect: 0,
            resData: {}, //传递数据源
            itemValue: 0,
            selectOption: [
                { id: 0, name: this.$t("accountsDetail.orderNum") },
                { id: 1, name: this.$t("orderDetail.waiterName") },
            ],
            takeoutFlag: 0, //堂食为0，外卖为1 状态

            /*
              --- 堂食
            */
            orderIdInput: "", //输入框筛选  订单id
            nameInput: "", //输入框筛选  服务员名称
            eatType: -1, //就餐类型
            eatTypeTits: [
                { name: this.$t("orderDetail.tangshi"), id: 0 },
                { name: this.$t("orderDetail.waidai"), id: 1 },
                { name: this.$t("orderDetail.bfwaidai"), id: 2 },
            ],
            businessType: '',
            businessTypeTits: [
                { name: this.$t("orderDetail.mode1"), id: '1' },
                { name: this.$t("orderDetail.mode2"), id: '2' },
                { name: this.$t("orderDetail.mode3"), id: '0' },
            ],
            orderSource: -1, //订单来源
            orderSourceTits: [
                { name: this.$t("orderDetail.saoma"), id: 0 },
                { name: this.$t("orderDetail.shouyin"), id: 1 },
                { name: this.$t("report.waiterApp")+"(HD)", id: 2 },
            ],
            orderStatus: -1, //订单状态
            orderStatusTits: [
                { name: this.$t("orderDetail.weifukuan"), id: 0 },
                { name: this.$t("orderDetail.yifukuan"), id: 1 },
                { name: this.$t("orderDetail.yichedan"), id: 2 },
                { name: this.$t("orderDetail.youtuikuan"), id: 3 },
                { name: this.$t("orderDetail.Refused"), id: 4 },
            ],
            preferentialType: -1, //优惠方式
            preferentialTypeTits: [
                { name: this.$t("orderDetail.noDiscount"), id: '1' },
                { name: this.$t("orderDetail.caipincuxiao"), id: '2' },
                { name: this.$t("orderDetail.jiezhangyouhui"), id: '3' },
                { name: this.$t("orderDetail.huiyuanyouhui"), id: '4' },
                // { name: this.$t("orderDetail.youuhijuan"), id: '5' },
            ],

            payTypeOptions: [], //支付方式
            payTypeTit: null,
            payTypeId: "",

            /*
              --- 外卖
            */
            deliverInput: "", //输入框筛选
            orderState: -1, //订单状态
            orderStateTits: [
                { name: this.$t("orderDetail.all"), id: -1 },
                { name: this.$t("orderDetail.yiwancheng"), id: 1 },
                { name: this.$t("orderDetail.yituikuan"), id: 3 },
                { name: this.$t("orderDetail.cancel"), id: 2 },
            ],
            //1.已退款
            backdishOptions: [],
            backDishId: "",
            //2.已取消
            cancelValue: "",
            cancelDishId: "",
            cancelOptions: [],
            diancanType: [
                {
                    value: "-1",
                    label: this.$t("all"),
                },
                {
                    value: "0",
                    label: this.$t("takeoutOrder.gukeUnpay"),
                },
                {
                    value: "1",
                    label: this.$t("takeoutOrder.gukeCancelOrder"),
                },
                {
                    value: "2",
                    label: this.$t("takeoutOrder.shangjiachaoshi"),
                },
                {
                    value: "3",
                    label: this.$t("takeoutOrder.shangjiaCancel"),
                },
            ],
            dictTypeOptions: [], //支付方式
            dictType: -1,
            selectPayType: [],
         
           
            
        };
    },
    methods: {
        //重置
        resetClick() {
            if (this.takeoutFlag == 0) {
                this.orderIdInput = "";
                this.nameInput = "";
                this.eatType = -1;
                this.orderSource = -1;
                this.orderStatus = -1;
                this.preferentialType = -1;
                this.payTypeTit = null;
                this.payTypeId = "";
                this.businessType = "";
            } else if (this.takeoutFlag == 1) {
                this.orderState = -1;
                this.backDishId = "";
                this.deliverInput = "";
                this.dictType = -1;
                this.cancelValue = "";
                this.cancelDishId = "";
            } else {
                return false;
            }
            // console.log(this.resData);
        },
        //完成
        confirmClick() {
            if (this.takeoutFlag == 0) {
                /*
                --- 堂食
                */
                this.resData.order_id = this.orderIdInput; //输入框筛选  订单id
                this.resData.name = this.nameInput; //输入框筛选  服务员名称
                this.resData.eat_type = this.eatType; //就餐类型
                this.resData.order_source = this.orderSource; //订单来源
                this.resData.order_state = this.orderStatus; //订单状态
                this.resData.preferential_type = this.preferentialType; //优惠方式
                this.resData.code_mode = this.businessType; //营业模式
                this.resData.start_time = sessionStorage.getItem('start_time');
                this.resData.end_time = sessionStorage.getItem('end_time');
                //支付方式
                if (this.payTypeTit == null) {
                    this.resData.pay_type = -1;
                    this.resData.pay_typeTit = -1;
                } else {
                    if (this.payTypeId != -1) {
                        this.resData.pay_typeTit = this.payTypeTit;
                        this.resData.pay_type = this.payTypeId;
                    } else {
                        this.toast.fail(this.$t("orderDetail.selectPayType"));
                        return false;
                    }
                }
            } else if (this.takeoutFlag == 1) {
                /*
                --- 外卖
                */
                this.resData.order_state = this.orderState; //订单状态
                this.resData.exception_note_id = this.backDishId; //退款原因
                this.resData.deliver_name = this.deliverInput; //输入框筛选
                this.resData.pay_type = this.dictType; //支付方式
                this.resData.reject_reason = this.cancelValue; //取消原因
                this.resData.reject_reason_id = this.cancelDishId; //取消原因---商家取消订单
                //判断当前订单状态 是否是 3已退款 2已取消
                if (
                    (this.orderState == 3 && this.backDishId == "") ||
                    (this.orderState == 2 && this.cancelValue == "") ||
                    (this.cancelValue == 3 && this.cancelDishId == "")
                ) {
                    this.toast.fail(this.$t("orderDetail.selecReason"));
                    return false;
                }
            } else {
                return false;
            }
            // console.log(this.resData);
            let propObj = {resData:this.resData,isShow:false};
            this.$emit("confirmClick", propObj);
        },
        //x清除input text
        imgClearText() {
            if (
                this.orderIdInput !== "" ||
                this.nameInput !== "" ||
                this.deliverInput !== ""
            ) {
                this.orderIdInput = "";
                this.nameInput = "";
                this.deliverInput = "";
            } else {
                return false;
            }
        },
        //获取订单明细报表需要筛选的支付方式
        getDepPayTypeForReport() {
            let that = this;
            let data = { dep_id: this.currentStore.dep_ID };
            this.request.getDepPayTypeForReport(data, function (res) {
                if (res.code == "1") {
                    that.payTypeOptions = [];
                    let res_data = res.data;
                    res_data = res_data.filter(item=>item.e_wallet.length!=0&&item.e_wallet!=null);
                    that.payTypeOptions = res_data;
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        // 外卖---获取支付方式 接口
        getDlyPayMent() {
            let that = this;
            let paramData = {
                dep_id: this.currentStore.dep_ID,
                company_id: this.currentStore.faher_ID,
            };
            this.request.getDlyPayMent(paramData, function (res) {
                if (res.code == "1") {
                    let resData = res.data;
                    let zhCNData = [{ dictName: "全部", id: "-1" }];
                    let enUSData = [{ dictName: "All", id: "-1" }];
                    let msMYData = [{ dictName: "All", id: "-1" }];
                    for (let i in resData) {
                        zhCNData.push({
                            dictName: resData[i].dict_name_cn,
                            id: resData[i].id,
                        });
                        enUSData.push({
                            dictName: resData[i].dict_name_en,
                            id: resData[i].id,
                        });
                        msMYData.push({
                            dictName: resData[i].dict_name_my,
                            id: resData[i].id,
                        });
                    }
                    if (that.language == "zh_CN") {
                        that.dictTypeOptions = zhCNData;
                    } else if (that.language == "en_US") {
                        that.dictTypeOptions = enUSData;
                    } else if (that.language == "ms_MY") {
                        that.dictTypeOptions = msMYData;
                    } else {
                        return false;
                    }
                    sessionStorage.setItem(
                        "dictTypeOptions",
                        JSON.stringify(that.dictTypeOptions)
                    );
                    // console.log(that.dictTypeOptions);
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },

        //外卖--获取商家退款原因 接口
        refundReason() {
            let that = this;
            let data = { dept_id: this.currentStore.dep_ID };
            this.request.refundReason(data, function (res) {
                if (res.code == "1") {
                    let resData = res.data;
                    // console.log(resData);
                    let zhCNData = [{ dictName: "全部", id: "-1" }];
                    let enUSData = [{ dictName: "All", id: "-1" }];
                    let msMYData = [{ dictName: "All", id: "-1" }];
                    for (let i in resData) {
                        zhCNData.push({
                            dictName: resData[i].dicName_cn,
                            id: resData[i].id,
                        });
                        enUSData.push({
                            dictName: resData[i].dicName_en,
                            id: resData[i].id,
                        });
                        msMYData.push({
                            dictName: resData[i].dicName_my,
                            id: resData[i].id,
                        });
                    }
                    if (that.language == "zh_CN") {
                        that.backdishOptions = zhCNData;
                    } else if (that.language == "en_US") {
                        that.backdishOptions = enUSData;
                    } else if (that.language == "ms_MY") {
                        that.backdishOptions = msMYData;
                    } else {
                        return false;
                    }
                    sessionStorage.setItem(
                        "selectRefundReason",
                        JSON.stringify(that.backdishOptions)
                    );
                    // console.log(that.backdishOptions);
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        //外卖-- 获取商家取消订单原因
        cancelOrderReason() {
            let that = this;
            this.request.cancelOrderReason({}, function (res) {
                if (res.code == "1") {
                    let resData = res.data;
                    // console.log(resData);
                    let zhCNData = [{ dictName: "全部", id: "-1" }];
                    let enUSData = [{ dictName: "All", id: "-1" }];
                    let msMYData = [{ dictName: "All", id: "-1" }];
                    for (let i in resData) {
                        zhCNData.push({
                            dictName: resData[i].dicName_cn,
                            id: resData[i].id,
                        });
                        enUSData.push({
                            dictName: resData[i].dicName_en,
                            id: resData[i].id,
                        });
                        msMYData.push({
                            dictName: resData[i].dicName_my,
                            id: resData[i].id,
                        });
                    }
                    if (that.language == "zh_CN") {
                        that.cancelOptions = zhCNData;
                    } else if (that.language == "en_US") {
                        that.cancelOptions = enUSData;
                    } else if (that.language == "ms_MY") {
                        that.cancelOptions = msMYData;
                    } else {
                        return false;
                    }
                    sessionStorage.setItem(
                        "cancelOptions",
                        JSON.stringify(that.cancelOptions)
                    );
                    // console.log(that.cancelOptions);
                }
            });
        },
    },
    created() {
        // this.takeoutFlag = this.$route.query.type;
        console.log(
            `当前值为：${this.takeoutFlag},=====${
                this.takeoutFlag == 0 ? "堂食" : "外卖"
            }`
        );
        let getSelectPayType = sessionStorage.getItem("selectPayType"); //堂食--支付方式 缓存
        let getRefundReason = sessionStorage.getItem("selectRefundReason"); //外卖--已退款原因 缓存
        let getDictTypeOptions = sessionStorage.getItem("dictTypeOptions"); //外卖--支付方式 缓存
        let getCancelOptions = sessionStorage.getItem("cancelOptions"); //外卖--获取商家取消订单原因 缓存
        if (this.takeoutFlag == 0) {
            //打开筛选页默认选中上次的筛选条件
            // this.orderIdInput = this.resData.order_id;
            // this.nameInput = this.resData.name;
            // this.orderSource = this.resData.order_source;
            // this.orderStatus = this.resData.order_state;
            // this.eatType = this.resData.eat_type;
            // this.preferentialType = this.resData.preferential_type;
            // this.payTypeId = this.resData.pay_type;
            // this.payTypeTit = this.resData.pay_typeTit;
            //缓存
            if(getSelectPayType){
                this.payTypeOptions = JSON.parse(getSelectPayType);
            }else{
                this.getDepPayTypeForReport();
            }
        } else if (this.takeoutFlag == 1) {
            //打开筛选页默认选中上次的筛选条件
            this.orderState = this.resData.order_state;
            this.backDishId = this.resData.exception_note_id;
            this.deliverInput = this.resData.deliver_name;
            this.dictType = this.resData.pay_type;
            this.cancelValue = this.resData.reject_reason;
            this.cancelDishId = this.resData.reject_reason_id;
            //缓存
            if (getRefundReason && getDictTypeOptions && getCancelOptions) {
                this.backdishOptions = JSON.parse(getRefundReason);
                this.dictTypeOptions = JSON.parse(getDictTypeOptions);
                this.cancelOptions = JSON.parse(getCancelOptions);
            } else {
                this.getDlyPayMent();
                this.refundReason();
                this.cancelOrderReason();
            }
        } else {
            return false;
        }
    },
    watch: {
        //外卖----已退款 已取消 筛选条件互斥
        orderState(newVal, oldVal) {
            if (newVal == 2) {
                this.backDishId = "";
            }
            if (newVal == 3) {
                this.cancelValue = "";
                this.cancelDishId = "";
            }
        },
    },
};
</script>
<style scoped>
</style>