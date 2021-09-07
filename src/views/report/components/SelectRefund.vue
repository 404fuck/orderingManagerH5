<template>
  <div>
    <el-select class="store-select" v-model="itemValue" size="small" @change="valueChange">
      <el-option v-for="item in backdishOptions" :key="item.id" :label="item.content" :value="item.id"></el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  name: "nav-bar",
  components: {},
  props: {
    dep_ID: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      data: { content: this.$t("report.all"), id:0 },
      itemValue: 0,
      backdishOptions: [],
    };
  },
  computed: {
    token() {
      return this.$store.getters.token;
    },
    language() {
      return this.$store.getters.language;
    }
  },
  methods: {
    valueChange() {
      this.$emit("valueChange", this.itemValue);
    },

    //查询门店配置
    getDishSet() {
      let that = this;
      let data = { dept_id: this.dep_ID };
      this.request.selectDishSet(data, function(res) {
        if (res.code == "1") {
          if (res.data != null) {
            let temp = JSON.parse(res.data.deal_item);
            that.backdishOptions = [{ content: that.$t("report.all"), id: 0 }];
            let arr;
            if (JSON.stringify(temp) != "{}") {
              arr = temp["backdish"]["list"];
            }
            for (var i in arr) {
              that.backdishOptions.push(arr[i]);
            }
          }
        } else {
          that.toast.fail(res.msg);
        }
      });
    }
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
    this.getDishSet();
  },
  watch: {
    currentStore: {
      handler(newVal, oldVal) {}
    },
    token: {
      handler(newVal, oldVal) {}
    },
    dep_ID: {
      handler(newVal, oldVal) {
        this.itemValue = 0;
        this.getDishSet();
      }
    }
  }
};
</script>
<style scoped>
.store {
  font-size: 16px;
}
.el-option {
  color: #666666;
  float: left;
  size: mini;
  line-height: 39px;
  text-align: center;
  margin-left: 18px;
  display: flex;
  align-items: center;
}
.store-select {
  color: #8e8d8d;
  height: 32px;
}
</style>