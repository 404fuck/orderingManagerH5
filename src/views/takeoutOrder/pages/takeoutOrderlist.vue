<template>
  <div>
    <div
      class="row no-gutter "
      style="padding:15px"
    >
      <div class="col-60">
        <SelectStore :dep_ID="dep_ID"></SelectStore>
      </div>
      <div
        class="col-40"
        style="padding-right: 15px;"
      >
        <a
          class="button button-round downBtn"
          @click="downloadCLick"
        >
          {{$t('report.downReport')}}
          <img
            src="../../../assets/images/downloadReport.png"
            alt
            class="downImg"
          />
        </a>
      </div>
    </div>

    <div
      class="row no-gutter"
      style="padding:15px"
    >
      <div class="col-80 selectBtn">
        <a
          class="button button-round font12"
          @click="orderSelectClick(0)"
          :class="{active:orderSelect==0}"
        >{{$t('orderDetail.all')}}</a>
        <a
          class="button button-round font12"
          @click="orderSelectClick(1)"
          :class="{active:orderSelect==1}"
        >{{$t('orderDetail.yifukuan')}}</a>
        <a
          class="button button-round font12"
          @click="orderSelectClick(3)"
          :class="{active:orderSelect==3}"
        >{{$t('orderDetail.youtuikuan')}}</a>
        <a
          class="button button-round font12"
          @click="orderSelectClick(2)"
          :class="{active:orderSelect==2}"
        >{{$t('takeoutOrder.cancel')}}</a>
      </div>
      <div
        class="col-20 right-style"
        @click="moreClick()"
      >
        <span class="font12 color-lightbrown">
          {{$t('orderDetail.more')}}
          <i class="van-icon van-icon-arrow"></i>
        </span>
      </div>
    </div>

    <div
      class="row top10"
      style="margin:30px 20px;padding-bottom: 30px;"
    >
      <div class="col-100">
        <div class="data-table font10 border">
          <table
            style="border: 1px #E6EAEF solid;"
            class="storeTable"
          >
            <thead>
              <tr>
                <th class="numeric-cell fontWeight">{{$t('orderDetail.orderNum')}}</th>
                <th class="numeric-cell fontWeight">{{$t('orderDetail.orderState')}}</th>
                <th class="numeric-cell fontWeight">{{$t('orderDetail.orderPrice')}}</th>
                <th class="numeric-cell fontWeight">{{$t('report.priceCount')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item,index) in tableData"
                :key="index"
                @click="cellClick(item.order_id_show)"
              >
                <td class="numeric-cell">{{item.order_id_show}}</td>
                <td class="numeric-cell">{{options1[item.order_status].label}}</td>
                <td class="numeric-cell">{{item.should_pay | price}}</td>
                <td class="numeric-cell">{{item.after_sst_price | price}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-100 center top20">
        <el-pagination
          background
          v-if="currentPage.total!==0"
          class="page-pagination center"
          style="padding:20px 0 20px 2px"
          layout="prev, pager, next,sizes"
          :total="currentPage.total"
          :pager-count="3"
          :page-size="currentPage.size"
          :current-page="currentPage.page"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :page-sizes="[10, 20, 30,50]"
        ></el-pagination>
      </div>
    </div>
    <van-popup
      v-model="propShow"
      style="border-radius:15px;width:80%;"
    >
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
    SelectDate: (resolve) => require(["../components/SelectDate"], resolve),
    EmailPop: (resolve) => require(["../components/EmailPop"], resolve),
  },
  computed: {
    currentStore() {
      return this.$store.getters.currentStore;
    },
  },
  data() {
    return {
      tableData: [],
      options1: [
        //订单状态
        { label: "", value: 0 },
        { label: this.$t("orderDetail.yifukuan"), value: 1 },
        { label: this.$t("takeoutOrder.cancel"), value: 2 },
        { label: this.$t("orderDetail.youtuikuan"), value: 3 },
      ],
      file: null,
      propShow: false,
      dep_ID: -1,
      orderSelect: "",
      orderResData: {
        start_date: "",
        end_date: "",
        other: "",
        pay_type: "", //支付方式,传空查全部 ,
        refund_reason: "",
        withdraw_reason: "",
        order_status: "", // 订单状态,传空查全部,1已付款,2已退款,3取消
        pageIndex: 0, //分页从0开始
        pageSize: 10, //每页10条
      },
      currentPage: {
        total: 0,
        page: 1,
        size: 10,
      },
      data: {},
      dishrank: [],

      pagesCont: ["page-current"],
      loading: false,
      finished: false,
      getcellClick: false, //得到返回详情缓存是否状态点击了
      indentCurPage: 1, //得到返回详情缓存当前页
      indentStatePage: -1, //得到返回详情缓存当前状态
      getFlag: true, //判断是否缓存了 cookie
    };
  },
  methods: {
    downloadCLick() {
      this.propShow = true;
    },
    closeClick(val) {
      this.propShow = val;
    },
    sendEmailClick(email, isdefault) {
      this.orderReport(email, isdefault);
    },
    orderReport(email, isdefault) {
      let that = this;
      this.orderResData.dep_id = this.currentStore.dep_ID; //门店id
      this.orderResData.mail = email;
      this.orderResData.isdefault = isdefault;
      this.request.deliveryOrder(this.orderResData, function (res) {
        if (res.code == "1") {
          that.toast.success(that.$t("sendSuccess"));
        } else {
          that.toast.fail(res.msg);
        }
      });
    },
    //跳转至详情页
    cellClick(order_id_show) {
      let currentPage = this.currentPage.page;
      document.cookie = "indentCurPage===" + currentPage;
      let statePage = this.orderResData.order_status;
      document.cookie = "statePage===" + statePage;

      sessionStorage.setItem("iscellClick", true); //缓存判断是否点击  否则初始化会请求三次接口
      this.$router.push({
        path: "/takeoutDetail",
        query: { id: order_id_show },
      });
    },
    // cookie得到当前页
    getPageNum() {
      let cPage = 1;
      let name = "indentCurPage";
      let arrStr = document.cookie.split("; ");
      for (let i = 0; i < arrStr.length; i++) {
        let temp = arrStr[i].split("===");
        if (temp[0] == name) {
          cPage = decodeURI(temp[1]);
        }
      }
      return cPage;
    },
    getPagestate() {
      let statePage = -1;
      let name = "statePage";
      let arrStr = document.cookie.split("; ");
      for (let i = 0; i < arrStr.length; i++) {
        let temp = arrStr[i].split("===");
        if (temp[0] == name) {
          statePage = decodeURI(temp[1]);
        }
      }
      return statePage;
    },
    //分页初始化
    initPagination() {
      this.indentCurPage = 1;
      this.currentPage.page = 1;
    },

    orderSelectClick(val) {
      this.orderSelect = val;
      this.orderResData.order_status = val;
      if(this.orderResData.order_status == 0){
        this.orderResData.order_status = ''
      }
      if (this.getcellClick) {
        this.currentPage.page = this.indentCurPage;
        if (this.orderResData.order_status !== this.indentStatePage) {
          this.initPagination(); //初始化
        }
      } else {
        this.currentPage.page = 1;
      }
      this.detail();
    },
    // 分页
    handleCurrentChange(page) {
      this.currentPage.page = page;
      this.detail();
    },
    handleSizeChange(size) {
       //当分页不在第一页时，切换每页显示条数 使得page返回参数为1
      this.currentPage.page = 1;
      sessionStorage.setItem("sizes", size);
      this.currentPage.size = size;
      this.detail();
    },
    detail(val) {
      let that = this;
      if (val) {
        this.pageIndex = val;
      }
      this.orderResData.dep_id = this.currentStore.dep_ID; //门店id
      this.orderResData.pageIndex = this.currentPage.page - 1;
      this.orderResData.pageSize = this.currentPage.size;
      this.request.orderlist(this.orderResData, function (res) {
        if (res.code == "1") {
          let req_data = {};
          req_data = res.data;
          let totalNum = req_data["totalElements"];
          that.currentPage.total = 0;
          that.tableData = [];
          that.tableData = req_data.content;
          that.currentPage.total = Number(req_data.totalElements);
          that.getcellClick = sessionStorage.getItem("iscellClick");
          if (that.getcellClick) {
            if (that.getFlag) {
              that.indentCurPage = Number(that.getPageNum());
              that.indentStatePage = Number(that.getPagestate());
              that.handleCurrentChange(that.indentCurPage);
              document.cookie = "indentCurPage===" + 1;
              that.orderSelectClick(that.indentStatePage);
              document.cookie = "indentStatePage===" + -1;

              that.getFlag = false;
            }
          }
        } else {
          that.toast.fail(res.msg);
        }
      });
    },
    moreClick() {
      this.$store.dispatch("setOrderResData", this.orderResData);
      this.$router.push({
        //你需要接受路由的参数再跳转
        path: "/takeoutSelect",
      });
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
 if (this.$store.getters.orderResData != null) {
      this.orderResData = this.$store.getters.orderResData;
    }
   

    //门店缓存
        let getdepInfo={};
        getdepInfo =JSON.parse(sessionStorage.getItem('dep_Info'));
        if(!sessionStorage.getItem('dep_Info')){
            this.dep_ID = this.$route.query.dep_ID;
            this.currentStore.dep_ID = this.$route.query.dep_ID;
        }else{
            this.currentStore.dep_ID = getdepInfo.dep_ID;
            this.dep_ID = getdepInfo.dep_ID;
        }
  },
  watch: {
   currentStore: {
            handler(newVal, oldVal) {
                if (newVal != undefined && newVal != null){
                    console.log(this.orderResData);
                    this.detail();
                }
            }
        }
  },
};
</script>
<style scoped>
#page-normal {
  color: #ff9655;
  text-align: center;
  font-size: 0px;
}
#page-normal a,
#page-normal span {
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 33px;
}
#page-prev,
#page-next {
  border: 1px solid #dbe0e7;
  color: #303336;
  font-size: 15px;
  margin-right: 10px;
}

