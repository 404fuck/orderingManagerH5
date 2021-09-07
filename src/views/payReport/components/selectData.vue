<template>
    <div class="select-data">
        <div class="time-select" @click="showPopup(true)">{{start_time | YMD}}</div>
        <div class="darkbrown"></div>
        <div class="time-select" @click="showPopup(false)">{{end_time | YMD}}</div>
        <van-popup
            v-model="show"
            position="bottom"
            style="border-radius:15px 15px 0 0"
            @touchmove.prevent
        >
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
    name: "selectData",
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
                var start = new Date(
                    this.start_time.toString().replace(/-/g, "/")
                );
                var end = new Date(this.end_time.toString().replace(/-/g, "/"));

                var cday = this.datedifference(start, end);
                if (start > end) {
                    this.toast.fail("开始时间必须大于结束时间");
                } else if (cday > 31) {
                    this.toast.fail("最多查询31天");
                } else {
                    this.$emit(
                        "confirmDataClick",
                        this.start_time,
                        this.end_time
                    );
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
.darkbrown{
    float: left;
    width: 8px;
    height: 1px;
    margin: 20px 10px;
    background: #505050;
}
.time-select {
    float: left;
    width: 114px;
    padding: 0 15px;
    font-size: 12px;
    height: 30px;
    color: #505050;
    line-height: 30px;
    border-radius: 4px;
    background: #f6f6f6 url("../../../assets/images/time_down2.png") no-repeat 90px center;
    background-size: 16px 7px;
}

</style>