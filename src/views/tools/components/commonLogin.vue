<template>
  <div class="main-layout">
    <div class="row font12" style="padding: 24px 30px 50px 30px;">
      <div class="col-50 left">
        <img src="../../../style/toolsImg/userWhite.png" alt="" width="15">
        <span class="left10 font14">{{mobile_inf}}</span>
      </div>
      <div class="col-50 right">
          <span @click="exitLogin" v-if="this.$store.getters.toolsLanguage == 'zh_CN'">退出登录</span>
           <span @click="exitLogin" v-else>{{$t('tools.exitLogin')}}</span>
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
      
    };
  },
  methods: {
    //   退出登录
      exitLogin(){
        this.$dialog.confirm({
            message: this.$store.getters.toolsLanguage == 'zh_CN'?'确认退出登录？':this.$t('tools.confirmLogin'),
            confirmButtonColor:'#FE813C',
            confirmButtonText:this.$store.getters.toolsLanguage == 'zh_CN'?'确认':this.$t('tools.confirm'),
            cancelButtonText:this.$store.getters.toolsLanguage == 'zh_CN'?'取消':this.$t('tools.cancle')
            }).then(() => {
                // 确认退出登录，返回登录页
                window.location.href = "./tools.html#/tools";
            })
            .catch(() => {
                // on cancel
            });
      }
  },
  created() {
   
  },
  computed: {
    toolsLanguage: {
      get() {
        return this.$store.getters.toolsLanguage;
      },
      set(val) {}
    },
    mobile_inf() {
      return this.$store.getters.mobile_inf;
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

</style>