#page-prev i {
  margin-right: 5px;
}

#page-next i {
  margin-left: 5px;
}

.page-current {
  border: 1px solid #fe813c;
  color: #fe813c;
  font-size: 15px;
  margin-right: 10px;
}

.page-non {
  border: 1px solid #dbe0e7;
  color: #303336;
  font-size: 15px;
  margin-right: 10px;
}

#page-ellipsis {
  font-size: 15px;
  margin-right: 10px;
}
.selectBtn .active {
  background: #fe813c;
  border-color: #fe813c !important;
  color: white !important;
}
.selectBtn .button {
  border-color: #d3d9e2;
  color: #303336;
  display: inline-block;
  margin-right: 10px;
  padding: 0 10px;
}
.van-cell {
  padding: 0px !important;
}
.titleText {
  color: #232426;
  line-height: 36px;
  background: #fff9f5;
  border: 1px #e6eaef solid;
}
.listStyle {
  border: 1px #e6eaef solid;
  border-top: none;
  max-height: 450px;
  overflow-y: scroll;
}
.cellStyle {
  color: #303336;
  border-bottom: 1px #e6eaef solid;
  line-height: 35px;
}
.downBtn {
  width: 86px;
  line-height: 30px;
  float: right;
  color: #eb3c1c;
  font-size: 12px;
  border-color: #eb3c1c;
}
.downImg {
  width: 10px;
  position: relative;
  top: 2px;
}

.data-table thead th:not(.sortable-active),
.data-table thead td:not(.sortable-active) {
  color: #232426 !important;
}
.data-table tbody td:before {
  background-color: #e6eaef !important;
}
</style>