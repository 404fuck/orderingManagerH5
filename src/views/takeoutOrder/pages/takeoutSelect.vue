<template>

  <div class="main-layout">
    <!-- 外卖--筛选 -->
    <div class="row"
         style="padding: 10px 16px;">
      <div class="col-100" style="height: 32px;border-radius: 16px;border: none;box-shadow: 0 0 8px 0 rgba(222, 222, 222, 0.5);font-size: 12px;overflow:hidden">
        <input v-if="itemValue == 0"
               v-model="inputText"
               type="text"
               class="searchCss"
               placeholder="请输入订单号、顾客姓名、手机号、服务员等">
               <img src="../../../style/images/clo.png" class="imgClearText" @click="imgClearText">
      </div>
    </div>
    <!-- 外卖--订单日期 -->
    <div class="row"
         style="padding: 10px 16px;">
      <div class="col-100 color-darkbrown">{{$t('takeoutOrder.orderTime')}}</div>
      <div class="col-100">
        <a class="button button-round font12 top10"
           @click="daySelect=0"
           :class="{active:daySelect==0}">{{$t('orderDetail.all')}}</a>
        <a class="button button-round font12 top10"
           @click="daySelect=2"
           :class="{active:daySelect==2}">{{$t('report.yesterday')}}</a>
        <a class="button button-round font12 top10"
           @click="daySelect=1"
           :class="{active:daySelect==1}">{{$t('takeoutOrder.beforeDay')}}</a>
           <a class="button button-round font12 top10"
           @click="daySelect=3"
           :class="{active:daySelect==3}">{{$t('report.diy')}}</a>
      </div>
    </div>
    <div v-if="daySelect ==3">
              <SelectDate @confirmDataClick="confirmDataClick"></SelectDate>
            </div>
    <!-- 外卖--订单状态 -->
    <div class="row"
         style="padding: 10px 16px;">
      <div class="col-100 color-darkbrown">{{$t('takeoutOrder.orderState')}}</div>
      <div class="col-100">
        <a class="button button-round font12 top10"
           @click="resData.order_status =''"
           :class="{active:resData.order_status==''}">{{$t('orderDetail.all')}}</a>
        <a class="button button-round font12 top10"
           @click="resData.order_status=1"
           :class="{active:resData.order_status==1}">已完成</a>
        <a class="button button-round font12 top10"
           @click="resData.order_status=3"
           :class="{active:resData.order_status==3}">{{$t('orderDetail.youtuikuan')}}</a>
        <a class="button button-round font12 top10"
           @click="resData.order_status=2"
           :class="{active:resData.order_status==2}">{{$t('takeoutOrder.cancel')}}</a>
      </div>
    </div>
    <!-- 外卖--配送服务 -->
    <div class="row"
         style="padding: 10px 16px;">
      <div class="col-100 color-darkbrown">{{$t('takeoutOrder.peisongFuwu')}}</div>
      <div class="col-100">
        <a class="button button-round font12 top10"></a>
      </div>
    </div>
    <!-- 支付方式--堂食外卖 -->
    <div class="row"
         style="padding: 10px 16px 80px 16px;">
      <div class="col-100 color-darkbrown">{{$t('orderDetail.payType_')}}</div>
      <div class="col-100">
        <a class="button button-round font12 top10"
           v-for="(item,index) in WpayTypeData"
           :key="index"
           @click="resData.pay_type=item.id"
           :class="{active:resData.pay_type==item.id}">{{item.dict}}</a>
      </div>
    </div>
  
    

    

    <div v-if="resData.order_status == 3" class="row font14" style="padding: 10px 16px 80px 16px;margin-top: -70px;">
      <div class="col-100 color-darkbrown">{{$t('takeoutOrder.refund_reason')}}：</div>
      <div class="col-100 top10">
           <el-select
                    :placeholder="$t('accountsDetail.returnWhyPH')"
                    v-model="resData.refund_reason"
                    style="border: 1px #d3d9e2 solid;width: 90%;"
                  >
                    <el-option
                      v-for="item in backdishOptions"
                      :value="item.content"
                      :key="item.id"
                    >
                    </el-option>
                  </el-select>
      </div>
    </div>
    <!-- 取消原因 -->
    <div v-if="resData.order_status == 2" class="row" style="padding: 10px 16px 80px 16px;margin-top: -70px;">
      <div class="col-100 color-darkbrown">{{$t('takeoutOrder.cancel_reason')}}：</div>
      <div class="col-100 top10" >
           <el-select placeholder="请选择"
                       v-model="resData.withdraw_reason1" @change="valueChangeF" style="border: 1px #d3d9e2 solid;width: 90%;">
              <el-option v-for="item in diancanType"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"
                         ></el-option>
            </el-select>
      </div>
      <div v-if=" withdrawClick== 4 " class="col-100 top10">
        <el-select  placeholder="请选择" v-model="withdraw_reason2" @change="valueChangeT" size="small" style="border: 1px #d3d9e2 solid;width: 90%;">
          <el-option v-for="item in data" :key="item.dicName_cn" :label="item.dicName_cn" :value="item.dicName_cn"></el-option>
        </el-select>
      </div>
    </div>
    <div class="row no-gutter selectBtn">
      <div class="col-50"
           @click="resetClick">
        <a class="button button-fill color-orange">
          {{$t('reset')}}
          <span style="float: right;">|</span>
        </a>
      </div>
      <div class="col-50"
           @click="confimClick">
        <a class="button button-fill color-orange">
          <span>{{$t('success')}}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReportSelect",
  components: {
     SelectDate:resolve => require(['../components/SelectDate'],resolve),
  },
  computed: {
    orderResData () {
      return this.$store.getters.orderResData;
    },
    language: {
      get () {
        return this.$store.getters.language;
      },
      set (val) { }
    },
    currentStore: {
      get() {
        return this.$store.getters.currentStore;
      },
      set(val) {}
    },
    storeList() {
      return this.$store.getters.storeList;
    }
  },
  data () {
    return {
      inputText:'',
      dep_ID:-1,
      daySelect:0,
      resData: {},
      itemValue: 0,
      selectOption: [{ id: 0, name: this.$t("accountsDetail.orderNum") }, { id: 1, name: this.$t("orderDetail.waiterName") }],
      payTypeData: null,
      jiucanType:0,
      WpayTypeData:null,
      withdrawClick:0,
      withdraw_reason1:"",
      withdraw_reason2:"",
      backdishOptions:[],
      diancanType: [
        {
          value: 1,
          label: this.$t("takeoutOrder.gukeUnpay")
        },
        {
          value: 2,
          label: this.$t("takeoutOrder.gukeCancelOrder")
        },
        {
          value: 3,
          label: this.$t("takeoutOrder.shangjiachaoshi")
        },
        {
          value: 4,
          label: this.$t("takeoutOrder.shangjiaCancel")
        }
      ],
    };
  },
  mounted () { },
  methods: {
    getAll(){},
    daySelectClick(val) {
      this.daySelect = val;
      if (val == 3) {
        return;
      }
      this.resData.start_date = val;
      this.resData.end_date = val;
    },
    confirmDataClick(start, end) {
      this.resData.start_date  = this.moment(start).format("YYYY-MM-DD");
      this.resData.end_date  = this.moment(end).format("YYYY-MM-DD");
    },
    // 管家外卖支付类型
    getDlyPayMent(){
      let that = this;
      that.loading = true;
      this.request.getDlyPayMent({}, function (res) {
        if (res.code == "1") {
          let data = res.data[that.language]
          var list = [{ dict: that.$t('orderDetail.all'), id: '' }]
          for (let i in data) {
            list.push(data[i])
            for (let j in data[i].e_wallet) {
              list.push(data[i].e_wallet[j])
            }
          }
          that.WpayTypeData = list
        } else {
          that.toast.fail(res.msg);
        }
        that.loading = false;
      });
      // let that = this;
      // let data = { 
      //   dep_id: this.currentStore.dep_ID,
      //   company_id: this.currentStore.faher_ID
      //   };
      // this.request.getDlyPayMent(data,function(res){
      //   if(res.code == "1"){
      //       var deliveryData = res.data;
      //       var deliveryList = [{ dict_name_cn: that.$t('orderDetail.all'), id: '' }]
      //       for (let i in deliveryData) {
      //       deliveryList.push(deliveryData[i])
      //     }
      //     that.WpayTypeData = deliveryList;
      //   }else {
      //     that.toast.fail(res.msg);
      //   }
      //   that.loading = false;
      // })
    },
    valueChangeF(val)
    {
      this.withdrawClick = val;
      this.resData.withdraw_reason = val;
    },
    valueChangeT(val)
    {
      this.withdraw_reason1 = val;
      this.withdraw_reason2 = val;
      this.resData.withdraw_reason = val;
    },
    // 获取取消订单原因
    cancelOrderReason(){
      let that = this;
      this.request.cancelOrderReason({},function(res){
        if(res.code == "1"){
          var list = [{ dicName_cn: '全部', id: "" }];
          for (let i in res.data) {
            list.push(res.data[i]);
          }
          that.data = list;
        }
      })

    },
    // 获取退款原因
    refundWaiter(){
      let that = this;
      this.returnDishLoading = true;
      this.resData.order_id = this.data.order_id_show; //订单id ,
      this.request.refundWaiter(this.resData, function(res) {
        that.returnDishLoading = false;
        that.refundClick = false;
        if (res.code == "1") {
          that.$router.back(-1);
        } else {
          that.toast.fail(res.msg);
        }
      });
    },

    getDishSet() {
      let that = this;
      let data = { dept_id: this.currentStore.dep_ID};
      this.request.selectDishSet(data, function(res) {
        if (res.code == "1") {
          if (res.data != null) {
            let temp = JSON.parse(res.data.deal_item);
            let arr;
            if (JSON.stringify(temp) != "{}") {
              arr = temp["backdish"]["list"];
            }
            that.backdishOptions =[{ content: '全部', id: '' }]
            for (var i in arr) {
              
              that.backdishOptions.push(arr[i]);
              let refundList = that.backdishOptions[i];
              // that.orderResData.refund_reason = refundList.content;
            }
          }
        } else {
          that.toast.fail(res.msg);
        }
      });
    },
    resetClick () {
      this.resData = {
        start_date:"",
        end_date: "",
        other: "",
        pay_type: "",//支付方式,传空查全部,
        refund_reason: "",
        withdraw_reason: "",
        order_status: "", // 订单状态,传空查全部,1已付款,2已退款,3取消
      }
      
    },
        // 获取昨日的开始结束时间
    getYesterday() {
      this.resData.start_date = this.moment(
        this.moment()
          .add(-1, "days")
          .startOf("day")
          .valueOf()
      ).format("YYYY-MM-DD");
      this.resData.end_date = this.moment(
        this.moment()
          .add(-1, "days")
          .endOf("day")
          .valueOf()
      ).format("YYYY-MM-DD");
    },// 获取昨日的开始结束时间
    getInputday(val) {
      if(val == null)
      {
        this.resData.start_date = "";
        this.resData.end_date = "";
        return 0;
      }
      this.resData.start_date = this.moment(
        this.moment()
          .add(val, "days")
          .startOf("day")
          .valueOf()
      ).format("YYYY-MM-DD");
      this.resData.end_date = this.moment(
        this.moment()
          .add(val, "days")
          .endOf("day")
          .valueOf()
      ).format("YYYY-MM-DD");
    },
    confimClick () {
      //前日
      if(this.daySelect == 1)
      {
          this.getInputday(-2);
      }
      //昨日
      else if(this.daySelect == 2)
      {
          this.getInputday(-1);
      }
      //自定义
      else if(this.daySelect == 3)
      {
      } 
      //全部
      else{
          this.getInputday(null);
      }
      if(this.resData.refund_reason == "全部" || this.resData.withdraw_reason == "全部")
      {
        this.resData.refund_reason="";
        this.resData.withdraw_reason = "";
      }
      this.resData.other= this.inputText;
      this.$store.dispatch("setOrderResData", this.resData);
      this.$router.back(-1)
    },
    //x清除input text
    imgClearText(){
      if (this.inputText!=="") {
        this.inputText="";
      }else{
        return false;
      }
     
    }
  },
  created () {
    this.resData = this.orderResData;
    this.getDlyPayMent();
    this.cancelOrderReason();
    this.getDishSet();
    
  }
};
</script>
<style scoped>
.button {
  display: inline-block;
  margin-right: 10px;
  padding: 0px 20px;
}
.active {
  background: #fe813c;
  border-color: #fe813c !important;
  color: white !important;
}
.button {
  border-color: #d3d9e2;
  color: #303336;
}
.selectBtn {
  position: fixed;
  bottom: 0px;
  width: 100%;
}
.selectBtn .button {
  border-radius: inherit;
  height: 60px;
  line-height: 60px;
  font-size: 18px;
  padding: 0px;
  width: 100%;
  margin: 0px !important;
  display: block;
  border: none;
}
.color-orange {
  background: #fe813c !important;
}
.searchCss {
  float: left;
  width: 80%;
  height: 100%;
  border: none;
  margin-left: 6%;
  background: none;
}
::-webkit-input-placeholder {
  color: #979797;
  padding-left: 10px;
}
.imgClearText{
  margin-top: 8px;
  float: right;
  width: 15px;
  height: 15px;
  margin-right: 10px;

}
.seacherSelect {
  line-height: 32px;
  background: url("../../../assets/images/time_down.png");
  background-repeat: no-repeat;
  background-size: 15px;
  background-position: 96%;
}
</style>