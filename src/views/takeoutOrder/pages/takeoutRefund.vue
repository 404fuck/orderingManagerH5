<template>
  <div class="main-layout reports font12">
      <div class="row no-gutter" style="background:white;padding:15px">
          <div class="col-100">
              <ul>
                  <li>
                      <span class="title">{{$t('takeoutOrder.orderState')}}：</span><span class="text">{{data.order_status_name}}</span>
                  </li>
                  <li>
                      <span class="title">{{$t('takeoutOrder.shenqingTime')}}：</span><span class="text">{{data.refund_time}}</span>
                  </li>
                  <li class="row no-gutter">
                      <div class="col-100">
                          <span class="title">{{$t('takeoutOrder.refundOther')}}：</span>
                      </div>
                      <div class="col-100 top10 refundDish center" v-for="(item,index) in tabbleData" :key="index">

                          <span style="width:60%">{{item.dish_name}}</span>
                          <span style="width:20%" v-if="item.weight_spec == 1" >{{item.spec_detail}}</span>
                          <span style="width:20%" v-else>{{item.dish_num}}</span>
                          <span style="width:20%">{{item.dish_price | price}}</span>
                      </div>
                  </li>
                  <li>
                      <span class="title">{{$t('takeoutOrder.refundAmount')}}：</span><span class="text">{{data.refund_price | price}}</span>
                  </li>
                  <li><span class="title">{{$t('takeoutOrder.refund_reason')}}：</span><span class="text">{{data.refund_reason}}</span></li>
                  <li><span class="title">{{$t('takeoutOrder.refundImg')}}：</span><span>{{data.refund_images }}</span></li>
              </ul>
          </div>
      </div>

  </div>
</template>

<script>
export default {
  name: "RefundDetail",
  components: {},
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
      refundDish:null,//退菜商品
      data:{}
    };
  },
  methods: {
     setData() {
      var arr = [];
      for (var i in this.data.dish_data) {
        if (this.data.dish_data[i].dish_status == 2) {
          this.data.dish_data[i].dish_name =
            this.$t("accountsDetail.return") + this.data.dish_data[i].dish_name;
             arr.push(this.data.dish_data[i]);
        } else if (this.data.dish_data[i].dish_status == 3) {
          this.data.dish_data[i].dish_name =
            this.$t("accountsDetail.give") + this.data.dish_data[i].dish_name;
             arr.push(this.data.dish_data[i]);
        }
       
      }
      this.tabbleData = arr;
     },
      // 订单详情
    deliveryDetails(){
      let that = this;
      let data = {
        order_id: this.$route.query.id //订单id ,
      };
      this.request.deliveryDetails(data,function(res){
        if(res.code == "1"){
           if (res.data != null) {
            that.data = res.data;
          }
          that.setData();
        }
        else{
          that.toast.fail(res.msg);
        }
      })
    },
   
  },
  created() {
    this.deliveryDetails();
  }
};
</script>
<style scoped>
.row ul li{
  margin-top: 20px;
}
.priceStyle {
  display: inline-block;
  width: 30%;
  text-align: center;
}
.title{
    color: #808080;
    font-size:14px;
}
.text{
    color: #505050;
    font-size: 14px;
    /* font-weight: bold; */
}
.refundDish span{
    display: inline-block;
    color: #505050;
}
</style>