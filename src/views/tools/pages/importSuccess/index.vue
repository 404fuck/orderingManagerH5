<template>
  <div class="main-layout" style="height: 100%;background: linear-gradient(to top, #EC3C1C , #FE823A);color:white">
      <!-- <commonLogin style="color:white"></commonLogin> -->
    <div class="row center" style="padding-top: 50px;">
        <div class="col-100">
            <img src="../../../../style/toolsImg/success.png" alt="" width="40">
        </div>
        <div class="col-100" style="color:white" v-if="this.$store.getters.toolsLanguage == 'zh_CN'">
            <p class="font16" >导入成功！</p>
            <p class="font14">请前往Mjoymanager APP完善信息！</p>
        </div>
        <div class="col-100" style="color:white" v-else>
            <p class="font16">{{$t('tools.importSuccess')}}</p>
            <p class="font14">{{$t('tools.message')}}</p>
        </div>
        <div class="col-100 font16 center top40" style="margin-bottom:50px">
          <button @click="continueInport" v-if="this.$store.getters.toolsLanguage == 'zh_CN'">返回设置</button>
          <button @click="continueInport" v-else>返回设置</button>
      </div>
    </div>
    <div class="shapeBg top50 animated fadeInUp">
        <commonFixCheck></commonFixCheck>
    </div>
  </div>
</template>

<script>
import commonLogin from "../../components/commonLogin"
import commonFixCheck from "../../components/commonFixCheck"
export default {
  name: "login",
  components: {
    commonLogin,
    commonFixCheck
  },
  data() {
    return {
      
    };
  },
  methods: {
    //   继续导入
      continueInport(){
        window.android.toMain();
          // this.$router.push({ path: "/importStart"});
      },
  },
  created() {
  },
  computed: {
    toolsLanguage: {
      get() {
        return this.$store.getters.toolsLanguage;
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
.shapeBg{
    background-image: url('../../../../style/toolsImg/shape.png');
    position: absolute;
    bottom: 0;
    width: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 50%;
}
button{
    border: none;
    background: #ffffff;
    color: #F46F24;
    padding: 10px 60px;
    border-radius: 20px;
    font-size: 14px;
}
.storeList li{
    margin-top: 30px;
}
</style>