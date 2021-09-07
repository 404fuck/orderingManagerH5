<template>
  <div class="row " style="padding: 0 40px 30px 40px;position: relative;top: 50%;transform: translateY(-50%);">
            <div class="col-100 font20 toolsCheck" v-if="this.$store.getters.toolsLanguage == 'zh_CN'">
                <span style="color:#F46F24;display:block" class="top60">Storehub导入项目</span>
                <ul class="row storeList" style="margin-left: 12px;">
                    <li class="col-50"><el-checkbox name="a" checked @click.native.prevent disabled>门店信息</el-checkbox></li>
                    <li class="col-50">
                        <el-checkbox name="a" checked @click.native.prevent>
                            <span>菜品信息</span>
                        </el-checkbox>
                        <el-popover
                          placement="top-start"
                          trigger="click"
                          style="font-size:12px"
                          content="菜品导入到下架列表，手动编辑上架">
                          <img slot="reference" src="../../../style/toolsImg/tip.png" alt="" width="9" style="position: absolute;">
                      </el-popover>
                        </li>
                    <li class="col-50"><el-checkbox name="a" checked @click.native.prevent>员工信息</el-checkbox></li>
                    <li class="col-50"><el-checkbox name="a" checked @click.native.prevent>会员信息</el-checkbox></li>
                    <li class="col-50"><el-checkbox name="a" checked @click.native.prevent>供应商信息</el-checkbox></li>
                    <li class="col-50"><el-checkbox name="a" checked @click.native.prevent>桌台信息</el-checkbox></li>
                </ul>
            </div>
            <div class="col-100 font20 toolsCheck" v-else>
                <span style="color:#F46F24;display:block" class="top60">{{$t('tools.storeImport')}}</span>
                <ul class="row storeList" style="margin-left: 12px;">
                    <li class="col-50"><el-checkbox name="a" checked @click.native.prevent disabled>{{$t('tools.storeMsg')}}</el-checkbox></li>
                    <li class="col-50">
                        <el-checkbox name="a" checked @click.native.prevent>
                            <span>{{$t('tools.dishMsg')}}</span>
                        </el-checkbox>
                        <el-popover
                          placement="top-start"
                          trigger="click"
                          style="font-size:12px"
                         :content="$t('tools.dishImport')">
                          <img slot="reference" src="../../../style/toolsImg/tip.png" alt="" width="9" style="position: absolute;">
                      </el-popover>
                        </li>
                    <li class="col-50"><el-checkbox name="a" checked @click.native.prevent>{{$t('tools.userMsg')}}</el-checkbox></li>
                    <li class="col-50"><el-checkbox name="a" checked @click.native.prevent>{{$t('tools.vipMsg')}}</el-checkbox></li>
                    <li class="col-50"><el-checkbox name="a" checked @click.native.prevent>{{$t('tools.gongyingshangMsg')}}</el-checkbox></li>
                    <li class="col-50"><el-checkbox name="a" checked @click.native.prevent>{{$t('tools.tableInfo')}}</el-checkbox></li>
                </ul>
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

</style>