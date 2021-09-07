<template>
  <div class="main-layout reports refund">
    <div
      class="list-block color-darkbrown font14"
      style="padding-top:30px"
    >
      <ul>
        <li>
          <span style="padding-left: 18px;">{{$t('accountsDetail.sureReturnPrice')}}</span>
          <span class="font18 fontWeight">{{data.already_pay}}</span>
        </li>
        <li>
          <a
            class="item-link smart-select"
            @click="typeSelect()"
          >
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title">{{$t('accountsDetail.returnType')}}</div>
                <el-select
                  class="item-after"
                  :placeholder="$t('accountsDetail.returnTypePH')"
                  v-model="requestData.refund_type"
                >
                  <el-option
                    v-for="item in refund_typeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </a>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title">{{$t('accountsDetail.returnPrice_')}}</div>
              <div class="item-after">
                <input
                  type="text"
                  v-model="requestData.refund_price"
                />
              </div>
            </div>
          </div>
        </li>
        <li>
          <a
            class="item-link smart-select"
            @click="onSelect()"
          >
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title">{{$t('accountsDetail.returnWhy')}}</div>
                <el-select
                  class="item-after"
                  :placeholder="$t('accountsDetail.returnWhyPH')"
                  v-model="requestData.refund_reason"
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
          </a>
        </li>
      </ul>
    </div>
    <div
      class="row"
      style="padding: 30px 18px;"
    >
      <div class="col-100 font12">
        <span style="color:#303336">{{$t('accountsDetail.remark')}}</span>
        <span style="color:#8C939B">{{$t('accountsDetail.remarkWhy')}}</span>
      </div>
    </div>
    <div class="row no-gutter selectBtn">
      <div class="col-100">
        <a
          @click="returnDishClick()"
          class="button button-fill color-orange"
        >{{$t('accountsDetail.okRetrun')}}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Refund",
  components: {},
  computed: {
    currentStore() {
      return this.$store.getters.currentStore;
    }
  },
  data() {
    return {
      data: { already_pay: "" },

      requestData: {
        refund_price: "", // 退款金额 ,
        refund_reason: "", //退款原因 ,
        refund_type: 28 ,//退款方式, 0钱包, 1现金, 2银行卡,
        refund_id: "" //退款原因id
      },

      backdishOptions: [],
      refund_typeOptions: [
        {
          value: 28,
          label: this.$t("accountsDetail.cash")
        },
        {
          value: 29,
          label: this.$t("accountsDetail.bankCard")
        },
        {
          value: 31,
          label: "Grabpay"
        },
        {
          value: 32,
          label: "T'NGO"
        },
        {
          value: 33,
          label: "Fave"
        },
        {
          value: 34,
          label: "BigPay"
        },
        {
          value: 56,
          label: "Others"
        },
        {
          value: 35,
          label: "Razer Pay"
        },
        {
          value: 38,
          label: "Paypal"
        },
        {
          value: 54,
          label: "MOLpay"
        },
        {
          value: 55,
          label: "MBB QR"
        },
        {
          value: 51,
          label: "unionpay"
        },
        {
          value: 50,
          label: "mcash"
        },
        {
          value: 46,
          label: "Touch'n go"
        },
        {
          value: 47,
          label: "Boost"
        },
        {
          value: 58,
          label: "Grab Food"
        },
        {
          value: 59,
          label: "Panda Food"
        },
        {
          value: 60,
          label: "Hungry eat"
        },
        {
          value: 61,
          label: "Eat mol"
        },
        {
          value: 62,
          label: "Delivery eat"
        },
        // 新增
        {
          value:63,
          label:"Shopee"
        },
        {
          value:64,
          label:"Jom Makan"
        }
      ]
    };
  },
  methods: {
    returnDishClick() {
      if (this.data.already_pay < this.requestData.refund_price) {
        this.toast.info(this.$t("accountsDetail.msg"));
        return;
      }
      this.returnDish();
    },
    returnDish() {
      let that = this;
      this.returnDishLoading = true;
      this.requestData.order_id = this.data.order_id_show; //订单id ,
      this.request.refundWaiter(this.requestData, function(res) {
        that.returnDishLoading = false;
        that.refundClick = false;
        if (res.code == "1") {
          that.$router.back(-1);
        } else {
          that.toast.fail(res.msg);
        }
      });
    },
    onSelect() {
      this.show = true;
    },
    typeSelect() {
      this.refundType = true;
    },
    getData() {
      let that = this;
      let data = {
        order_id: this.$route.query.id //订单id ,
      };
      this.request.details(data, function(res) {
        if (res.code == "1") {
          if (res.data != null) {
            that.data = res.data;
          }
        } else {
          that.toast.fail(res.msg);
        }
      });
    },
    getDishSet() {
      let that = this;
      let data = { dept_id: this.currentStore.dep_ID };
      this.request.selectDishSet(data, function(res) {
        if (res.code == "1") {
          if (res.data != null) {
            let temp = JSON.parse(res.data.deal_item);
            let arr;
            if (JSON.stringify(temp) != "{}") {
              arr = temp["backdish"]["list"];
            }

            for (var i in arr) {
              that.backdishOptions.push(arr[i]);
              let refundList = that.backdishOptions[i];
              that.requestData.refund_id = refundList.id;
            }
          }
        } else {
          that.toast.fail(res.msg);
        }
      });
    }
  },
  created() {
    this.getData();
    this.getDishSet();
  }
};
</script>
<style scoped>
.list-block ul:before {
  background: none !important;
}
.list-block {
  margin: 0px !important;
}
.list-block .item-content {
  padding-left: 0px !important;
}
.list-block .item-inner {
  padding-left: 18px;
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
.list-block .item-after {
  color: #505050;
}
</style>