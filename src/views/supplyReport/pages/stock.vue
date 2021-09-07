<template>
    <review-container>
        <!-- <view-header slot="header">
            <div slot="head-label" class="row">
                <div class="col-60"></div>
                <div class="header-download col-40" @click="downDialog = true">{{$t('supplyReport.download')}}</div>
            </div>
        </view-header>-->
        <view-content slot="content">
            <div slot="cont-label" class="row">
                <div class="content-span col-60">
                    <span>{{$t('supplyReport.total')}}</span>
                    <span>{{$t('supplyReport.kucunCount')}}：{{sumCount|count}}</span>
                    <span>{{$t('supplyReport.kucunAmount')}}：{{sumAmount|price}}</span>
                </div>
                <div class="col-40" style="text-align:right">
                    <div
                        class="header-download"
                        @click="downloadCLick"
                        style="display:inline-block;margin-top:0px;margin-right:15px"
                    >{{$t('supplyReport.download')}}</div>
                    <div
                        class="content-filtrate"
                        @click="selectBtn"
                        style="display:inline;font-size:14px;font-weight:bold"
                    >{{$t('supplyReport.select')}}</div>
                </div>
            </div>
            <div slot="table" class="data-table">
                <table v-loading="dataLoading">
                    <thead>
                        <tr>
                            <th v-for="(item,index) in tableTitleData" :key="index">{{item}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in filltableData" :key="index">
                            <td>{{item.source_name|text}}</td>
                            <td>{{item.storehouse_name|text}}</td>
                            <td>{{item.unit_name|text}}</td>
                            <td>{{item.type_name|text}}</td>
                            <td>{{item.source_count|count}}</td>
                            <td>{{item.source_amount|price}}</td>
                        </tr>
                        <tr v-if="filltableData==null||filltableData.length==0" > 
                            <td colspan="6"><span  style="color:#909399">{{$t('noData')}}</span></td>
                        </tr>
                    </tbody>
                </table>
                <div class="col-100 center">
                    <el-pagination
                        v-if="currentPage.total!==0"
                        class="page-pagination center"
                        style="padding:20px 0 20px 2px"
                        layout="prev, pager, next,sizes"
                        :total="currentPage.total"
                        :pager-count="3"
                        :page-size="currentPage.size"
                        :current-page="currentPage.page"
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange"
                        :page-sizes="[10,20,30,50]"
                    ></el-pagination>
                </div>
            </div>
        </view-content>
        <view-model slot="model">
            <!-- 筛选抽屉 -->
            <el-drawer
                solt="model"
                :size="drawer_width"
                :visible.sync="drawer"
                :before-close="handleClose"
                :with-header="false"
            >
                <filtrate-view>
                    <filtrate-content slot="filtrate-content">
                        <filtrate-select
                            v-model="filtrateselectData"
                            :options="myoptions"
                            :label="$t('supplyReport.cangku')+'：'"
                        ></filtrate-select>
                        <filtrate-input
                            v-model="filtrateinputData"
                            :label="$t('supplyReport.wuliao')+'：'"
                        ></filtrate-input>
                        <filtrate-disable
                            v-model="filtratedisableData"
                            :label="$t('supplyReport.type')+'：'"
                            @click.native="selectDialog=true"
                        ></filtrate-disable>
                    </filtrate-content>
                    <filtrate-footer slot="filtrate-footer">
                        <div slot="reset" @click="resetClick">{{$t('supplyReport.replace')}}</div>
                        <div slot="sure" @click="sureClick">{{$t('supplyReport.confirm')}}</div>
                    </filtrate-footer>
                </filtrate-view>
            </el-drawer>
            <!-- 下载报表弹出层 -->
             <div>
                <van-popup v-model="propShow" style="border-radius: 15px; width: 80%" >
                    <EmailPop
                        :propShow="propShow"
                        title="日销售报表"
                        :file="file"
                        @closeClick="closeClick"
                        @sendEmailClick="sendEmailClick"
                    ></EmailPop>
                </van-popup>
            </div>
            <!-- 类别选择弹出层 -->
            <el-dialog
                solt="model"
                class="selectTypeDialog"
                :visible.sync="selectDialog"
                :width="selectDialog_width"
                :fullscreen="true"
                :close-on-click-modal="false"
            >
                <selectType-view>
                    <selectType-header slot="selectType-header">
                        <div slot="title">{{$t('supplyReport.selectAfter')}}</div>
                    </selectType-header>
                    <selectType-content slot="selectType-content">
                        <el-tree
                            class="selectRadio"
                            :data="treeData"
                            ref="tree"
                            :props="props"
                            @check-change="orgCheckChange"
                            show-checkbox
                            :check-strictly="true"
                            node-key="id"
                        ></el-tree>
                    </selectType-content>
                    <selectType-footer slot="selectType-footer">
                        <div
                            slot="selectSure"
                            @click="selectSureClick"
                        >{{$t('supplyReport.confirm')}}</div>
                    </selectType-footer>
                </selectType-view>
            </el-dialog>
        </view-model>
    </review-container>
</template>

<script>
export default {
    name: "stock",
    components: {
        reviewContainer: (resolve) =>
            require([
                "../../components/reviewContainer/reviewContainer",
            ], resolve),
        viewContent: (resolve) =>
            require([
                "../../components/reviewContainer/pageView/viewContent",
            ], resolve),
        viewModel: (resolve) =>
            require([
                "../../components/reviewContainer/pageView/viewModel",
            ], resolve),
        filtrateView: (resolve) =>
            require([
                "../../components/filtrateDrawer/filtrateView/filtrateView",
            ], resolve),
        filtrateContent: (resolve) =>
            require([
                "../../components/filtrateDrawer/filtrateView/filtratePage/filtrateContent",
            ], resolve),
        filtrateFooter: (resolve) =>
            require([
                "../../components/filtrateDrawer/filtrateView/filtratePage/filtrateFooter",
            ], resolve),
        filtrateSelect: (resolve) =>
            require([
                "../../components/filtrateDrawer/filtrateComponents/filtrateSelect",
            ], resolve),
        filtrateInput: (resolve) =>
            require([
                "../../components/filtrateDrawer/filtrateComponents/filtrateInput",
            ], resolve),
        filtrateDisable: (resolve) =>
            require([
                "../../components/filtrateDrawer/filtrateComponents/filtrateDisable",
            ], resolve),
        emailView: (resolve) =>
            require(["../../components/emailPop/emailView/emailView"], resolve),
        emailContent: (resolve) =>
            require([
                "../../components/emailPop/emailView/emailPage/emailContent",
            ], resolve),
        emailFooter: (resolve) =>
            require([
                "../../components/emailPop/emailView/emailPage/emailFooter",
            ], resolve),
        emailCheckbox: (resolve) =>
            require([
                "../../components/emailPop/emailComponents/emailCheckbox",
            ], resolve),
        emailInput: (resolve) =>
            require([
                "../../components/emailPop/emailComponents/emailInput",
            ], resolve),
        selectTypeView: (resolve) =>
            require([
                "../../components/selectTypePop/selectTypeView/selectTypeView",
            ], resolve),
        selectTypeHeader: (resolve) =>
            require([
                "../../components/selectTypePop/selectTypeView/selectTypePage/selectTypeHeader",
            ], resolve),
        selectTypeContent: (resolve) =>
            require([
                "../../components/selectTypePop/selectTypeView/selectTypePage/selectTypeContent",
            ], resolve),
        selectTypeFooter: (resolve) =>
            require([
                "../../components/selectTypePop/selectTypeView/selectTypePage/selectTypeFooter",
            ], resolve),
            EmailPop: (resolve) => require(["../components/EmailPop"], resolve),
    },
    computed: {
        currentStore() {
            return this.$store.getters.currentStore;
        },
    },
    data() {
        return {
            //抽屉筛选
            filtrateselectData: null,
            filtrateinputData: "",
            filtratedisableData: "",
            disableDataID: "",
            ischecked: "",
            myoptions: [],
            drawer: false,
            drawer_width: "420",
            //弹出窗下载报表
            emailcheckboxData: false,
            emailinputData: "",
            downDialog: false,
            downDialog_width: "80%",
            //合计
            sumAmount: 0,
            sumCount: 0,
            // table
            tableTitleData: [
                this.$t("supplyReport.souceName"),
                this.$t("supplyReport.cangku"),
                this.$t("supplyReport.unit"),
                this.$t("supplyReport.type"),
                this.$t("supplyReport.kucunCount"),
                this.$t("supplyReport.kucunAmount"),
            ],
            requestData: {
                token: "",
                page_num: 0,
                page_size: 10,
                dep_id: "",
                store_id: "",
                source_name: "",
                source_type_id: "",
                report_type: "0",
            },
            filltableData: [], //填充表格内数据
            //分页
            dataLoading: false, //数据懒加载
            currentPage: {
                total: 0,
                page: 1,
                size: 10,
            },
            //类别弹出层
            selectDialog: false,
            selectDialog_width: "100%",
            //tree 树形选择
            treeData: [],
            props: {
                label: "type_name",
                children: "sonlist",
            },
            selectOrg: {
                orgsid: [],
            },
            propShow:false
        };
    },
    methods: {
         downloadCLick() {
            this.propShow = true;
        },
        closeClick(val) {
            this.propShow = val;
        },
        sendEmailClick(email, isdefault) {
            this.download(email, isdefault);
        },
        handleClose(down) {
            this.move();
            down();
        },
        /***禁止滑动***/
        stop() {
            document.documentElement.style.position = "fixed";
            document.body.style.overflow = "hidden"; //隐藏滚动条
        },
        /***取消滑动限制***/
        move() {
            document.documentElement.style.position = "static";
            document.body.style.overflow = ""; //出现滚动条
        },
        selectBtn() {
            this.drawer = true;
            this.stop();
            //点击筛选 第一次拉接口，第二次使用缓存
            let getStorehouseList = sessionStorage.getItem('storehouseList');
            let getTreeData = sessionStorage.getItem('treeData');
            if (getStorehouseList&&getTreeData) {
                this.myoptions = JSON.parse(getStorehouseList);
                this.treeData = JSON.parse(getTreeData);
            }else{
                setTimeout(()=>{
                    this.storehouseList(); 
                    this.getypeinfotreelist();
                },400)
                
            }
           
        },
        /*
          ---接口数据处理---
         */

        //库存报表格
        getStockReport() {
            let that = this;
            this.dataLoading = true;
            this.requestData.email = "";
            let getpageSizes = Number(sessionStorage.getItem("sizes"));
            //判断每页显示条数有无缓存
            if (getpageSizes) {
                this.currentPage.size = getpageSizes;
            }
            this.requestData.dep_id = this.currentStore.dep_ID; //传入dep_id
            this.requestData.token = this.$route.query.token; //传入tocken
            this.requestData.page_num = this.currentPage.page - 1;//传入当前页
            this.requestData.page_size = this.currentPage.size; //传入每页展示数据条数
            this.requestData.source_name = this.filtrateinputData; //传入物料名称
            this.requestData.store_id = this.filtrateselectData; //传入仓库id
            this.requestData.source_type_id = this.disableDataID; //传入物料类型id
            this.request.getStockReport(this.requestData, function (res) {
                if (res.code == "1") {
                    that.dataLoading = false;
                    const req_data = res.data;
                    if (req_data == null) {
                        return false;
                    }
                    // console.log(req_data);
                    that.filltableData = req_data.list; //填充表格内数据
                    that.currentPage.total = res.data.total;
                    // console.log(that.filltableData);
                    
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        //分页初始化
        initPagination() {
            this.currentPage.page = 1;
        },
        // 分页
        handleCurrentChange(page) {
            this.currentPage.page = page;
            this.getStockReport();
        },
        handleSizeChange(size) {
            //当分页不在第一页时，切换每页显示条数 使得page返回参数为1
            this.currentPage.page = 1;
            sessionStorage.setItem("sizes", size);
            this.currentPage.size = size;
            this.getStockReport();
        },

        //库存报表合计获取
        getStockReportSum() {
            let that = this;
            let SumData = {
                token: "",
                dep_id: "",
            };
            SumData.dep_id = this.currentStore.dep_ID; //传入dep_id
            SumData.token = this.$route.query.token; //传入tocken
            this.request.getStockReportSum(SumData, function (res) {
                if (res.code == "1") {
                    let req_data = res.data;
                    that.sumAmount = req_data.sum_amount;
                    that.sumCount = req_data.sum_count;
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        //获取筛选框 仓库下拉列表
        storehouseList() {
            let that = this;
            let ListData = {
                token: "",
                dep_id: "",
            };
            ListData.dep_id = this.currentStore.dep_ID; //传入dep_id
            ListData.token = this.$route.query.token; //传入tocken
            this.request.storehouseList(ListData, function (res) {
                if (res.code == "1") {
                    let req_data = res.data;
                    that.myoptions = [];
                    let labelArray = [];
                    let valueArray = [];

                    req_data.map((vaule, index, req_data) => {
                        labelArray.push(vaule.storehouse_name);
                        valueArray.push(vaule.id);
                        return false;
                    });
                    for (let i in labelArray) {
                        let json = {};
                        for (let j in valueArray) {
                            if (i == j) {
                                //label value 封装好的一定要有
                                json.label = labelArray[i];
                                json.value = valueArray[j];
                                that.myoptions.push(json);
                            }
                        }
                    }
                    //存入到缓存中
                    sessionStorage.setItem('storehouseList',JSON.stringify(that.myoptions));
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        //设置默认邮箱
        emailstorages() {
            this.emailinputData = localStorage.getItem("email");
        },
        //下载报表
        download(email, isdefault) {
            let that = this;
            this.requestData.report_type = "0";
            this.requestData.email = email;
            this.requestData.isdefault = isdefault;
            this.request.download(this.requestData, function (res) {
                if (res.code == "1") {
                    setTimeout(()=>{
                        that.toast.success(res.msg);
                    },500)
                    return false;
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        //tree 树形选择
        getypeinfotreelist() {
            let that = this;
            let treelistData = {
                token: "",
                dep_id: "",
            };
            treelistData.dep_id = this.currentStore.dep_ID; //传入dep_id
            treelistData.token = this.$route.query.token; //传入tocken
            this.request.getypeinfotreelist(treelistData, function (res) {
                if (res.code == "1") {
                    let req_data = res.data;
                    that.treeData = req_data;
                    //存入到缓存中
                    sessionStorage.setItem('treeData',JSON.stringify(that.treeData));
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },

        /*
          ---下载报表 弹出窗---
         */
        cancelClick() {
            this.downDialog = false;
        },
        sendClick() {
            if (this.emailinputData === "") {
                this.emailcheckboxData = false;
                return;
            }
            if (this.emailcheckboxData === true) {
                localStorage.setItem("email", this.emailinputData);
                localStorage.setItem("ischecked", this.emailcheckboxData);
            } else {
                localStorage.removeItem("email");
                localStorage.removeItem("ischecked");
            }

            this.download();
            this.downDialog = false;
        },

        /*
          ---表格筛选 抽屉---
         */

        drawerClear() {
            this.filtrateselectData = null;
            this.filtrateinputData = "";
            this.filtratedisableData = "";
        },
        //重置
        resetClick() {
            this.drawerClear();
        },
        //确定提交
        sureClick() {
            let fselData = this.filtrateselectData;
            let finpData = this.filtrateinputData;
            let fdisData = this.filtratedisableData;

            //如果为null 点击确定return 掉
            if (fselData === null && finpData === "" && fdisData === "") {
                this.toast.fail(this.$t('supplyReport.PleaseSelect'));
                return false;
            }
            this.initPagination();
            this.getStockReport();
            this.move();
            // this.drawerClear();
            this.drawer = false;
        },
        /*
          ---类别 弹出层---
         */

        //确定提交
        selectSureClick() {
            if (this.treeData.length === 0) {
                this.toast.fail(this.$t('supplyReport.NoData'));
            } else {
                if (this.ischecked === true) {
                    this.toast.success(this.$t('supplyReport.Selected'));
                    this.selectDialog = false;
                } else {
                    this.toast.fail(this.$t('supplyReport.PleaseSelect'));
                }
            }
        },
        //tree 树形选择
        // check-change
        // 节点选中状态发生变化时的回调
        // 共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点
        orgCheckChange(data, checked, indeterminate) {
            let that = this;

            // 获取当前选择的id在数组中的索引
            const indexs = that.selectOrg.orgsid.indexOf(data.id);
            // 如果不存在数组中，并且数组中已经有一个id并且checked为true的时候，代表不能再次选择。
            if (indexs < 0 && that.selectOrg.orgsid.length === 1 && checked) {
                that.toast.fail(that.$t('supplyReport.OnlyOne'));
                // 设置已选择的节点为false 很重要
                that.$refs.tree.setChecked(data, false);
            } else if (that.selectOrg.orgsid.length === 0 && checked) {
                // 发现数组为空 并且是已选择
                // 防止数组有值，首先清空，再push
                that.selectOrg.orgsid = [];
                that.selectOrg.orgsid.push(data.id);
            } else if (
                indexs >= 0 &&
                that.selectOrg.orgsid.length === 1 &&
                !checked
            ) {
                // 再次直接进行赋值为空操作
                that.selectOrg.orgsid = [];
            }
            //通过id传值
            let getselectData = that.selectOrg.orgsid.toString(); //数组对象转字符串
            that.disableDataID = getselectData;
            that.filtratedisableData = data.type_name;
            //判断是否选择状态
            that.ischecked = checked;
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
        this.$store.dispatch("setToken", this.$route.query.token);
        this.dep_ID = this.$route.query.dep_ID;
        this.currentStore.dep_ID = this.$route.query.dep_ID;
        if (localStorage.getItem("ischecked")) {
            this.emailcheckboxData = true;
            this.emailstorages();
        }
        

        this.getStockReport();
        // this.storehouseList();
        this.getStockReportSum();
        // this.getypeinfotreelist();
    },
    watch: {
        currentStore: {
            handler(newVal, oldVal) {
                if (newVal != undefined && newVal != null) {
                }
            },
        },
    },
};
</script>
<style scoped>
</style>
