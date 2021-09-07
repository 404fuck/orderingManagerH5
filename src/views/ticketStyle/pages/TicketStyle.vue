<template>
  <div class="main-layout">
    <div class="row">
      <div
        class="col-100"
        v-if="$store.getters.language == 'zh_CN'"
      >
        <div class="row">
          <div class="col-100">
            <h4 style="margin: 20px 0px 0px 20px;color:#505050">{{$t('ticketStyle.houchuxiaopiao')}}</h4>
          </div>
          <div class="col-100">
            <div
              class="row"
              style="padding: 0px 10px 20px 15px;margin-right: 15px;"
            >
              <div class="col-30">
                <div class="divStyle">
                  <img
                    src="../../../assets/images/zhizuodanCN.png"
                    preview="1"
                    :preview-text="$t('ticketStyle.zhizuodan')"
                    width="104"
                  />
                  <span class="spanStyle">{{$t('ticketStyle.zhizuodan')}}</span>
                </div>
              </div>
              <div class="col-30">
                <div class="divStyle">
                  <img
                    src="../../../assets/images/zhizuodanJHCN.png"
                    preview="1"
                    :preview-text="$t('ticketStyle.zhizuodanJH')"
                    width="104"
                  />
                  <span class="spanStyle">{{$t('ticketStyle.zhizuodanJH')}}</span>
                </div>
              </div>
              <div class="col-30">
                <div class="divStyle">
                  <img
                    src="../../../assets/images/zhizuodanWDCN.png"
                    preview="1"
                    :preview-text="$t('ticketStyle.zhizuodanWD')"
                    width="104"
                  />
                  <span class="spanStyle">{{$t('ticketStyle.zhizuodanWD')}}</span>
                </div>
              </div>
              <div class="col-30">
                <div class="divStyle">
                  <img
                    src="../../../assets/images/chanpingLabelCN.png"
                    preview="1"
                    :preview-text="$t('ticketStyle.chanpinLabel')"
                    width="104"
                  />
                  <span class="spanStyle">{{$t('ticketStyle.chanpinLabel')}}</span>
                </div>
              </div>
              <div class="col-30">
                <div class="divStyle">
                  <img
                    src="../../../assets/images/chanpingLabelJHCN.png"
                    preview="1"
                    :preview-text="$t('ticketStyle.chanpinLabelJH')"
                    width="104"
                  />
                  <span class="spanStyle">{{$t('ticketStyle.chanpinLabelJH')}}</span>
                </div>
              </div>
              <div class="col-30">
                <div class="divStyle">
                  <img
                    src="../../../assets/images/cuicaidanCN.png"
                    preview="1"
                    :preview-text="$t('ticketStyle.cuicaidan')"
                    width="104"
                  />
                  <span class="spanStyle">{{$t('ticketStyle.cuicaidan')}}</span>
                </div>
              </div>
              <div class="col-30">
                <div class="divStyle">
                  <img
                    src="../../../assets/images/tuicaidanCN.png"
                    preview="1"
                    :preview-text="$t('ticketStyle.tuicaidan')"
                    width="104"
                  />
                  <span class="spanStyle">{{$t('ticketStyle.tuicaidan')}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-100">
            <h4 style="margin: 20px 0px 0px 20px;color:#505050">{{$t('ticketStyle.shouyinxiaopiao')}}</h4>
          </div>
          <div class="col-100">
            <div
              class="row"
              style="padding: 0px 10px 20px 15px;margin-right: 15px;"
            >
              <div class="col-30">
                <div class="divStyle">
                  <img
                    src="../../../assets/images/jiezhangdanCN.png"
                    preview="2"
                    :preview-text="$t('ticketStyle.jiezhangdan')"
                    width="104"
                  />
                  <span class="spanStyle">{{$t('ticketStyle.jiezhangdan')}}</span>
                </div>
              </div>
              <div class="col-30">
                <div class="divStyle">
                  <img
                    src="../../../assets/images/jiezhangdanJHCN.png"
                    preview="2"
                    :preview-text="$t('ticketStyle.jiezhangdanJH')"
                    width="104"
                  />
                  <span class="spanStyle">{{$t('ticketStyle.jiezhangdanJH')}}</span>
                </div>
              </div>
              <div class="col-30">
                <div class="divStyle">
                  <img
                    src="../../../assets/images/jiezhangdanWDCN.png"
                    preview="2"
                    :preview-text="$t('ticketStyle.jiezhangdanWD')"
                    width="104"
                  />
                  <span class="spanStyle">{{$t('ticketStyle.jiezhangdanWD')}}</span>
                </div>
              </div>
              <div class="col-30">
                <div class="divStyle">
                  <img
                    src="../../../assets/images/kedanCN.png"
                    preview="2"
                    :preview-text="$t('ticketStyle.kedan')"
                    width="104"
                  />
                  <span class="spanStyle">{{$t('ticketStyle.kedan')}}</span>
                </div>
              </div>
              <div class="col-30">
                <div class="divStyle">
                  <img
                    src="../../../assets/images/kedanWDCN.png"
                    preview="2"
                    :preview-text="$t('ticketStyle.kedanWD')"
                    width="104"
                  />
                  <span class="spanStyle">{{$t('ticketStyle.kedanWD')}}</span>
                </div>
              </div>
              <div class="col-30">
                <div class="divStyle">
                  <img
                    src="../../../assets/images/tuikuanpiaoZN.png"
                    preview="2"
                    :preview-text="$t('ticketStyle.tuikuanxiaopiao')"
                    width="104"
                  />
                  <span class="spanStyle">{{$t('ticketStyle.tuikuanxiaopiao')}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-100">
            <h4 style="margin: 20px 0px 0px 20px;color:#505050">{{$t('ticketStyle.other')}}</h4>
          </div>
          <div class="col-100">
            <div
              class="row"
              style="padding: 0px 10px 20px 15px;margin-right: 15px;"
            >
              <div class="col-30">
                <div class="divStyle">
                  <img
                    src="../../../assets/images/rijiedanCN.png"
                    preview="3"
                    :preview-text="$t('ticketStyle.rijiedan')"
                    width="104"
                  />
                  <span class="spanStyle">{{$t('ticketStyle.rijiedan')}}</span>
                </div>
              </div>
              <div class="col-30">
                <div class="divStyle">
                  <img
                    src="../../../assets/images/rijieJ_CN.png"
                    preview="3"
                    :preview-text="$t('ticketStyle.rijieJ')"
                    width="104"
                  />
                  <span class="spanStyle">{{$t('ticketStyle.rijieJ')}}</span>
                </div>
              </div>
              <div class="col-30">
                <div class="divStyle">
                  <img
                    src="../../../assets/images/jiaojiedanCN.png"
                    preview="3"
                    :preview-text="$t('ticketStyle.jiaojiedan')"
                    width="104"
                  />
                  <span class="spanStyle">{{$t('ticketStyle.jiaojiedan')}}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div
        class="col-100"
        v-else-if="$store.getters.language == 'en_US'"
      >
        <div class="row">
          <div class="col-100">
            <h4 style="margin: 20px 0px 0px 20px;color:#505050">{{$t('ticketStyle.houchuxiaopiao')}}</h4>
          </div>
          <div class="col-100">
            <div
              class="row"
              style="padding: 0px 10px 20px 15px;margin-right: 15px;"
            >
              <div class="col-30">
                <div class="divStyle">
                  <img
                    src="../../../assets/images/zhizuodan.png"
                    preview="1"
                    :preview-text="$t('ticketStyle.zhizuodan')"
                    width="104"
                  />
                  <span class="spanStyle">{{$t('ticketStyle.zhizuodan')}}</span>
                </div>
              </div>
              <div class="col-30">
                <div class="divStyle">
                  <img
                    src="../../../assets/images/zhizuodanJH.png"
                    preview="1"
                    :preview-text="$t('ticketStyle.zhizuodanJH')"
                    width="104"
                  />
                  <span class="spanStyle">{{$t('ticketStyle.zhizuodanJH')}}</span>
                </div>
              </div>
              <div class="col-30">
                <div class="divStyle">
                  <img
                    src="../../../assets/images/zhizuodanWD.png"
                    preview="1"
                    :preview-text="$t('ticketStyle.zhizuodanWD')"
                    width="104"
                  />
                  <span class="spanStyle">{{$t('ticketStyle.zhizuodanWD')}}</span>
                </div>
              </div>
              <div class="col-30">
                <div class="divStyle">
                  <img
                    src="../../../assets/images/chanpingLabel.png"
                    preview="1"
                    :preview-text="$t('ticketStyle.chanpinLabel')"
                    width="104"
                  />
                  <span class="spanStyle">{{$t('ticketStyle.chanpinLabel')}}</span>
                </div>
              </div>
              <div class="col-30">
                <div class="divStyle">
                  <img
                    src="../../../assets/images/chanpingLabelJH.png"
                    preview="1"
                    :preview-text="$t('ticketStyle.chanpinLabelJH')"
                    width="104"
                  />
                  <span class="spanStyle">{{$t('ticketStyle.chanpinLabelJH')}}</span>
                </div>
              </div>
              <div class="col-30">
                <div class="divStyle">
                  <img
                    src="../../../assets/images/cuicaidan.png"
                    preview="1"
                    :preview-text="$t('ticketStyle.cuicaidan')"
                    width="104"
                  />
                  <span class="spanStyle">{{$t('ticketStyle.cuicaidan')}}</span>
                </div>
              </div>
              <div class="col-30">
                <div class="divStyle">
                  <img
                    src="../../../assets/images/tuicaidan.png"
                    preview="1"
                    :preview-text="$t('ticketStyle.tuicaidan')"
                    width="104"
                  />
                  <span class="spanStyle">{{$t('ticketStyle.tuicaidan')}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-100">
            <h4 style="margin: 20px 0px 0px 20px;color:#505050">{{$t('ticketStyle.shouyinxiaopiao')}}</h4>
          </div>
          <div class="col-100">
            <div
              class="row"
              style="padding: 0px 10px 20px 15px;margin-right: 15px;"
            >
              <div class="col-30">
                <div class="divStyle">
                  <img
                    src="../../../assets/images/jiezhangdan.png"
                    preview="2"
                    :preview-text="$t('ticketStyle.jiezhangdan')"
                    width="104"
                  />
                  <span class="spanStyle">{{$t('ticketStyle.jiezhangdan')}}</span>
                </div>
              </div>
              <div class="col-30">

                <div class="divStyle">
                  <img
                    src="../../../assets/images/jiezhangdanJH.png"
                    preview="2"
                    :preview-text="$t('ticketStyle.jiezhangdanJH')"
                    width="104"
                  />
                  <span class="spanStyle">{{$t('ticketStyle.jiezhangdanJH')}}</span>
                </div>

              </div>
              <div class="col-30">

                <div class="divStyle">
                  <img
                    src="../../../assets/images/jiezhangdanWD.png"
                    preview="2"
                    :preview-text="$t('ticketStyle.jiezhangdanWD')"
                    width="104"
                  />
                  <span class="spanStyle">{{$t('ticketStyle.jiezhangdanWD')}}</span>
                </div>

              </div>
              <div class="col-30">

                <div class="divStyle">
                  <img
                    src="../../../assets/images/kedan.png"
                    preview="2"
                    :preview-text="$t('ticketStyle.kedan')"
                    width="104"
                  />
                  <span class="spanStyle">{{$t('ticketStyle.kedan')}}</span>
                </div>

              </div>
              <div class="col-30">

                <div class="divStyle">
                  <img
                    src="../../../assets/images/kedanWD.png"
                    preview="2"
                    :preview-text="$t('ticketStyle.kedanWD')"
                    width="104"
                  />
                  <span class="spanStyle">{{$t('ticketStyle.kedanWD')}}</span>
                </div>

              </div>
              <div class="col-30">

                <div class="divStyle">
                  <img
                    src="../../../assets/images/tuikuanpiaoEN.png"
                    preview="2"
                    :preview-text="$t('ticketStyle.tuikuanxiaopiao')"
                    width="104"
                  />
                  <span class="spanStyle">{{$t('ticketStyle.tuikuanxiaopiao')}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-100">
            <h4 style="margin: 20px 0px 0px 20px;color:#505050">{{$t('ticketStyle.other')}}</h4>
          </div>
          <div class="col-100">
            <div class="row" style="padding: 0px 10px 20px 15px;margin-right: 15px;">
                <div  class="col-30" >
            <div class="divStyle">
              <img
                src="../../../assets/images/rijiedan.png"
                preview="3"
                :preview-text="$t('ticketStyle.rijiedan')"
                width="104"/>
              <span class="spanStyle">{{$t('ticketStyle.rijiedan')}}</span>
            </div>
          </div>
            <div  class="col-30" >
            <div class="divStyle">
              <img
                src="../../../assets/images/rijieJ.png"
                preview="3"
                :preview-text="$t('ticketStyle.rijieJ')"
                width="104" />
              <span class="spanStyle">{{$t('ticketStyle.rijieJ')}}</span>
            </div>
          </div>
          <div class="col-30">
            <div class="divStyle">
              <img
                src="../../../assets/images/jiaojiedan.png"
                preview="3"
                :preview-text="$t('ticketStyle.jiaojiedan')"
                width="104"
              />
              <span class="spanStyle">{{$t('ticketStyle.jiaojiedan')}}</span>
            </div>
          </div>
            </div>
          </div>
          
        </div>
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
      fullscreenEl: false, //控制是否显示右上角全屏按钮
      closeEl: false, //控制是否显示右上角关闭按钮
      tapToClose: true, //点击滑动区域应关闭图库
      shareEl: false, //控制是否显示分享按钮
      zoomEl: false, //控制是否显示放大缩小按钮
      counterEl: false, //控制是否显示左上角图片数量按钮
      arrowEl: true, //控制如图的左右箭头（pc浏览器模拟手机时）
      tapToToggleControls: true, //点击应切换控件的可见性
      clickToCloseNonZoomable: true //点击图片应关闭图库，仅当图像小于视口的大小时
    };
  },
  methods: {},
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

    this.dep_ID = this.$route.query.dep_ID;
    this.currentStore.dep_ID = this.$route.query.dep_ID;
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
          this.managedata();
        }
      }
    }
  }
};
</script>
<style scoped>
.divStyle {
  display: inline-block;
}
.divStyle img {
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin-right: 12px;
  margin-top: 20px;
  margin-bottom: 10px;
  width: 104px;
  height: 104px;
}
.spanStyle {
  display: block;
  text-align: center;
  color: #505050;
  font-size: 12px;
  width: 104px;
}
</style>