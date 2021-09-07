<!--单选按钮-->
<template>
  <div class="email-checked ">
    <!-- <el-checkbox v-model="checked"></el-checkbox> -->
    <van-checkbox v-model="checked">{{$t('Setemail')}}</van-checkbox>
  </div>
</template>

<script>
export default {
  name: "emailCheckbox",
  props: {
    acceptchecked: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: "acceptchecked",
    event: "revert"
  },
  data() {
    return {
      checked: this.acceptchecked
    };
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
  watch: {
    acceptchecked() {
      this.checked = this.acceptchecked;
    },
    checked() {
      this.$emit("revert", this.checked);
    }
  }
};
</script>

<style scoped>
.email-checked {
  width: 100%;
  margin-top: 20px;
}
.el-checkbox {
  color: #5c575e !important;
}

</style>
