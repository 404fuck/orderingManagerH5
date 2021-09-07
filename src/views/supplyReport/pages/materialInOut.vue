<template>
    <review-container>
        <view-content slot="content">
            <div slot="cont-label" class="row">
                <div class="content-span col-40"></div>
                <div class="col-60" style="text-align:right">
                    <div
                        class="header-download"
                        @click="downloadCLick"
                        style="display:inline-block;margin-right:15px"
                    >{{$t('supplyReport.download')}}</div>
                    <div
                        class="content-filtrate"
                        @click="selectBtn"
                        style="display:inline;font-size:14px;font-weight:bold"
                    >{{$t('supplyReport.select')}}</div>
                </div>
                <div class="col-100 selectSpan content-span">
                    <van-checkbox
                        v-model="checked"
                        shape="square"
                        @change="checkChange"
                    >{{$t('report.zhanshiTips')}}</van-checkbox>
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
                            <td>{{item.rec_id|text}}</td>
                            <td>{{item.fill_time|DMY}}</td>
                            <td>{{myoptions1[item.io_type].label}}</td>
                            <td>{{myoptions2[item.bill_type-1].label}}</td>
                            <td>{{item.source_name|text}}</td>
                            <td>{{item.storehouse_name|text}}</td>
                            <td>{{item.unit_name|text}}</td>
                            <td>{{item.type_name|text}}</td>

                            <td>{{item.source_count|count}}</td>
                            <td>{{item.source_amount|price}}</td>
                            <td>{{item.user_name|text}}</td>
                        </tr>
                        <tr v-if="filltableData==null||filltableData.length==0">
                            <td colspan="11">
                                <span>{{$t('noData')}}</span>
                            </td>
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
                            v-model="filtrateselectData1"
                            :options="myoptions1"
                            :label="$t('supplyReport.churuType')+'：'"
                        ></filtrate-select>
                        <filtrate-select
                            v-model="filtrateselectData2"
                            :options="myoptions2"
                            :label="$t('supplyReport.churuLeixing')+'：'"
                        ></filtrate-select>
                        <filtrate-select
                            v-model="filtrateselectData3"
                            :options="myoptions3"
                            :label="$t('supplyReport.cangku')+'：'"
                        ></filtrate-select>
                        <filtrate-select
                            v-model="filtrateselectData4"
                            :options="myoptions4"
                            :label="$t('supplyReport.gongyingshang')+'：'"
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
                        <filtrate-date-range
                            v-model="filtraterangeDate"
                            :label="$t('supplyReport.pandianDate')+'：'"
                            format="yyyy-MM-dd"
                        ></filtrate-date-range>
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
    name: "materialInOut",
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
        filtrateDateRange: (resolve) =>
            require([
                "../../components/filtrateDrawer/filtrateComponents/filtrateDateRange",
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
            checked: false,
            //抽屉筛选
            filtrateselectData1: null,
            filtrateselectData2: null,
            filtrateselectData3: null,
            filtrateselectData4: null,
            filtrateinputData: "",
            filtratedisableData: "",
            disableDataID: "",
            ischecked: "",
            filtraterangeDate: [],
            beginDate: "",
            endDate: "",
            testValue1: null,
            myoptions1: [
                //出入库类别
                { label: this.$t("supplyReport.ruku"), value: "0" },
                { label: this.$t("supplyReport.chuku"), value: "1" },
                { label: this.$t("all"), value: "" },
            ],

            myoptions2: [], //出入库类型
            myoptions3: [], //仓库
            myoptions4: [], //供应商
            drawer: false,
            drawer_width: "420",
            //弹出窗下载报表
            emailcheckboxData: false,
            emailinputData: "",
            downDialog: false,
            downDialog_width: "80%",
            // table
            tableTitleData: [
                this.$t("supplyReport.danjuhao"),
                this.$t("supplyReport.time"),
                this.$t("supplyReport.churuType"),
                this.$t("supplyReport.churuLeixing"),
                this.$t("supplyReport.souceName"),
                this.$t("supplyReport.cangku"),
                this.$t("supplyReport.unit"),
                this.$t("supplyReport.type"),
                this.$t("supplyReport.count"),
                this.$t("supplyReport.amount"),
                this.$t("supplyReport.caozuoren"),
            ],
            requestData: {
                token: "",
                page_num: 0,
                page_size: 10,
                dep_id: "",
                store_type: "",
                bill_type: "",
                store_id: "",
                supplier_id: "",
                source_name: "",
                type_ids: "",
                begin_date: "",
                end_date: "",
                email: "",
                report_type: "1",
                less_3: "",
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
            flag: "0", //出入库类型字典
            dicType: "",
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
        // 展示自动领料出库(仅3天内数据)
        checkChange() {
            if (this.checked) {
                this.requestData.less_3 = "1";
            } else {
                this.requestData.less_3 = "";
            }
            this.initPagination();
            this.getInOutStoreDetail();
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
            let getStorehouseList = sessionStorage.getItem("storehouseList");
            let getTreeData = sessionStorage.getItem("treeData");
            let getSupplierList = sessionStorage.getItem("supplierList");
            if (getStorehouseList && getTreeData && getSupplierList) {
                this.myoptions3 = JSON.parse(getStorehouseList);
                this.treeData = JSON.parse(getTreeData);
                this.myoptions4 = JSON.parse(getSupplierList);
            } else {
                setTimeout(() => {
                    this.storehouseList();
                    this.supplierList();
                    this.getypeinfotreelist();
                }, 400);
            }
        },
        /*
          ---接口数据处理---
         */
        //库存报表格
        getInOutStoreDetail() {
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
            this.requestData.page_num = this.currentPage.page - 1; //传入当前页
            this.requestData.page_size = this.currentPage.size; //传入每页展示数据条数
            this.requestData.source_name = this.filtrateinputData; //传入物料名称
            this.requestData.store_type = this.filtrateselectData1; //传入出入库类别
            this.requestData.bill_type = this.filtrateselectData2; //传入出入库类型
            this.requestData.store_id = this.filtrateselectData3; //传入仓库id
            this.requestData.supplier_id = this.filtrateselectData4; //传入供应商id
            this.requestData.type_ids = this.disableDataID; //传入物料类型id
            this.requestData.begin_date = this.beginDate; //传入开始时间
            this.requestData.end_date = this.endDate; //传入结束时间
            this.request.getInOutStoreDetail(this.requestData, function (res) {
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
            this.getInOutStoreDetail();
        },
        handleSizeChange(size) {
            //当分页不在第一页时，切换每页显示条数 使得page返回参数为1
            this.currentPage.page = 1;
            sessionStorage.setItem("sizes", size);
            this.currentPage.size = size;

            this.getInOutStoreDetail();
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
                    that.myoptions3 = [];
                    let labelArray = [];
                    let valueArray = [];

                    req_data.map((vaule, index, req_data) => {
                        labelArray.push(vaule.storehouse_name);
                        valueArray.push(vaule.id);
                        return;
                    });
                    for (let i in labelArray) {
                        let json = {};
                        for (let j in valueArray) {
                            if (i == j) {
                                //label value 封装好的一定要有
                                json.label = labelArray[i];
                                json.value = valueArray[j];
                                that.myoptions3.push(json);
                            }
                        }
                    }
                    //存入到缓存中
                    sessionStorage.setItem(
                        "storehouseList",
                        JSON.stringify(that.myoptions3)
                    );
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        //获取筛选框 供应商下拉列表
        supplierList() {
            let that = this;
            let ListData = {
                token: "",
                dep_id: "",
                status: "",
            };
            ListData.dep_id = this.currentStore.dep_ID; //传入dep_id
            ListData.token = this.$route.query.token; //传入tocken
            this.request.supplierList(ListData, function (res) {
                if (res.code == "1") {
                    let req_data = res.data;
                    that.myoptions4 = [];
                    let labelArray = [];
                    let valueArray = [];

                    req_data.map((vaule, index, req_data) => {
                        labelArray.push(vaule.supplier_brief_name);
                        valueArray.push(vaule.id);
                        return;
                    });
                    for (let i in labelArray) {
                        let json = {};
                        for (let j in valueArray) {
                            if (i == j) {
                                //label value 封装好的一定要有
                                json.label = labelArray[i];
                                json.value = valueArray[j];
                                that.myoptions4.push(json);
                            }
                        }
                    }
                    //存入到缓存中
                    sessionStorage.setItem(
                        "supplierList",
                        JSON.stringify(that.myoptions4)
                    );
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
            this.requestData.report_type = "1";
            this.requestData.email = email;
            this.requestData.isdefault = isdefault;
            this.request.download(this.requestData, function (res) {
                if (res.code == "1") {
                    setTimeout(() => {
                        that.toast.success(res.msg);
                    }, 500);
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
                    sessionStorage.setItem(
                        "treeData",
                        JSON.stringify(that.treeData)
                    );
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
            this.filtrateselectData1 = null;
            this.filtrateselectData2 = null;
            this.filtrateselectData3 = null;
            this.filtrateselectData4 = null;
            this.filtrateinputData = "";
            this.filtratedisableData = "";
            this.filtraterangeDate = [];
        },
        //重置
        resetClick() {
            this.drawerClear();
        },
        //确定提交
        sureClick() {
            let fselData1 = this.filtrateselectData1;
            let fselData2 = this.filtrateselectData2;
            let fselData3 = this.filtrateselectData3;
            let fselData4 = this.filtrateselectData4;
            let finpData = this.filtrateinputData;
            let fdisData = this.filtratedisableData;
            let frangData = this.filtraterangeDate;
            this.beginDate = frangData[0];
            this.endDate = frangData[1];
            //如果为null 点击确定return 掉
            if (
                fselData1 === null &&
                fselData2 === null &&
                fselData3 === null &&
                fselData4 === null &&
                finpData === "" &&
                fdisData === "" &&
                frangData.length === 0
            ) {
                this.toast.fail(this.$t("supplyReport.PleaseSelect"));
                return false;
            }
            this.initPagination();
            this.getInOutStoreDetail();
            this.move();
            this.drawer = false;
        },
        /*
          ---类别 弹出层---
         */

        //确定提交
        selectSureClick() {
            if (this.treeData.length === 0) {
                this.toast.fail(this.$t("supplyReport.NoData"));
                return;
            } else {
                if (this.ischecked === true) {
                    this.toast.success(this.$t("supplyReport.Selected"));
                    this.selectDialog = false;
                } else {
                    this.toast.fail(this.$t("supplyReport.PleaseSelect"));
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
                that.toast.fail(that.$t("supplyReport.OnlyOne"));
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

        //根据出入库类型字典获取
        getTypeDicInfo() {
            let that = this;
            this.request.getTypeDicInfo({}, function (res) {
                if (res.code == "1") {
                    that.dicType = res.data;
                    that.myoptions2 = [];
                    let elemArray;
                    for (let i in that.dicType) {
                        if (that.$i18n.locale == "zh_CN") {
                            elemArray = {
                                label: that.dicType[i].dicName_cn,
                                value: that.dicType[i].id,
                            };
                        } else if (that.$i18n.locale == "en_US") {
                            elemArray = {
                                label: that.dicType[i].dicName_en,
                                value: that.dicType[i].id,
                            };
                        }
                        that.myoptions2.push(elemArray);
                    }
                } else {
                    that.dicType = null;
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
        this.$store.dispatch("setToken", this.$route.query.token);
        this.dep_ID = this.$route.query.dep_ID;
        this.currentStore.dep_ID = this.$route.query.dep_ID;
        if (localStorage.getItem("ischecked")) {
            this.emailcheckboxData = true;
            this.emailstorages();
        }

        // this.storehouseList();
        // this.supplierList();
        // this.getypeinfotreelist();
        this.getInOutStoreDetail();
        this.getTypeDicInfo();
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
.el-drawer__body{
    overflow-y: auto;
}
</style>
