<!--
 * @Author: zzt
 * @Date: 2021-04-28 16:13:38
 * @LastEditTime: 2021-05-18 21:47:26
 * @LastEditors: Please set LastEditors
 * @Description: 筛选框里的时间范围（新增样式功能）
 * @FilePath: \sjoyOrderingManagerH5\src\views\report\components\ScreenData.vue
-->

<template>
    <div class="screenData">
        <div :class="isStyleBlock?'Block':'inlineBlock w60'">
            <span
                class="button button-round font12"
                v-for="(item, index) in dataTitles"
                :key="index"
                :class="screenData == index ? 'active' : 'unActive'"
                @click="screenDataClick(index)"
                >{{ item }}</span
            >
        </div>
        <div :class="isStyleBlock?'Block':'inlineBlock w40'">
            <!-- 快捷筛选 -->
            <div class="row top10" v-show="screenData != 3 && screenData != -1">
                <div class="top5" @click="changeScreenClick(-1)">
                    <img
                        src="../../../style/images/left.png"
                        width="20"
                        height="20"
                    />
                </div>
                <div class="dataWrap">{{getFormatStr}} {{getFormatWeekDay}}</div>
                <div class="top5" @click="changeScreenClick(1)">
                    <img
                        src="../../../style/images/right.png"
                        width="20"
                        height="20"
                    />
                </div>
            </div>
            <!-- 自定义筛选 -->
            <div class="row" :class="isStyleBlock?'top10':'position'" v-show="screenData == 3 && screenData != -1">
                <div class="timeSelect" @click="showPopup(true)">
                    {{ startDate | YMD }}
                </div>
                <div class="darkbrown">-</div>
                <div class="timeSelect" @click="showPopup(false)">
                    {{ endDate | YMD }}
                </div>
            </div>
        </div>
        <van-popup
            v-model="isShow"
            position="bottom"
            style="border-radius: 15px 15px 0 0"
            @touchmove.prevent
        >
            <van-datetime-picker
                v-model="dateValue"
                @confirm="confirmDataClick"
                @cancel="cancelDataClick"
                swipe-duration="1"
                type="date"
            />
        </van-popup>
    </div>
