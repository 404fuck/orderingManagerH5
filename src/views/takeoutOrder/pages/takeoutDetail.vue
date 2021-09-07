<template>
  <!-- 外卖 -->
    <div class="font12" style="background:#F6F8FA;padding: 15px;">
      <!-- 退款详情 -->
      <div  class="row no-gutter" style="background:#ffffff;padding: 15px;" v-show="data.order_status == 3">
          <div class="col-100">
            <div class="row no-gutter" style="border-bottom: 1px #F0F0F0 solid;padding-bottom: 20px;">
            <div class="col-100 font14 fontWeight"  style="color:#232426" >
                  <span class="priceStyle">{{data.after_sst_price - data.refund_price | price}}</span>
                  <span>=</span>
                  <span class="priceStyle">{{data.after_sst_price  | price}}</span>
                  <span>-</span>
                  <span class="priceStyle">{{data.refund_price | price}}</span>
                </div>
              <div class="col-100 font12 top10" style="color:#8C939B">
                  <span class="priceStyle">{{$t('report.jingshou')}}</span>
                  <span>&nbsp;&nbsp;&nbsp;</span>
                  <span class="priceStyle">{{$t('report.shishoue')}}</span>
                  <span>&nbsp;&nbsp;&nbsp;</span>
                  <span class="priceStyle">{{$t('accountsDetail.tuikuan')}}</span>
                </div>
            </div>

          </div>
          <div class="col-100 top20">
            <ul>
              <li class="row no-gutter">
                <div class="col-50">
                  <span>{{$t('takeoutOrder.shenqingTime')}}：</span><span>{{data.refund_apply_time }}</span>
                </div>
                <div class="col-50">
                  <span>{{$t('takeoutOrder.orderState')}}：</span><span>{{data.order_status_name}}</span>
                </div>
              </li>
              <li>
                <span>{{$t('takeoutOrder.refundAmount')}}：</span><span>{{data.refund_price | price}}</span>
              </li>
              <li>
                <span>{{$t('takeoutOrder.refund_reason')}}：</span>
                <span>{{data.refund_reason}}</span>
                <span class="left10" style="color:#EB3C1C" @click="detailsBtn(data.order_id_show)">{{$t('takeoutOrder.detail')}} <img src="../../../style/images/detail.png" alt="" width="7" style="position:relative;top:2px"></span>
              </li>
              <li><span>{{$t('takeoutOrder.refundTime')}}：</span><span>{{data.refund_time}}</span></li>
              <li><span>{{$t('takeoutOrder.refundPeople')}}：</span><span>{{data.refund_people_name}}</span></li>
            </ul>
          </div>
      </div>
      <!-- 订单号（已完成，已退款，已取消） -->
      <div class="row top20 no-gutter" style="background:#ffffff;padding: 15px;">
        <div class="col-100">
          <ul>
            <li  v-for="(item,index) in orderFinish" :key="index">
               <span>{{item.title}}</span>
            <span>{{item.value}}</span>
            </li>
            <li><hr style= "border:1px dotted #666666"></li>
          </ul>
          <ul class="center">
            <li class="row font14 fontWeight no-gutter">
              <span class="col-33">{{$t('takeoutOrder.dish')}}</span>
              <span class="col-33">{{$t('takeoutOrder.count')}}</span>
              <span class="col-33">{{$t('takeoutOrder.amount')}}</span>
            </li>
            <li class="row no-gutter" v-for="(item,index) in tabbleData" :key="index">
              <span class="col-33">{{item.dish_name}}</span>
              <span class="col-33"
                  v-if="item.weight_spec == 1"
                >{{item.spec_detail}}</span>
                <span class="col-33"
                  v-else
                >{{item.dish_num}}</span>
              <span class="col-33">{{item.dish_price | price}}</span>
            </li>
            <li class="row no-gutter" style="text-align:right">
              <div class="col-100 fontWeight font14">
                <span>{{$t('takeoutOrder.dishTotal')}}：</span><span>{{data.total_price | price}}</span>
              </div>
            </li>
            <li><hr style= "border:1px dotted #666666"></li>
          </ul>

          <ul>
            <li class="row no-gutter">
              <div class="col-50" v-for="(item,index) in orderFeiyong" :key="index">
                <span>{{item.title}}</span><span>{{item.value}}</span>
              </div>
            </li>
            <li class="row no-gutter" style="text-align:right">
              <div class="col-100 fontWeight font14">
                <span>{{$t('takeoutOrder.shishouAmount')}}：</span><span>{{data.after_sst_price | price }}</span>
              </div>
            </li>
            <li><hr style= "border:1px dotted #666666"></li>
          </ul>

          <ul>
            <li class="fontWeight font14"><span>{{$t('takeoutOrder.payType')}}：</span><span>{{data.pay_type}}</span><span v-show="data.order_status !=2">{{$t('takeoutOrder.pay')}}</span><span v-show="data.order_status == 2">{{$t('takeoutOrder.Unpay')}}</span></li>
            <li v-for="(item,index) in orderPay" :key="index">
              <span>{{item.title}}</span><span>{{item.value}}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="row no-gutter top20" style="background:#ffffff;padding: 15px;">
        <div class="col-100">
          <ul>
            <li class="fontWeight font14">
              <span>{{$t('takeoutOrder.gukeDetail')}}</span>
            </li>
            <li v-for="(item,index) in customerInfo" :key="index">
               <span>{{item.title}}</span><span>{{item.value}}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="row no-gutter top20" style="background:#ffffff;padding: 15px;" v-show="data.order_status != 2">
        <div class="col-100">
          <ul>
            <li class="fontWeight font14"><span>{{$t('takeoutOrder.peisongTime')}}</span></li>
            <li v-for="(item,index) in deliveryInfo" :key="index">
              <span>{{item.title}}</span><span>{{item.value}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>                                            
</template>

<script>
export default {
  name: "accountsDetail",
  data() {
    return {
      data: {  },

      tabbleData: null,
      refundClick: false,
      title: "",

      gotPriceInfo: null,
      gotSetInfo: null,
      returnInfo: null,
      orderFinish:null,//订单号已完成
      orderFeiyong:null,//订单费用
      orderPay:null,//订单支付方式
      customerInfo:null,//顾客信息
      deliveryInfo:null,//配送信息       
      pay_typeDic: null,
      pay_typeValue: null,

      returnDishLoading: false,

      backdishOptions: [],
    };
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
  methods: {
    // 退款详情
    detailsBtn(order_id_show){
      let that=this;
      this.$router.push({
        //你需要接受路由的参数再跳转
        path: "/takeoutRefund",
        query: { id: order_id_show }
      });
    },
    // 订单详情
    deliveryDetails(){
      let that = this;
      let data = {
        order_id: this.$route.query.id //订单id ,
      };
      this.request.deliveryDetails(data,function(res){
        if(res.code == "1"){
      var  payTypeStr=
      { 28: that.$t("accountsDetail.cash"),
        29: that.$t("accountsDetail.bankCard"),
        31: "Grabpay",
        32: "T'NGO",
        33: "Fave",
        34: "BigPay",
        56: "Others",
        35: "Razer Pay",
        38: "Paypal",
        54: "MOLpay",
        55: "MBB QR",
        51: "unionpay",
        50: "mcash",
        45: "Scan payment code ",
        46: "Touch'n go",
        47: "Boost",
        58: "Grab Food",
        59: "Panda Food",
        60: "Hungry eat",
        61: "Eat mol",
        62: "Delivery eat",
        63:"Shopee",
        64:"Jom Makan",
        71:"MaybAnk qr",
        72:"Quinpay",
        73:"Quicksent"
        
      };
           if (res.data != null) {
            that.data = res.data;
            that.data.pay_type=payTypeStr[that.data.pay_type];
            //1已付款,2已退款，3已取消 ,
            that.data.orderStates = [
              that.$t("orderDetail.yifukuan"),
              that.$t("orderDetail.youtuikuan"),
              that.$t("takeoutOrder.cancel")
              
            ][that.data.order_status];
            that.setData();
            // that.getDlyPayMent();
          }
        }
        else{
          that.toast.fail(res.msg);
        }
      })
    },
    getDlyPayMent(){
      let that = this;
      this.request.getDlyPayMent({dep_id:1437,company_id:1435},function(res){
        if(res.code == "1"){
            var deliveryData = res.data;
            var deliveryList = [{ dict_name_cn: that.$t('orderDetail.all'), id: '' }]
            for (let i in deliveryData) {
            deliveryList.push(deliveryData[i])
          }
          that.WpayTypeData = deliveryList;
          that.setData();
        }else {
          that.toast.fail(res.msg);
        }
        that.loading = false;
      })
    },


    setData() {
      var arr = [];
      for (var i in this.data.dish_data) {
        if (this.data.dish_data[i].dish_status == 2) {
          this.data.dish_data[i].dish_name =
            this.$t("accountsDetail.return") + this.data.dish_data[i].dish_name;
        } else if (this.data.dish_data[i].dish_status == 3) {
          this.data.dish_data[i].dish_name =
            this.$t("accountsDetail.give") + this.data.dish_data[i].dish_name;
        }
        arr.push(this.data.dish_data[i]);
      }
      this.tabbleData = arr;
      if (this.data.order_status == 1 || this.data.order_status == 3) {

        // 订单
        this.orderFinish = [
            {
              title: this.$t("takeoutOrder.order_id")+':',
              value: this.data.order_id_show
            },
            {
              title: this.$t("takeoutOrder.jiedanTime")+':',
              value: this.data.accept_time
            },
            {
              title: this.$t("takeoutOrder.jiedanPeope")+':',
              value: this.data.waiter_name
            }
          ];
        // 包装费用
          this.orderFeiyong = [
            {
              title: this.$t("accountsDetail.SST") + this.data.taxes_rate + "%：",
              value: this.stringutils.formatPrice(this.data.sst_price)
            },
            {
              title: this.$t("takeoutOrder.baozhuangAmount")+':',
              value: this.stringutils.formatPrice(this.data.packing_fee)
            },
            {
              title: this.$t("takeoutOrder.peisongAmount")+':',
              value: this.stringutils.formatPrice(this.data.delivery_fee)
            },
            {
              title: this.$t("takeoutOrder.yunfeiLittle")+':',
              value: this.stringutils.formatPrice(this.data.freight_relief)
            }
            ,
            {
              title: this.$t("takeoutOrder.shoudan")+':',
              value: this.stringutils.formatPrice(this.data.first_discount)
            }
          ];
          this.deliveryInfo = [
              {
              title: this.$t("takeoutOrder.peisongFuwu")+':',
              value: this.data.delivery_type
            },
            {
              title: this.$t("takeoutOrder.peisongPeople")+':',
              value: this.data.delivery_ride_name 
            },
            {
              title: this.$t("takeoutOrder.peisongCount")+':',
              value: this.stringutils.formatPrice(this.data.delivery_fee)
            },
            {
              title: this.$t("takeoutOrder.quhuoTime")+':',
              value: this.data.get_goods_time
            },
            {
              title: this.$t("takeoutOrder.songdaTime")+':',
              value: this.data.reach_time
            },
            {
              title: this.$t("takeoutOrder.shouhuoTime")+':',
              value: this.data.check_time
            }
          ]
      } else {
        this.orderFinish = [
            {
              title: this.$t("takeoutOrder.order_id")+':',
              value: this.data.order_id
            },
            {
              title: this.$t("takeoutOrder.jiedanTime")+':',
              value: this.data.accept_time
            }
          ];
           // 包装费用
          this.orderFeiyong = [
            {
              title: this.$t("accountsDetail.SST") + this.data.taxes_rate + "%：",
              value: this.stringutils.formatPrice(this.data.sst_price)
            },
            {
              title: this.$t("takeoutOrder.baozhuangAmount")+':',
              value: this.stringutils.formatPrice(this.data.packing_fee)
            },
            {
              title: this.$t("takeoutOrder.peisongAmount")+':',
              value: this.stringutils.formatPrice(this.data.delivery_fee)
            },
            {
              title: this.$t("takeoutOrder.yunfeiLittle")+':',
              value: this.stringutils.formatPrice(this.data.freight_relief)
            }
            ,
            {
              title: this.$t("takeoutOrder.shoudan")+':',
              value: this.stringutils.formatPrice(this.data.first_discount)
            }
          ];
      }

      //订单状态,传空查全部,1已付款,2已退款,3取消
     if (this.data.order_status == 1) {
          this.orderPay = [
             {
              title: this.$t("takeoutOrder.payTime")+':',
              value: this.data.pay_time
            },
            {
              title: this.$t("takeoutOrder.zhizuodanTime")+':',
              value: this.data.make_list_time
            },
            {
              title: this.$t("takeoutOrder.xiaopiaoTime")+':',
              value: this.data.brief_bill_time
            }
          ];
          this.customerInfo = [
              {
              title: this.$t("takeoutOrder.gukeDetail")+':',
              value: this.data.cust_concat_name+' / '+this.data.cust_concat_mobile +' / '+this.data.cust_address 
            },
            {
              title: this.$t("takeoutOrder.gukeNote")+':',
              value: this.data.notes
            },
            {
              title: this.$t("takeoutOrder.canjuCount")+':',
              value: this.data.tableware_num
            },
            {
              title: this.$t("takeoutOrder.peisongTime")+':',
              value: this.data.delivery_time
            }
          ];
          
        
      } else if (this.data.order_status == 3) {
          this.orderPay = [

          ],
          this.customerInfo = [
              {
              title: this.$t("takeoutOrder.gukeDetail")+':',
              value: this.data.cust_concat_name+' / '+this.data.cust_concat_mobile +' / '+this.data.cust_address 
            },
            {
              title: this.$t("takeoutOrder.gukeNote")+':',
              value: this.data.notes
            },
            {
              title: this.$t("takeoutOrder.canjuCount")+':',
              value: this.data.tableware_num
            },
            {
              title: this.$t("takeoutOrder.peisongTime")+':',
              value: this.data.delivery_time
            }
          ];

      } else if (this.data.order_status == 2) {
          this.customerInfo = [
              {
              title: this.$t("takeoutOrder.gukeDetail")+':',
              value: this.data.cust_concat_name+' / '+this.data.cust_concat_mobile +' / '+this.data.cust_address 
            },
            {
              title: this.$t("takeoutOrder.gukeNote")+':',
              value: this.data.notes
            },
            {
              title: this.$t("takeoutOrder.canjuCount")+':',
              value: this.data.tableware_num
            },
            {
              title: this.$t("takeoutOrder.peisongTime")+':',
              value: this.data.delivery_time
            }
          ];
      }


      // 堂食--退款信息
      this.returnInfo = [
        {
          title: this.$t("accountsDetail.tuikuanqian_"),
          value: this.stringutils.formatPrice(this.data.after_sst_price)
        },
        {
          title: this.$t("accountsDetail.returnPrice_"),
          value: this.stringutils.formatPrice(this.data.refund_price)
        },
        {
          title: this.$t("accountsDetail.tuikuanshijian"),
          value: this.stringutils.formatEmpty(this.data.refund_time)
        },
        {
          title: this.$t("accountsDetail.returnType"),
          value: this.retundShowsList[this.data.refund_type]
        },
        {
          title: this.$t("accountsDetail.returnWhy"),
          value: this.stringutils.formatEmpty(this.data.refund_reason)
        },
        {
          title: this.$t("accountsDetail.tuikuanPeople"),
          value: this.stringutils.formatEmpty(this.data.refund_people_name)
        }
      ];
    },
  },
  created() {
      this.deliveryDetails();
  },
  watch: {

  }
};
</script>
<style scoped>
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
.priceStyle {
  display: inline-block;
  width: 30%;
  text-align: center;
}
.row ul li{
  margin-top: 5px;
}
hr{
  margin-top: 10px;
}
.priceStyle {
  display: inline-block;
  width: 30%;
  text-align: center;
}
</style>