<template>
  <div class="main-layout importStart" style="height: 100%;background: linear-gradient(to top, #EC3C1C , #FE823A);color:white;position: fixed;">
      <div v-show="startDiv">
        <!-- <commonLogin style="color:white" ></commonLogin> -->
      <div class="row" style="padding-top: 50px;">
        <div class="col-100 right logoCss" style="">
          <img src="../../../../style/toolsImg/logo.png" alt="" width="100">
        </div>
        <div class="col-100 center" style="margin: 10px 30px;">
            <div class="row no-gutter">
                <div class="col-40 storeHUbDiv">
                  <!-- <el-select class="store-select" v-model="requestData.storehun_dep" size="small" @change="storehubChange" :placeholder="this.$store.getters.toolsLanguage == 'zh_CN'?'请选择':$t('orderDetail.select')">
                      <el-option v-for="(item,index) in storehubStore"
                          :key="index"
                          :label="item.dep_comp_name"
                          :value="item"></el-option>
                          <div class="search-div center" slot="empty" @click="refreshClick">
                            <i class="el-icon-loading"></i>
                            <span class="font14" v-if="this.$store.getters.toolsLanguage == 'zh_CN'">刷新</span>
                            <span class="font14" v-else>{{$t('tools.refresh')}}</span>
                          </div>
                  </el-select> -->
                </div>
                <div class="col-20"><img src="../../../../style/toolsImg/join.png" alt="" width="24"></div>
                <div class="col-40 mjoyDiv">
                    <!-- <el-select class="store-select" v-model="shule_dep"  size="small" @change="mjoyChange">
                      <el-option v-for="item in mjoyStore"
                          :key="item.dep_ID"
                          :label="item.dep_comp_name"
                          :value="item.dep_ID"></el-option>
                  </el-select> -->
                </div>
            </div>
          
        </div>
        <div class="col-100 left logo1Css" style="">
          <img src="../../../../style/toolsImg/logo1.png" alt="" width="132">
        </div>
      </div>
    <div class="row">
        <div class="col-100 font16 center top40" style="margin-bottom:50px">
          <button @click="startInport" v-if="this.$store.getters.toolsLanguage == 'zh_CN'">开始导入</button>
          <button @click="startInport" v-else>{{$t('tools.startImport')}}</button>
      </div>
    </div>
    <div class="shapeBg top50">
        <div class="row " style="padding: 0 40px 30px 40px;position: relative;top: 50%;transform: translateY(-50%);">
            <div class="col-100 font20 toolsCheck" v-if="this.$store.getters.toolsLanguage == 'zh_CN'">
                <span style="color:#F46F24;display:block" class="top60">Storehub导入项目</span>
                <ul class="row storeList" style="margin-left: 12px;">
                    <li class="col-50"><el-checkbox name="a" v-model="has_dep" true-label='1' false-labe='0' disabled>门店信息</el-checkbox></li>
                    <li class="col-50">
                        <el-checkbox name="a" v-model="has_dishes" true-label='1' false-labe='0'>
                            <span>菜品信息</span>
                        </el-checkbox>
                        <el-popover
                          placement="top-start"
                          trigger="click"
                          style="font-size:12px"
                          content="菜品导入到下架列表，手动编辑上架">
                          <img slot="reference" src="../../../../style/toolsImg/tip.png" alt="" width="9" style="position: absolute;">
                      </el-popover>
                    </li>
                    <li class="col-50"><el-checkbox name="a" v-model="has_user" true-label='1' false-labe='0'>员工信息</el-checkbox></li>
                    <li class="col-50"><el-checkbox name="a" v-model="has_cust" true-label='1' false-labe='0'>会员信息</el-checkbox></li>
                    <li class="col-50"><el-checkbox name="a" v-model="has_supervisor" true-label='1' false-labe='0'>供应商信息</el-checkbox></li>
                    <!-- <li class="col-50"><el-checkbox name="a" v-model="has_bankcode" true-label='1' false-labe='0'>收款信息</el-checkbox></li> -->
                    <li class="col-50"><el-checkbox name="a" v-model="has_table" true-label='1' false-labe='0'>桌台信息</el-checkbox></li>
                </ul>
            </div>
            <div class="col-100 font20 toolsCheck" v-else>
                <span style="color:#F46F24;display:block" class="top60">{{$t('tools.storeImport')}}</span>
                <ul class="row storeList" style="margin-left: 12px;">
                    <li class="col-50"><el-checkbox name="a" v-model="has_dep" true-label='1' false-labe='0' disabled>{{$t('tools.storeMsg')}}</el-checkbox></li>
                    <li class="col-50">
                        <el-checkbox name="a" v-model="has_dishes" true-label='1' false-labe='0'>
                            <span>{{$t('tools.dishMsg')}}</span>
                        </el-checkbox>
                        <el-popover
                          placement="top-start"
                          trigger="click"
                          style="font-size:12px"
                          :content="$t('tools.dishImport')">
                          <img slot="reference" src="../../../../style/toolsImg/tip.png" alt="" width="9" style="position: absolute;">
                      </el-popover>
                    </li>
                    <li class="col-50"><el-checkbox name="a" v-model="has_user" true-label='1' false-labe='0'>{{$t('tools.userMsg')}}</el-checkbox></li>
                    <li class="col-50"><el-checkbox name="a" v-model="has_cust" true-label='1' false-labe='0'>{{$t('tools.vipMsg')}}</el-checkbox></li>
                    <li class="col-50"><el-checkbox name="a" v-model="has_supervisor" true-label='1' false-labe='0'>{{$t('tools.gongyingshangMsg')}}</el-checkbox></li>
                    <!-- <li class="col-50"><el-checkbox name="a" v-model="has_bankcode" true-label='1' false-labe='0'>收款信息</el-checkbox></li> -->
                    <li class="col-50"><el-checkbox name="a" v-model="has_table" true-label='1' false-labe='0'>{{$t('tools.tableInfo')}}</el-checkbox></li>
                </ul>
            </div>
        </div>
    </div>
      </div>
    <div v-show="importingDiv">
      <!-- <div class="row font12" style="padding: 40px 30px;color:#979797">
          <div class="col-50 left">
            <img src="../../../../style/toolsImg/userno.png" alt="" width="15">
            <span class="font14" style="margin-left:8px">{{mobile_inf}}</span>
          </div>
          <div class="col-50 right">
              <span v-if="this.$store.getters.toolsLanguage == 'zh_CN'">退出登录</span>
              <span v-else>{{$t('tools.exitLogin')}}</span>
          </div>
        </div> -->
       <div class="row" style="padding-top:40px">
        <div class="col-100 right logoCss" >
          <img src="../../../../style/toolsImg/logo.png" alt="" width="100">
        </div>
        <div class="col-100 center" style="margin: 10px 30px;">
            <div class="row no-gutter">
                <div class="col-40 font14 left storeHUbText">
                  <!-- <span>{{bbb}}</span> -->
                </div>
                <div class="col-20"><img src="../../../../style/toolsImg/join.png" alt="" width="24"></div>
                <div class="col-40 font14 left mjoyText" v-if="this.$store.getters.toolsLanguage == 'zh_CN'">
                  <!-- <span v-if="aaa == ''">新建门店</span>
                  <span v-else>{{aaa}}</span> -->
                </div>
                <div class="col-40 font14 left mjoyText" v-else>
                  <!-- <span v-if="aaa == ''">{{$t('tools.addStore')}}</span>
                  <span v-else>{{aaa}}</span> -->
                </div>
            </div>
          
        </div>
        <div class="col-100 left logo1Css" >
          <img src="../../../../style/toolsImg/logo1.png" alt="" width="132">
        </div>
      </div>
        <div class="row" >
            <div class="col-100" style="padding-top: 60px;">
                <el-steps direction="vertical"  :space="42" size="small" style="position: absolute;left: 50%; transform: translateX(-50%);">
                  <el-step v-show="requestData.has_user=='1'" :class="user == '导入完成'?'is-finish':''">
                      <template slot="title" >
                            <div class="row">
                              <div class="col-100">
                                <span v-if="this.$store.getters.toolsLanguage == 'zh_CN'">员工信息</span>
                                <span v-else>{{$t('tools.userMsg')}}</span>
                                <img src="../../../../style/toolsImg/loading.gif" alt="" width="17" class="left30" v-show="user == '开始导入'">
                                <img src="../../../../style/toolsImg/ok.png" alt="" width="17" class="left30" v-show="user == '导入完成'">
                              </div>
                            </div>
                        </template>
                    </el-step>
                    <el-step v-show="requestData.has_dep=='1'" :class="dep == '导入完成'?'is-finish':''">
                        <template slot="title" >
                            <div class="row">
                              <div class="col-100">
                                <span v-if="this.$store.getters.toolsLanguage == 'zh_CN'">门店信息</span>
                                <span v-else>{{$t('tools.storeMsg')}}</span>
                                <img src="../../../../style/toolsImg/loading.gif" alt="" width="17" class="left30" v-show="dep == '开始导入'">
                                <img src="../../../../style/toolsImg/ok.png" alt="" width="17" class="left30" v-show="dep == '导入完成'">
                              </div>
                            </div>
                        </template>
                    </el-step>
                    <el-step v-show="requestData.has_dishes=='1'" :class="dish == '导入完成'?'is-finish':''">
                      <template slot="title" >
                            <div class="row">
                              <div class="col-100">
                                <span v-if="this.$store.getters.toolsLanguage == 'zh_CN'">菜品信息</span>
                                <span v-else>{{$t('tools.dishMsg')}}</span>
                                <img src="../../../../style/toolsImg/loading.gif" alt="" width="17" class="left30" v-show="dish == '开始导入'">
                                <img src="../../../../style/toolsImg/ok.png" alt="" width="17" class="left30" v-show="dish == '导入完成'">
                              </div>
                            </div>
                        </template>
                    </el-step>
                    <el-step v-show="requestData.has_cust=='1'" :class="cust == '导入完成'?'is-finish':''">
                      <template slot="title" >
                            <div class="row">
                              <div class="col-100">
                                <span v-if="this.$store.getters.toolsLanguage == 'zh_CN'">会员信息</span>
                                <span v-else>{{$t('tools.vipMsg')}}</span>
                                <img src="../../../../style/toolsImg/loading.gif" alt="" width="17" class="left30" v-show="cust == '开始导入'">
                                <img src="../../../../style/toolsImg/ok.png" alt="" width="17" class="left30" v-show="cust == '导入完成'">
                              </div>
                            </div>
                        </template>
                    </el-step>
                    
                    <el-step v-show="requestData.has_supervisor=='1'" :class="supervior == '导入完成'?'is-finish':''">
                      <template slot="title" >
                            <div class="row">
                              <div class="col-100">
                                <span v-if="this.$store.getters.toolsLanguage == 'zh_CN'">供应商信息</span>
                                <span v-else>{{$t('tools.gongyingshangMsg')}}</span>
                                <img src="../../../../style/toolsImg/loading.gif" alt="" width="17" class="left30" v-show="supervior == '开始导入'">
                                <img src="../../../../style/toolsImg/ok.png" alt="" width="17" class="left30" v-show="supervior == '导入完成'">
                              </div>
                            </div>
                        </template>
                    </el-step>
                    <!-- <el-step v-show="requestData.has_bankcode=='1'" :class="bank == '导入完成'?'is-finish':''">
                      <template slot="title" >
                            <div class="row">
                              <div class="col-100">
                                <span v-if="this.$store.getters.toolsLanguage == 'zh_CN'">收款信息</span>
                                <span v-else>收款信息</span>
                                <img src="../../../../style/toolsImg/loading.gif" alt="" width="17" class="left30" v-show="bank == '开始导入'">
                                <img src="../../../../style/toolsImg/ok.png" alt="" width="17" class="left30" v-show="bank == '导入完成'">
                              </div>
                            </div>
                        </template>
                    </el-step> -->
                     <el-step v-show="requestData.has_table=='1'" :class="table == '导入完成'?'is-finish':''">
                      <template slot="title" >
                            <div class="row">
                              <div class="col-100">
                                <span v-if="this.$store.getters.toolsLanguage == 'zh_CN'">桌台信息</span>
                                <span v-else>{{$t('tools.tableInfo')}}</span>
                                <img src="../../../../style/toolsImg/loading.gif" alt="" width="17" class="left30" v-show="table == '开始导入'">
                                <img src="../../../../style/toolsImg/ok.png" alt="" width="17" class="left30" v-show="table == '导入完成'">
                              </div>
                            </div>
                        </template>
                    </el-step>
                </el-steps>
            </div>
            <div class="col-100 center" style="position:absolute;bottom:30px">
               <img src="../../../../style/toolsImg/load.gif" alt="" width="128" v-if="loadImg">
              <div style="text-align:center" v-if="this.$store.getters.toolsLanguage == 'zh_CN'"  ><span style="font-size: 12px;color: white;">导入时间较长，请耐心等候......</span></div>
              <div v-else   style="text-align:center"><span style="font-size: 12px;color: white;">{{$t('tools.timeTip')}}</span></div>
            </div>
        </div>
    </div>
    <van-dialog v-model="tipsShow" show-cancel-button style="border-radius: 15px;width:280px" cancelButtonColor="#808080" confirmButtonColor="#FE813C" :confirmButtonText="this.$store.getters.toolsLanguage == 'zh_CN'?'确认':$t('tools.confirm')" :cancel-button-text="this.$store.getters.toolsLanguage == 'zh_CN'?'取消':$t('tools.cancle')" @confirm="confirmClick">
      <div class="row center " style="color:#505050;">
        <div class="col-100" style="padding:24px 0;border-bottom:1px #EFF1F2 solid">
          <span class="font16 fontWeight" v-if="this.$store.getters.toolsLanguage == 'zh_CN'">提示</span>
          <span class="font16 fontWeight" v-else>{{$t('tools.importingTip')}}</span>
          <!-- <img src="../../../../style/toolsImg/tips.png" alt="" width="16" style="position: relative;top: 2px;left: 5px;"> -->
        </div>
        <div class="col-100 font14 " style="padding:15px 30px" v-if="this.$store.getters.toolsLanguage == 'zh_CN'">
          导入不覆盖Mjoymanager门店对应字段已有信息！
        </div>
        <div class="col-100 font14 " style="padding:15px 30px" v-else>
          {{$t('tools.importTips')}}
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import commonLogin from "../../components/commonLogin"
import imgUrl from '../../../../style/toolsImg/tips.png'
export default {
  name: "login",
  components: {
    commonLogin,
  },
  data() {
    return {
      dataList:{
        table:[],
        bank: [], 
        cust: [],
        dep: [], 
        dish: [],
        supervior: [], 
        user: [],
        result:[]
      },
      list:[],
      storehubStore:[],
      mjoyStore:{ dep_comp_name: this.$store.getters.toolsLanguage == 'zh_CN'?'新建门店':this.$t('tools.addStore'), dep_ID:"" },
      requestData: {
        pre_url: "mjoy",
        username: this.$store.getters.mobile_inf,
        password: this.$store.getters.pwd,
        shuleusername:'fufeng2004@sohu.com',
        shulepwd:'mj93541703',
        token: this.$store.getters.toolsToken,
        storehun_dep: "", //选中的 Storehun门店
        has_dep: "1",//导入门店信息:1 导入 0 不导入
        has_dishes: "1",//导入菜品信息:1 导入 0 不导入
        has_user: "1",//导入用户信息:1 导入 0 不导入
        has_cust: "1", //导入会员信息:1 导入 0 不导入
        has_supervisor: "1",//导入供应商信息:1 导入 0 不导入
        has_bankcode: "1",//导入银行账户信息:1 导入 0 不导入
        has_table:'1',//导入桌台信息：1 导入  0 不导入
        shule_dep: "",//选择的MJOY 门店
      },
      shule_dep:"",
      startDiv:true,
      importingDiv:false,
      maqTxt:false,
      loadImg:true,
      dep:'',
      dish:'',
      user:'',
      cust:'',
      supervior:'',
      bank:'',
      table:'',
      aaa:'',
      bbb:'',
      stepActive:'0',
      clearTimeSet:null,
      imgUrl:'',
      tipsShow:false,
      stepStates:null,
      has_dep: "1",//导入门店信息:1 导入 0 不导入
      has_dishes: "1",//导入菜品信息:1 导入 0 不导入
      has_user: "1",//导入用户信息:1 导入 0 不导入
      has_cust: "1", //导入会员信息:1 导入 0 不导入
      has_supervisor: "1",//导入供应商信息:1 导入 0 不导入
      has_bankcode: "1",//导入银行账户信息:1 导入 0 不导入
      has_table:'1',//导入桌台信息：1 导入 0 不导入
    };
  },
  methods: {
    // 刷新storehub门店接口
    refreshClick(){
      this.gethundeplist()
    },
    mjoyChange(val){
        var obj = {};
        obj = this.mjoyStore.find(item =>{
            return item.dep_ID === val 
        });
        this.aaa = obj.dep_comp_name
    },
    storehubChange(val){
      this.bbb=val
    },
    //   开始导入
      startInport(){
        // alert(this.$store.getters.mobile_pwd)
        // this.tipsShow = true
        this.confirmClick();
      },
      confirmClick(){
        this.startDiv = false
          this.importingDiv = true
          this.maqTxt = true
          this.importStoreInfo()
          this.setTime()
        // if(this.bbb == ''){
        //   if(this.$store.getters.toolsLanguage == 'zh_CN'){
        //     this.toast.fail('请选择storeHub门店后导入！')
        //   }else{
        //     this.toast.fail(this.$t('tools.selectStore'))
        //   }
          
        // }else{
        //   this.startDiv = false
        //   this.importingDiv = true
        //   this.maqTxt = true
        //   this.importStoreInfo()
        //   this.setTime()
        // }    
      },
      // 设置定时器
      setTime(){
        // 轮询
        this.clearTimeSet=setInterval(() => {
          this.getProgress()
        }, 5000)
      },  
      //清除定时器
      clearTime() 
      {
        clearInterval(this.clearTimeSet);
      },
      // 获取导入进度
      getProgress(){
      let that = this
        let data ={
          token: that.toolsToken
        }
        this.request.getProgress(data, function (res) {
        if (res.code == "1") {
          that.dataList = res.data
          // 收款账号
          var bankData = []
           for (var i in that.dataList.bank) {
              bankData.push(that.dataList.bank[i]);
          }
          that.bank = bankData[0]
          // 供应商信息
          var superviorData = []
           for (var i in that.dataList.supervior) {
              superviorData.push(that.dataList.supervior[i]);
          }
          that.supervior = superviorData[0]
          // 会员信息
          var custData = []
           for (var i in that.dataList.cust) {
              custData.push(that.dataList.cust[i]);
          }
          that.cust = custData[0]
          // 员工信息
          var userData = []
           for (var i in that.dataList.user) {
              userData.push(that.dataList.user[i]);
          }
          that.user = userData[0]
          // 菜品信息
          var dishData = []
           for (var i in that.dataList.dish) {
              dishData.push(that.dataList.dish[i]);
          }
          that.dish = dishData[0]
          // 门店信息
          var depData = []
           for (var i in that.dataList.dep) {
              depData.push(that.dataList.dep[i]);
          }
          that.dep = depData[0]

          // 桌台信息
          var tableData = []
           for (var i in that.dataList.table) {
              tableData.push(that.dataList.table[i]);
          }
          that.table = tableData[0]

          // 导入成功/导入失败
          var resultData = []
           for (var i in that.dataList.result) {
              resultData.push(that.dataList.result[i]);
          }
          that.result = resultData[2]
          if(that.result == "导入成功"){
            that.loadImg = false
            that.$router.push({ path: "/importSuccess"});
          }else if(that.result == "导入失败"){
            that.$router.push({ path: "/importFail"});
          }
        }else{
          that.toast.fail(res.msg)
          that.$router.push({ path: "/importFail"});
        }
      })
    },
      // storehun数据导入到mjoy平台
      importStoreInfo(){
        let that = this
        that.requestData.storehun_dep = ''
        that.requestData.shule_dep = that.shule_dep+''
        that.requestData.has_dep = that.has_dep ? '1' : '0'
        that.requestData.has_dishes = that.has_dishes ? '1' : '0'
        that.requestData.has_user = that.has_user ? '1' : '0'
        that.requestData.has_cust = that.has_cust ? '1' : '0'
        that.requestData.has_supervisor = that.has_supervisor ? '1' : '0'
        // that.requestData.has_bankcode = that.has_bankcode ? '1' : '0'
        that.requestData.has_table = that.has_table ? '1' : '0'
        this.request.importStoreInfo(this.requestData, function (res) {
          if (res.code == "1") {
            
          }else{
            that.toast.fail(res.msg)
            that.$router.push({ path: "/importFail"});
          }
        })
      },
      // 获取Storehun门店列表
      gethundeplist(){
        let that = this
        let data ={
          pre_url: "mjoy",
          username: "fufeng2004@sohu.com",
          password: "mj93541703", 
          token: that.toolsToken
        }
        this.request.gethundeplist(data, function (res) {
        if (res.code == "1") {
          for(let i in res.data){
            that.storehubStore.push(res.data[i].dep_comp_name)
          }
        }else{
          that.toast.fail(res.msg)
        }
      })
    },
    // 获取Mjoy门店列表
      getdeplist(){
        let that = this
        let data ={
          token: that.toolsToken
        }
        this.request.getdeplist(data, function (res) {
        if (res.code == "1") {
          var list = [{ dep_comp_name: that.$store.getters.toolsLanguage == 'zh_CN'?'新建门店':that.$t('tools.addStore'), dep_ID:"" }];
          for(let i in res.data){
            list.push(res.data[i])
          }
          that.mjoyStore = list
        }else{
          that.toast.fail(res.msg)
        }
      })
    },
  },
  mounted(){
    // 组件离开清除定时器
    this.$once('hook:beforeDestroy', () => {            
        clearInterval(this.clearTimeSet);                                    
    })
  },
  created() {
    // this.gethundeplist()
    // this.getdeplist()

  },
  computed: {
    toolsLanguage: {
      get() {
        return this.$store.getters.toolsLanguage;
      },
      set(val) {}
    },
    toolsToken() {
      return this.$store.getters.toolsToken;
    },
    mobile_inf() {
      return this.$store.getters.mobile_inf;
    },
    mobile_pwd() {
      return this.$store.getters.mobile_pwd;
    },
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
.el-input{
    border: 1px #E5E5E5 solid;
    border-radius: 4px;
}
.el-input__inner{
    background: none;
}
</style>