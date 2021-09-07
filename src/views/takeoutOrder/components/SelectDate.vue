<template>
  <div>
    <div class="row no-gutter top20">
      <div class="col-45 timeSelect font12" @click="showPopup(true)">{{start_time | YMD}}</div>
      <div class="col-10 center" style="line-height:30px">
        <span class="color-darkbrown">-</span>
      </div>
      <div class="col-45 timeSelect font12" @click="showPopup(false)">{{end_time | YMD}}</div>
    </div>

    <van-popup v-model="show" position="bottom" style="border-radius:15px 15px 0 0" @touchmove.prevent>
      <van-datetime-picker
        v-model="dateValue"
        @confirm="confirmDataClick"
        @cancel="cancelDataClick"
        type="date"
      />
    </van-popup>
  </div>
</template>
<script>
export default {
  name: "nav-bar",
  components: {},
  props: {},
  data() {
    return {
      show: false,
      isSelectMin: false,
      start_time: null,
      end_time: null,
      dateValue: new Date()
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
        this.start_time = value;
      } else {
        this.end_time = value;
      }

      if (this.start_time != null && this.end_time != null) {
        var start = new Date(this.start_time.toString().replace(/-/g, "/"));
        var end = new Date(this.end_time.toString().replace(/-/g, "/"));

        var cday = this.datedifference(start, end);
        if (start > end) {
          this.toast.fail("开始时间必须大于结束时间");
        } else if (cday > 31) {
          this.toast.fail("最多查询31天");
        } else {
          this.$emit("confirmDataClick", this.start_time, this.end_time);
        }
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
</style>