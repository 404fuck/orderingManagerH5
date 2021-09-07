<template>
  <div class="main-layout center">
    
      <div class="row top30">
          <div class="col-100">
              <img src="../../../assets/images/pic_HD.png" alt="" width="80%">
          </div>
          <div class="col-100">
              <div class="font14 fontWeight" style="z-index:99"><span>{{$t('materialMall.HD')}}</span></div>
               <hr style="width: 5%; background-color: #F46F24; height: 4px; border: none;margin-top: -4px; z-index: 20;position: relative;left: 47%;top: -2px;">
          </div>
          <div class="col-100 top5">
              <span class="font12" style="color:rgba(0, 0, 0, 0.5)">{{$t('materialMall.shiyong1')}}</span>
          </div>
      </div>
      <div class="row top30">
          <div class="col-100">
              <img src="../../../assets/images/pic_PT.png" alt="" width="70%">
          </div>
          <div class="col-100">
              <div class="font14 fontWeight" style="z-index:99"><span>{{$t('materialMall.changgui')}}</span></div>
               <hr style="width: 5%; background-color: #F46F24; height: 4px; border: none;margin-top: -4px; z-index: 20;position: relative;left: 47%;top: -2px;">
          </div>
          <div class="col-100 top5">
              <span class="font12" style="color:rgba(0, 0, 0, 0.5)">{{$t('materialMall.shiyong2')}}</span>
          </div>
      </div>
      <div class="row top30" style="margin: 30px 45px;">
          <div class="col-100">
              <span class="font12" style="color:rgba(0, 0, 0, 0.5)">餐厅点餐、收银软件，有日结、交接班、人脸考勤等&nbsp;&nbsp;&nbsp;&nbsp;多种功能，大大提高经营效率和服务水平。
                常规版可在POS机/安卓手机上使用，HD版可在收银机/安卓平&nbsp;&nbsp;板上使用。</span>
          </div>
      </div>
      <div class="row top30" style="margin-bottom:50px">
          <div class="col-50">
              <img src="../../../assets/images/www_waiter.png" alt="" width="50%">
              <p class="font14" style="color:#505050">{{$t('materialMall.HD')}}</p>
              <div  @click="guanjiaappClick" >
                <a class="button button-round button-fill hdCode">
                    <span>{{$t('materialMall.HDdown')}}</span>
                </a>
              </div>
          </div>
          <div class="col-50">
              <img src="../../../assets/images/www_waiterHD.png" alt="" width="50%">
              <p class="font14" style="color:#505050">{{$t('materialMall.changgui')}}</p>
              <div  @click="guanjiaappClick" >
                <a class="button button-round button-fill hdCode">
                    <span>{{$t('materialMall.changguiDown')}}</span>
                </a>
              </div>
          </div>
      </div>
   </div>
</template>

<script>

export default {
  name: "WaiterDown",
  components: {
  },

  data() {
    return {
    
    };
  },
  methods: {
    
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
    
  },
  computed: {
    language: {
      get() {
        return this.$store.getters.language;
      },
      set(val) {}
    }
  },
  watch: {
    currentStore: {
      handler(newVal, oldVal) {
        if (newVal != undefined && newVal != null) {
         
        }
      }
    }
  }
};
</script>
<style scoped>
.hdCode{
    width: 75%;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  background: #f46f24;
}
 
</style>