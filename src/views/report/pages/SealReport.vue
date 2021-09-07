  <template>
    <div class="main-layout reports">
        <div class="row">
            <div class="padding15 row">
                <div class="col-40">
                    <SelectStore :dep_ID="dep_ID"></SelectStore>
                </div>
                <div class="col-60">
                    <a class="button button-round downBtn" @click="downloadClick">
                        {{$t('report.downReport')}}
                        <img
                            src="../../../assets/images/downloadReport.png"
                            alt
                            class="downImg"
                        />
                    </a>
                </div>
            </div>
            <div class="col-100">
                <div class="tab-contents">
                    <div>
                        <div class="row dateSelect" style="padding:0 15px;">
                            <div class="col-100">
                                <a
                                    class="button button-round font12"
                                    @click="daySelectClick(0)"
                                    :class="{active:daySelect==0}"
                                >{{$t('report.today')}}</a>
                                <a
                                    class="button button-round font12"
                                    @click="daySelectClick(1)"
                                    :class="{active:daySelect==1}"
                                >{{$t('report.yesterday')}}</a>
                                <a
                                    class="button button-round font12"
                                    @click="daySelectClick(2)"
                                    :class="{active:daySelect==2}"
                                >{{$t('report.week')}}</a>
                                <a
                                    class="button button-round font12"
                                    @click="daySelectClick(3)"
                                    :class="{active:daySelect==3}"
                                >{{$t('report.month')}}</a>
                                <a
                                    class="button button-round font12"
                                    @click="daySelectClick(4)"
                                    :class="{active:daySelect==4}"
                                >{{$t('report.diy')}}</a>
                            </div>
                        </div>

                        <div v-show="daySelect==4" style="margin-left: 15px;margin-right: 15px;">
                            <SelectDate @confirmDataClick="confirmDataClick"></SelectDate>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row top10">
            <div class="col-100">
                <div class="data-table font10 border">
                    <table
                        v-loading="dataLoading"
                        style="border: 1px #E6EAEF solid;display:block;overflow:hidden;"
                        class="storeTable"
                    >
                        <thead>
                            <tr>
                                <th
                                    class="numeric-cell fontWeight"
                                    style="width:40%"
                                >{{$t('report.sealName')}}</th>
                                <SortImg
                                    style="width:30%"
                                    v-for="(item,index) in titleData"
                                    :title="item.title"
                                    :sort="item.sort"
                                    :index="index"
                                    :key="index"
                                    @sortChangeClick="sortChangeClick"
                                ></SortImg>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in tableData" :key="index">
                                <td class="numeric-cell" style="width:40%;word-wrap: break-word !important;">{{item.dish_name}}</td>
                                <td class="numeric-cell" style="width:30%">{{item.dish_num}}</td>
                                <td
                                    class="numeric-cell"
                                    style="width:30%"
                                >{{item.dish_count | price}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- 暂无数据 -->
                    <div class="noData-warp" v-if="tableData==null||tableData.length==0">
                        <span>{{$t('noData')}}</span>
                    </div>
                </div>
            </div>
        </div>
        <van-popup v-model="propShow" style="border-radius:15px;width:80%;">
            <EmailPop
                :propShow="propShow"
                title="日销售报表"
                :file="file"
                @closeClick="closeClick"
                @sendEmailClick="sendEmailClick"
            ></EmailPop>
        </van-popup>
    </div>
</template>

<script>
export default {
    name: "storeContrast",
    components: {
        SelectStore: (resolve) =>
            require(["../components/SelectStore"], resolve),
        SelectDate: (resolve) => require(["../components/SelectDate"], resolve),
        EmailPop: (resolve) => require(["../components/EmailPop"], resolve),
        SortImg: (resolve) => require(["../components/SortImg"], resolve),
    },
    computed: {
        currentStore() {
            return this.$store.getters.currentStore;
        },
    },
    data() {
        return {
            propShow: false,
            file: null,
            dep_ID: -1,
            daySelect: 0,
            yingyeSelect: 0,
            orderType: 0, //按价格还是数量 0.价格 1.数量
            orderClass: 0, //降序还是升序
            requestData: {
                dep_id: "-1", //门店id
                dish_classify: 0, //菜品二级分类,可以不传，默认为全部 ,
                end_time: 0, //统计结束时间，格式yyyyMMdd 今日为4 昨日为1，本周为2，本月为3，自定义就是yyyyMMdd格式 ,
                start_time: 0, //统计开始时间,格式yyyyMMdd 今日为4 昨日为1，本周为2，本月为3，自定义就是yyyyMMdd格式 ,
                date: "",
            },
            paycount: {},
            data: {},
            title: [],
            num: [],
            count: [],
            titleData: [
                {
                    sort: 0,
                    title: this.$t("report.sealSales"),
                    key: "dish_num",
                },
                {
                    sort: 0,
                    title: this.$t("report.sealPrice"),
                    key: "dish_count",
                },
            ],
            data: null,
            defaultData: null,
            tableData: [], //当前页要显示的数据
            
        };
    },
    methods: {
        downloadClick() {
            this.propShow = true;
        },
        closeClick(val) {
            this.propShow = val;
        },
        setmeal(email, isdefault) {
            let that = this;
            this.requestData.dep_id = this.currentStore.dep_ID; //门店id
            this.requestData.mail = email;
            this.requestData.isdefault = isdefault;
            this.request.setmeal(this.requestData, function (res) {
                if (res.code == "1") {
                    that.toast.success(that.$t("sendSuccess"));
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        sendEmailClick(email, isdefault) {
            this.setmeal(email, isdefault);
        },
        daySelectClick(val) {
            this.daySelect = val;
            if (val == 4) {
                return;
            }
            this.requestData.start_time = val;
            this.requestData.end_time = val;
            this.setmealReport();
        },
        confirmDataClick(start, end) {
            this.requestData.start_time = this.moment(start).format("YYYYMMDD");
            this.requestData.end_time = this.moment(end).format("YYYYMMDD");
            this.setmealReport();
        },

        
       
        setmealReport() {
            let that = this;
            this.requestData.dep_id = this.currentStore.dep_ID; //门店id
            this.request.setmealReport(this.requestData, function (res) {
                var linshiVal;
                if (res.code == "1") {
                    that.pageCount = [];
                    that.tableData = [];
                    that.data = res.data.list;
                   
                    for (var i = 0; i < that.data.length; i++) {
                        if (i > 9) {
                            break;
                        }
                        that.tableData.push(that.data[i]);
                    }
                    that.defaultData = that.stringutils.deepClone(
                        that.data.list
                    );
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },

        // 排序
        sortChangeClick(sort, index) {
            this.titleData[index].sort = sort;
            for (let i in this.titleData) {
                if (i != index) {
                    this.titleData[i].sort = 0;
                }
            }

            if (this.titleData[index].sort == 0) {
                this.tableData = this.stringutils.deepClone(this.defaultData);
            } else {
                this.tableData.sort(
                    this.stringutils.sortBy(
                        this.titleData[index].key,
                        this.titleData[index].sort
                    )
                );
            }
        },
        valueChange(val) {
            this.requestData.dish_classify = val;
            this.setmealReport();
        },
    },
    mounted() {},
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
        // this.$Local(this.$route.query.lang);
        this.$store.dispatch("setToken", this.$route.query.token);

        this.dep_ID = this.$route.query.dep_ID;
        this.currentStore.dep_ID = this.$route.query.dep_ID;
    },
    watch: {
        currentStore: {
            handler(newVal, oldVal) {
                if (newVal != undefined && newVal != null) {
                    this.setmealReport();
                }
            },
        },
    },
};
</script>
<style scoped>
</style>