</template>
<script>
export default {
    name: "ScreenData",
    components: {},
    props: {
        screenData: {
            type: Number,
            default: -1,
        },
        isStyleBlock: {
            type: Boolean,
            default: true,
        },
        //父组件可传可不传,默认不传
        isPropDate:{
            type: Boolean,
            default: false,
        },
        startDate: {
            type: Object,
            default: null,
        },
        endDate: {
            type: Object,
            default: null,
        },
        
    },
    data() {
        return {
            
            propFormatArr:[],
            getFormatStr:"",
            getFormatWeekDay:"",
            dataTitles: [
                this.$t("report.screenDay"),
                this.$t("report.screenWeek"),
                this.$t("report.screenMonth"),
                this.$t("report.screenDiy"),
            ],
            isShow: false,
            isSelectMin: false,
            dateValue: new Date(),
           
        };
    },
    methods: {
        screenDataClick(val) {
            this.screenData = val;
            if(val!=3){
                if(val==0){
                    this.propFormatArr[0] = this.moment();
                    this.propFormatArr[1] = this.propFormatArr[0];
                    this.getFormatStr = this.propFormatArr[0].format("DD/MM/YYYY");
                    this.getFormatWeekDay = this.getWeek(this.propFormatArr[0]);
                }else if(val==1){
                    let getFormatArrWeek = [];
                    this.propFormatArr[0] = this.moment(this.moment().week(this.moment().week()).startOf("week").valueOf());
                    this.propFormatArr[1] = this.moment(this.moment().week(this.moment().week()).endOf("week").valueOf());
                    getFormatArrWeek = [this.propFormatArr[0].format("DD/MM/YYYY"),this.propFormatArr[1].format("DD/MM/YYYY")];
                    this.getFormatStr = getFormatArrWeek.join('-');
                    this.getFormatWeekDay = this.weekIndexInMonth(this.propFormatArr[0])+this.$t('week');
                    
                }else if(val==2){
                    this.propFormatArr[0] = this.moment(this.moment().month(this.moment().month()).startOf("month").valueOf());
                    this.propFormatArr[1] = this.moment(this.moment().month(this.moment().month()).endOf("month").valueOf());
                    this.getFormatStr = this.moment().format("YYYY");    
                    this.getFormatWeekDay = this.moment().format("MMM");    
                }else{
                    return false;
                }
                this.startDate = this.propFormatArr[0];
                this.endDate = this.propFormatArr[1];
            }else{
                //默认有时间传过来，经营概览路由传的时间
                if(!this.isPropDate){
                    this.startDate = null;
                    this.endDate = null;
                }
            }
            this.$emit(
                "changeScreenClick",
                this.startDate,
                this.endDate,
                val,
                false
            );
            
        },
        changeScreenClick(index) {
            if(this.screenData!=3){
                if(this.screenData==0){
                    this.propFormatArr[0] = this.moment(this.propFormatArr[0].add(index,'day').toDate());
                    this.getFormatStr = this.propFormatArr[0].format("DD/MM/YYYY");
                    this.getFormatWeekDay = this.getWeek(this.propFormatArr[0]);
                    this.propFormatArr[1] = this.propFormatArr[0];
                }else if(this.screenData==1){
                    let getFormatArrWeek = [];
                    this.propFormatArr[0] = this.moment(this.propFormatArr[0].add(7*index,'day').toDate());
                    this.propFormatArr[1] = this.moment(this.propFormatArr[1].add(7*index,'day').toDate());
                    getFormatArrWeek = [this.propFormatArr[0].format("DD/MM/YYYY"),this.propFormatArr[1].format("DD/MM/YYYY")];
                    this.getFormatStr = getFormatArrWeek.join('-');
                    this.getFormatWeekDay = this.weekIndexInMonth(this.propFormatArr[0])+this.$t('week');

                }else if(this.screenData==2){
                    this.propFormatArr[0] = this.moment(this.propFormatArr[0].add(index,'month').toDate());
                    this.getFormatStr = this.propFormatArr[0].format("YYYY");    
                    this.getFormatWeekDay = this.propFormatArr[0].format("MMM"); 
                    this.propFormatArr[0] = this.moment(this.moment().month(this.propFormatArr[0].month()).startOf("month").valueOf());
                    this.propFormatArr[1] = this.moment(this.moment().month(this.propFormatArr[0].month()).endOf("month").valueOf()); 

                }else{
                    return false;
                }
                this.startDate = this.propFormatArr[0];
                this.endDate = this.propFormatArr[1];
                this.$emit(
                    "changeScreenClick",
                    this.startDate,
                    this.endDate,
                    this.screenData,
                    false
                );
            }else{
                this.startDate = null;
                this.endDate = null;
                return false;
            }
        },
        getWeek(date) {
            // data参数时间戳
            let week = this.moment(date).day();
            switch (week) {
                case 1:
                    return this.$t('zhou1');
                case 2:
                    return this.$t('zhou2');
                case 3:
                    return this.$t('zhou3');
                case 4:
                    return this.$t('zhou4');
                case 5:
                    return this.$t('zhou5');
                case 6:
                    return this.$t('zhou6');
                case 0:
                    return this.$t('zhou7');
            }
        },
        //获取今天是本月第几周
        weekIndexInMonth(date){
            let d = Number(date.format("DD"));
            let firstWeekDate;
            if (date.day() === 0) { // 判断1号是周日
                firstWeekDate = 6;
            } else { // 判断1号是周一至周六之间
                firstWeekDate =  date.day() - 1;
            }
            return Math.ceil((d + firstWeekDate)/7)
        },

        // 自定义时间筛选
        datedifference(sDate1, sDate2) {
            //sDate1和sDate2是2006-12-18格式
            var dateSpan, iDays;
            sDate1 = Date.parse(sDate1);
            sDate2 = Date.parse(sDate2);
            dateSpan = sDate2 - sDate1;
            dateSpan = Math.abs(dateSpan);
            iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
            return iDays;
        },
        showPopup(isStart) {
            this.isSelectMin = isStart;
            this.isShow = true;
        },
        confirmDataClick(value) {
            if (this.isSelectMin) {
                this.startDate = value;
            } else {
                this.endDate = value;
            }

            if (this.startDate != null && this.endDate != null) {
                let start = new Date(
                    this.startDate.toString().replace(/-/g, "/")
                );
                let end = new Date(this.endDate.toString().replace(/-/g, "/"));

                let cday = this.datedifference(start, end);
                if (start > end) {
                    this.toast.fail(this.$t('timeTips1'));
                } else if (cday > 31) {
                    this.toast.fail(this.$t('timeTips2'));
                } else {
                    this.$emit(
                        "changeScreenClick",
                        this.startDate,
                        this.endDate,
                        3,
                        false
                    );
                }
            }
            this.isShow = false;
        },
        cancelDataClick() {
            this.isShow = false;
        }, 
                
    },
    created() {
        this.screenDataClick(this.screenData)
    },
    watch: {},
};
</script>
<style scoped>
.Block{
    width: 96%;
    display: block;
}
.inlineBlock{
    display: inline-block;
}
.position{
    position: relative;
    top: -8px;
}
.inlineBlock.w60{
    width: 60%;
}
.inlineBlock.w40{
    width: 40%;

}
.dataWrap {
    width: 78%;
    height: 30px;
    line-height: 30px;
    background: #f3f3f5;
    color: #505050;
    font-size: 12px;
    text-align: center;
    border-radius: 4px;
}
.timeSelect {
    width: 46%;
    font-size: 12px;
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
.darkbrown{
    width: 8%;
    text-align: center;
    color: #505050;
    line-height: 30px;
}
</style>