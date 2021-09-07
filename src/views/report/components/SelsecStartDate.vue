<template>
  <div class="selectStart">
    <div class="row no-gutter top20">
      <div class="col-100 timeSelect font12" @click="showPopup(true)">{{startDate | ddMoment}}</div>
    </div>
    <!-- <el-date-picker
      v-model="value1"
      type="date"
      placeholder="选择日期">
    </el-date-picker> -->
    <div v-show="show" style="position: absolute;
    z-index: 999;
    width: 75%;">
      <van-datetime-picker
        v-model="dateValue"
        @confirm="confirmDataClick"
        @cancel="cancelDataClick"
        type="date"
      />
    </div>
    <!-- <van-popup v-model="show" position="bottom" style="border-radius:15px 15px 0 0" @touchmove.prevent>
      <van-datetime-picker
        v-model="dateValue"
        @confirm="confirmDataClick"
        @cancel="cancelDataClick"
        type="date"
      />
    </van-popup> -->
  </div>
</template>
<script>
export default {
  name: "nav-bar",
  components: {},
  props: {
    startDate: {
      type: Object,
      default: null
    },
    endDate: {
      type: Object,
      default: null
    },
  },
  data() {
    return {
      show: false,
      isSelectMin: false,
      dateValue: new Date(),
      value1:''
    };
  },
  methods: {
    datedifference(sDate1, sDate2) {
      //sDate1和sDate2是2006-12-18格式
      var dateSpan, tempDate, iDays;
      sDate1 = Date.parse(sDate1);
      sDate2 = Date.parse(sDate2);
      dateSpan = sDate2 - sDate1;
      dateSpan = Math.abs(dateSpan);
      iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
      return iDays;
    },
    showPopup(isStart) {
      this.isSelectMin = isStart;
      this.show = true;
    },
    confirmDataClick(value) {
      if (this.isSelectMin) {
        this.startDate = value;
      }

      if (this.startDate != null) {
        var start = new Date(this.startDate.toString().replace(/-/g, "/"));
        var cday = this.datedifference(start);
        this.$emit("confirmDataClick", this.startDate);
      }
      this.show = false;
    },
    cancelDataClick() {
      this.show = false;
    }
  },
  created() {},
  watch: {}
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
  width: 180px;
  color: #8e8d8d;
  height: 32px;
}
.timeSelect {
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  background: #f6f6f6;
  border-radius: 5px;
  background-image: url("../../../assets/images/time_down.png");
  background-repeat: no-repeat;
  background-position: 96%;
  background-size: 12px;
}
.van-overlay{
  background-color:white
}
</style>