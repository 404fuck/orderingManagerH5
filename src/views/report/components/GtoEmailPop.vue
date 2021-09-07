<template>
  <div>
    <div class="row" style="padding: 25px 40px;">
        <div class="col-100 fontWeight" style="color:#808080">选择时间：</div>
        <div class="col-100 dateSelect top20">
            <a class="button button-round font12" @click="daySelectClick(0)" :class="{active:daySelect==0}">{{$t('report.today')}}</a>
            <a class="button button-round font12" @click="daySelectClick(1)" :class="{active:daySelect==1}">{{$t('report.yesterday')}}</a>
            <a class="button button-round font12" @click="daySelectClick(4)" :class="{active:daySelect==4}">{{$t('report.diy')}}</a>
        </div>
         <div class="col-100 ">
            <div v-show="daySelect==4">
                <SelsecStartDate @confirmDataClick="confirmDataClick"></SelsecStartDate>
            </div>
        </div>
        <div class="col-100 fontWeight top30" style="color:#808080">{{$t('Toemail')}}</div>
        <div class="col-100 top20">
          <input
            :disabled="isdefault == '1'"
            v-model="email"
            type="text"
            style="border: none;border-bottom: 1px #b7b7b7 solid;width: 100%;"
          />
        </div>
        <div class="col-100 top20 emailCheck">
          <label class="label-checkbox item-content">
            <input
              @click="setDefaultClick"
              :checked="isdefault == '1'"
              type="checkbox"
              name="my-checkbox"
              value="1"
              style="background:#ff3b30"
            />

            <div class="item-media " style="display:inline-block">
              <i class="icon icon-form-checkbox" style="width:16px;height:16px;"></i>
            </div>

            <span class="left5 font14" style="position: relative;top: -3px;">{{$t('Setemail')}}</span>
          </label>
        </div>
        <div class="col-100 btn top30" style="margin-left: 20px;">
          <button @click="GtocloseClick" class="button cancelBtn">{{$t('cancel')}}</button>
          <button @click="sendClick" class="button sendBtn" style>确认</button>
        </div>
      </div>
  </div>
</template>
<script>
import SelsecStartDate from '../components/SelsecStartDate'
export default {
  name: "nav-bar",
  components: {
    SelsecStartDate
  },
  props: {
    GtopropShow: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    },
    file: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      email: "",
      isdefault: 0,
      start_time:"",
      daySelect: 0,
    };
  },
  computed: {
    language() {
      return this.$store.getters.language;
    },
    currentStore: {
      get() {
        return this.$store.getters.currentStore;
      },
      set(val) {}
    },
    storeList() {
      return this.$store.getters.storeList;
    }
  },
  methods: {
    confirmDataClick(start) {
            this.start_time = this.moment(start).format("YYYY-MM-DD");
        },
    // 今日
        getToday() {
            this.start_time = this.moment(this.moment().startOf("day").valueOf()).format("YYYY-MM-DD");
        },
        // 获取昨日的开始结束时间
        getYesterday() {
            this.start_time = this.moment( this.moment().add(-1, "days").startOf("day").valueOf()).format("YYYY-MM-DD");
        },
    sendClick() {
      if (this.email.length <= 0) {
        return;
      }
      this.$emit("sendGtoEmailClick", this.email,this.isdefault,this.start_time);
      this.GtopropShow = false;
      this.$emit("GtocloseClick", false);
    },
    
    daySelectClick(val) {
            this.daySelect = val;
            if (val == 4) {
                return;
            }
            switch (this.daySelect) {
                case 0:
                    this.getToday();
                    break;
                case 1:
                    this.getYesterday();
                    break;
                case 4:
                    this.confirmDataClick();
                    break;
                default:
                    this.getToday();
                    break;
            }
        },
    GtocloseClick() {
      this.GtopropShow = false;
      this.$emit("GtocloseClick", false);
    },
    setDefaultClick() {
      if (this.email.length <= 0) {
        return;
      }
      if (this.isdefault == "1") {
        this.isdefault = "0";
      } else {
        this.isdefault = "1";
      }
      this.updatemail();
    },
    getmail() {
      //paycount
      let that = this;
      this.request.getUserMail({  }, function(res) {
        if (res.code == "1") {
          if (res.data == null) {
            return;
          }
          that.email = res.data.mail;
          that.isdefault = res.data.isdefault;
        } else {
          that.toast.fail(res.msg);
        }
      });
    },
    updatemail() {
      //paycount
      let data = {
        isdefault: this.isdefault,
        mail: this.email
      };
      let that = this;
      this.request.updateUserMail(data, function(res) {
        if (res.code == "1") {
          if (res.data == null) {
            return;
          }
          that.email = res.data.mail;
        } else {
          that.toast.fail(res.msg);
        }
      });
    },
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
    this.start_time = this.moment(this.moment().startOf("day").valueOf()).format("YYYY-MM-DD");
    this.getmail();

  }
};
</script>
<style scoped>
.cancelBtn {
  border-color: #808080;
  color: #808080;
  border-radius: 15px;
}
.btn .button {
  display: inline-block;
  width: 40%;
  height: 30px;
}
.sendBtn {
  margin-left: 30px;
  background: #FE813C;
  border-color: #FE813C;
  color: #fff;
  border-radius: 15px;
}
</style>