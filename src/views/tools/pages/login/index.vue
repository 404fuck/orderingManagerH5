<template>
  <div class="main-layout" id="apply" style="height: 100%;background: linear-gradient(to top, #EC3C1C , #FE823A);color:white">
      <!-- <commonLogin style="color:white"></commonLogin> -->
      <div class="row" style="padding-top: 50px;">
        <div class="col-100 right logoCss">
          <img src="../../../../style/toolsImg/logo.png" alt="" width="100">
        </div>
        <div class="col-100 center" style="margin: 6px 30px;">
            <img src="../../../../style/toolsImg/join.png" alt="" width="24">
        </div>
        <div class="col-100 left logo1Css">
          <img src="../../../../style/toolsImg/logo1.png" alt="" width="132">
        </div>
      </div>
    <div class="row">
      <div class="col-100 font16 center top30" style="margin-bottom:50px">
          <p>{{$t('tools.dataImport')}}</p>
          <p>{{$t('tools.openStore')}}</p>
      </div>
    </div>
    <div class="shapeBg top50" :style="nowHeight== true?'top:20px;height:100%':''">
        <div class="row " style="padding: 0 40px 30px 40px;position: relative;top: 50%;transform: translateY(-50%);">
        <div class="col-100 font20">
            <span style="color:#F46F24;display:block" class="top60">{{$t('tools.storeShouquan')}}</span>
            <ul style="color:#505050" class="font14 top20">
                <li><span>{{$t('tools.storeNmae')}}</span><span class="right"><input type="text" v-model="userName" ></span></li>
                <li><span>{{$t('tools.email')}}</span><span class="right"><input type="text" v-model="userEmail" style="width:180px"></span></li>
                <li><span>{{$t('tools.pwd')}}</span><span class="right"><input type="text" v-model="userPwd"></span></li>
            </ul>
        </div>
        <div class="col-100 top10 font12">
          <el-checkbox name="a" v-model="agreeSelect" true-label='1' false-labe='0'>
            <span style="color:#808080;font-size:12px">{{$t('tools.agree')}}</span>
            <span style="color:#4C9BF0;font-size:12px">《<span style="text-decoration: underline;">{{$t('tools.tiaokuan')}}</span>》</span>
          </el-checkbox>
        </div>
        <div class="col-100 top20 center">
            <button @click="shouquanLogin">{{$t('tools.Authorized')}}</button>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import commonLogin from "../../components/commonLogin"
export default {
  name: "login",
  components: {
    commonLogin,
  },
  computed: {
    toolsLanguage: {
      get() {
        return this.$store.getters.toolsLanguage;
      },
      set(val) {}
    },
  },
  data() {
    return {
      userName:'',
      userEmail:'',
      userPwd:'',
      agreeSelect:'',
      defaultPhoneHeight:'', //屏幕默认高度
      nowPhoneHeight:'' ,//屏幕现在的高度
      nowHeight:false
    };
  },
  methods: {
    //  inputClick(){
    //   alert('111')
    // },
    //   授权登录
      shouquanLogin(){
        
        if(this.userName == 'mjoy' && this.userEmail == 'fufeng2004@sohu.com' && this.userPwd == 'mj93541703' && this.agreeSelect == '1'){
          window.location.href = "./tools.html#/importStart";
        }else{
          if(this.userName != 'mjoy'){
            this.toast.fail(this.$t('tools.inputZhanghao'))
          }else if(this.userEmail != 'fufeng2004@sohu.com'){
            this.toast.fail(this.$t('tools.inputEmail'))
          }else if(this.userPwd != 'mj93541703'){
            this.toast.fail(this.$t('tools.inputPassword'))
          }else{
            this.toast.fail(this.$t('tools.inputTiaokuan'))
          }
          // this.toast.fail(this.$t('tools.loginFail'))
          // this.userName='';
          // this.userEmail='';
          // this.userPwd=''
        }
      },
      login(){
      let that = this;
      let data = {
        username: that.$route.query.user,
        password: that.$route.query.password
      }
      data.username = that.$route.query.user
      this.request.login(data, function (res) {
        if (res.code == "1") {
          that.mobile_inf = res.data.mobile_inf
          that.pwd = res.data.pwd
          // alert(res.data.pwd)
          that.$store.dispatch("setpwd", res.data.pwd);
          that.toolsToken = res.data.token
          that.$store.dispatch("setmobile_inf", that.mobile_inf);
          that.$store.dispatch("settoolsToken", that.toolsToken);
          
        }else{
          // that.toast.fail(res.msg)
        }
      })
    },
  },
  created() {
    this.login()
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
    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    window.onresize = function() {
        var nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        if (clientHeight - nowClientHeight > 60 ) {//因为ios有自带的底部高度
            //键盘弹出的事件处理
            document.getElementById("apply").classList.add("focusState");
        }
        else {
            //键盘收起的事件处理
        	document.getElementById("apply").classList.remove("focusState");
        } 
    };
  },
  mounted(){
    this.defaultPhoneHeight = window.innerHeight
    window.onresize = ()=>{
        this.nowPhoneHeight = window.innerHeight
    }
},
  watch: {
    nowPhoneHeight(){
      if(this.defaultPhoneHeight != this.nowPhoneHeight){
        this.nowHeight = true
          //手机键盘被唤起了。
    }else{
      this.nowHeight = false
          //手机键盘被关闭了。
    }
    },
    
    currentStore: {
      handler(newVal, oldVal) {
        if (newVal != undefined && newVal != null) {
          
        }
      }
    },
    
  }, 
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
ul li .right{
    float: right;
}
ul li {
    border-bottom: 1px #D8D8D8 solid;
    margin-top: 12px;
    padding-bottom: 10px;
}
ul li:last-child{
    /* border-bottom: none; */
}
button{
    border: none;
    background: #F46F24;
    padding: 10px 60px;
    border-radius: 20px;
    font-size: 14px;
}
input{
  border: none;
  text-align: right;
}
.active{
  top:20px
}
.focusState {position: absolute;}
</style>