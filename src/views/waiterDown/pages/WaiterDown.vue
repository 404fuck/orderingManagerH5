<template>
  <div class="row">
    <div class="col-100">
          <div class="row">
            <div class="col-100">
              <div class="row" style="margin: 40px 35px;" >
                <div class="col-100 center">
                  <img src="../../../assets/images/weiterHDDown.png" alt width="90%" />
                  <p style="color:#505050;margin:0px;font-weight: bold;"><span class="font14">{{$t('materialMall.MJOYWaiter')}}</span><span class="font12">{{$t('materialMall.HD')}}</span> </p>
                  <span class="font12" style="color:rgba(0, 0, 0, 0.5)">{{$t('materialMall.shiyong1')}}</span>
                </div>
                <div class="col-100 center top30">
                  <img src="../../../assets/images/weiterDown.png" alt width="60%" />
                  <p style="color:#505050;margin:0px;font-weight: bold;"><span class="font14">{{$t('materialMall.MJOYWaiter')}}</span><span class="font12">{{$t('materialMall.changgui')}}</span> </p>
                  <span class="font12" style="color:rgba(0, 0, 0, 0.5)">{{$t('materialMall.shiyong2')}}</span>
                  <p class="font14 color-lightbrown" style="padding:30px">
                     {{$t('help.fuwuyuanMsg')}}
                  </p>
                </div>
                <div class="col-50 qrcodeBg center"  >
                  <div >
                    <img src="../../../assets/images/www_waiterHD.png" alt width="90" class="top5" />
                    <p class="font14">{{$t('materialMall.HD')}}</p>
                  </div>
                  <a class="button button-round button-fill andriodApp"  @click="fuwuyaunHDClick" style="width:85%">
                    <span class="left5">{{$t('materialMall.HDdown')}}</span>
                  </a>
                </div>
                <div class="col-50 qrcodeBg center"  >
                  <div >
                    <img src="../../../assets/images/www_waiter.png" alt width="90" class="top5" />
                    <p class="font14">{{$t('materialMall.changgui')}}</p>
                  </div>
                  <a class="button button-round button-fill andriodApp"  @click="fuwuyuanappClick" style="width:85%">
                    <span class="left5">{{$t('materialMall.changguiDown')}}</span>
                  </a>
                </div>
              </div>
            </div>
            
          </div>
        </div>
  </div>
</template>

<script>
export default {
  name: "help",
  components: {},
  data() {
    return {
      navActive: 0,
      fuwuyuanUrl: "http://www.sjoyfood.com/app/download/waiter.apk",
      fuwuyuanHDUrl:"http://www.sjoyfood.com/app/download/waiterHD.apk",
    };
  },
  methods: {
    fuwuyuanappClick() {
      window.location.href = this.fuwuyuanUrl;//fuwuyuanUrl;
    },
    fuwuyaunHDClick(){
      window.location.href = this.fuwuyuanHDUrl;//fuwuyuanHDUrl;
    }
  },
  created() {
    if (
      this.$route.query.lang == null ||this.$route.query.lang == "" ||typeof this.$route.query.lang == "undefined"
    ) {
      this.$store.dispatch("setLanguage", "en_US");
      this.$i18n.locale = "en_US";
    } else {
      this.$store.dispatch("setLanguage", this.$route.query.lang);
      this.$i18n.locale = this.$route.query.lang;
    }
    // this.$Local(this.$route.query.lang);
    this.$store.dispatch("setToken", this.$route.query.token);

    this.dep_ID = this.$route.query.dep_ID;
    this.currentStore.dep_ID = this.$route.query.dep_ID;

    // this.$store.dispatch('setToken', "pC19xAXS1pB2rin3KMmv_1578538338365")
    // this.managedata()
  },
  watch: {
    currentStore: {
      handler(newVal, oldVal) {
        if (newVal != undefined && newVal != null) {
          this.managedata();
        }
      }
    }
  },
  mounted() {}
};
</script>
<style scoped>
.navBtn .button.button-round:first-child {
  border-radius: 4px 0 0 4px;
}
.navBtn .button.button-round:last-child {
  border-radius: 0 4px 4px 0;
}
.navBtn .active {
  background: rgba(254, 129, 60, 0.1);
  color: #fe813c !important;
}
.navBtn .button {
  border-color: #d8d8d8;
  color: #505050;
  font-size: 14px;
}
.shouceList ul li {
  height: 45px;
  border-bottom: 1px #e6eaef solid;
  line-height: 45px;
  padding: 5px 18px;
}
.appBtn {
  text-align: center;
  box-shadow: 0 0 6px 4px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  padding: 44px 0px 30px 0px;
}
.andriodApp {
  width: 50%;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  background: #f46f24;
}
.iosApp {
  width: 50%;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  background: #979797;
}
.qrcodeBg {
  background: url("../../../assets/images/bg.png");
  background-size: 100px 100px;
  background-repeat: no-repeat;
  background-position-x: center;
}
.qrbg {
  position: absolute;
  z-index: 99;
  top: 25%;
  left: 40%;
  border: 3px white solid;
  border-radius: 6px;
}
</style>