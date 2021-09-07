<template>
  <div>
    <div class="row" style="padding: 25px 40px;">
        <div class="col-100">
          <img @click="closeClick" src="../../../style/images/clo.png" alt width="18" style="float: right;" />
        </div>
        <div class="col-100 fontWeight" style="color:#808080">{{$t('Toemail')}}</div>
        <div class="col-100 top20">
          <input :disabled="isdefault == '1'"  v-model="email" type="text" style="border: none;border-bottom: 1px #b7b7b7 solid;width: 100%;"/>
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
          <button @click="closeClick" class="button cancelBtn">{{$t('cancel')}}</button>
          <button @click="sendClick" class="button sendBtn" style>{{$t('send')}}</button>
        </div>
      </div>
    
  </div>
</template>
<script>
export default {
  name: "nav-bar",
  components: {},
  props: {
    propShow: {
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
      isdefault: 0
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
    sendClick() {
      if (this.email.length <= 0) {
        return;
      }
      this.$emit("sendEmailClick", this.email,this.isdefault);
      this.propShow = false;
      this.$emit("closeClick", false);
    },
    closeClick() {
      this.propShow = false;
      this.$emit("closeClick", false);
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
      this.request.getUserMail({},function(res) {
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