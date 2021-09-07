<template>
  <div class="main-layout">
    <div class="row">
      <div class="col-50" style="padding-left: 40px;padding-top:45px">
        <img src="../../../style/toolsImg/close.png" alt="" width="16" @click="closeClick">
      </div>
      <div class="col-50 right langStyle top40" style="padding-right: 36px;">
        <el-select class="store-select" v-model="langTitle"  size="small" @change="changeLang">
          <el-option v-for="item in langList" :key="item.key" :label="item.title" :value="item.key">{{item.title}}</el-option>
        </el-select>
      </div>
      <div class="col-100 center top60" style="color:#F46F24">
        <h2>{{$t('tools.storeTools')}}</h2>
      </div>
    </div>
    <div class="row loginCss" style="margin: 80px 40px 0 40px;">
      <div class="col-100 font20" style="color:#505050">
        {{$t('tools.mjoyUser')}}
      </div>
      <div class="col-100 font14 top40 userDiv">
        {{$t('tools.userNmae')}}<el-input type="text" v-model="userName" @keyup.enter.native="loginClick"> </el-input>
      </div>
      <div class="col-100 font14 top40 userDiv">
        {{$t('tools.pwd')}}<el-input type="password" v-model="password" @keyup.enter.native="loginClick"></el-input>
      </div>
      <div class="col-100 font16 top70 center">
        <button class="button" @click="loginClick">{{$t('tools.login')}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TicketStyle",
  components: {},

  data() {
    return {
      langList: [
        { key: "en_US", title: "English" },
        { key: "zh_CN", title: "简体中文"}
      ],
      langTitle:'',
      userName:'',
      password:'',
      mobile_inf:''
    };
  },
  methods: {
    login(){
      let that = this;
      let data = {
        username: that.userName,
        password: that.password
      }
      this.request.login(data, function (res) {
        if (res.code == "1") {
          that.toast.success(that.$t('tools.loginSuccess'))
          that.$router.push({ path: "/login" });
          that.mobile_inf = res.data.mobile_inf
          that.toolsToken = res.data.token
          that.$store.dispatch("setmobile_inf", that.mobile_inf);
          that.$store.dispatch("settoolsToken", that.toolsToken);
        }else{
          that.toast.fail(res.msg)
        }
      })
    },
    loginClick(){
      this.login();
    },
    changeLang(langTitle){
      this.$store.dispatch("settoolsLanguage", langTitle);
      this.$i18n.locale = langTitle;
    },
    closeClick(){
      var userAgent = navigator.userAgent;
      if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") !=-1) {
      window.location.href = "about:blank"
      }else {
        window.opener = null;
        window.open("about:blank", "_self");
        window.close();
      }
  },
  },
  created() {
    this.langTitle = this.$store.getters.toolsLanguage
    this.$i18n.locale = this.langTitle;
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
input{
  border: none;
  padding-bottom: 10px;
  width: 67%;
}

input{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.userDiv{
  border-bottom: 1px #D8D8D8 solid;
}
button{
  background:#F46F24 ;
  border: none;
  color: #ffffff;
  padding: 12px 86px;
  border-radius: 24px;
  height: 46px;
  display: inline-block;
}
</style>