<template>
    <div id="app" class="scroll-wrapper toolbar-fixed">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return{
                            
        }
    },
    computed: {
        language: {
            get() {
                return this.$store.getters.language;
            },
            set(val) {},
        },
    },

    created() {
        if (this.language.length <= 0) {
            this.$store.dispatch("setLanguage", "en_US");
        }
    },
    watch:{
        language: {
            handler(newVal, oldVal) {
                //刷新页面
                this.$router.go(0);
            },
        },
    }
};
</script>
<style>
@import "../../style/css/framework7.ios.css?111111";
@import "../../style/css/framework7.ios.colors.css?111111";
@import "../../style/css/font-awesome.css?111111";
@import "../../style/css/etms.css?111111";
/* 布局 */
*,
*:before,
*::after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -o-box-sizing: border-box;
    box-sizing: border-box;
}
.row{
  width: 100%;
}
/* 按钮 */
.btn .button {
  display: inline-block;
  width: 40%;
  height: 30px;
}
.reportBtn .button {
  width: auto !important;
  height: 24px;
  line-height: 24px;
  border-color: #d3d9e2;
  color: #303336;
  font-size: 10px;
}
.reportBtn .active {
  background: #fe813c;
  border-color: #fe813c;
  color: white !important;
}
.dateSelect{
  position: relative;
  width: 100%;
  overflow: hidden;
}
.dateSelect .active {
  background: #fe813c;
  border-color: #fe813c !important;
  color: white !important;
}
.downBtn {
  margin-top: 0 !important;
  padding: 0 13px !important;
  /* width: 82px !important; */
  float: right !important;
  color: #eb3c1c !important;
  font-size: 12px !important;
  border-color: #eb3c1c !important;
}
.downImg {
  width: 10px;
  position: relative;
  top: 3px;
}

.storeTable thead,
.storeTable thead tr,
.storeTable tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed; /**表格列的宽度由表格宽度决定，不由内容决定*/
    text-align: center;
}

.storeTable thead th,
.storeTable tbody td {
    width: 50px;
}

.van-picker__cancel, .van-picker__confirm {
    color: #fe813c !important;
   
}
.el-select-dropdown__item.selected {
   color: #fe813c !important;
}

.selectBtn .active {
  background: #fe813c;
  border-color: #fe813c !important;
  color: white !important;
}
.van-cell {
  padding: 0px !important;
}
.titleText {
  color: #232426;
  line-height: 36px;
  background: #fff9f5;
  border: 1px #e6eaef solid;
}
.listStyle {
  border: 1px #e6eaef solid;
  border-top: none;
  max-height: 450px;
  overflow-y: scroll;
}
.cellStyle {
  color: #303336;
  border-bottom: 1px #e6eaef solid;
  line-height: 35px;
}
.button.button-round{
  margin-top: 10px;
  padding: 0 12px;
  line-height: 25px;
  height: 26px;
  border-radius: 16px;
  display: inline-block;
  margin-right: 12px;
  border-color: #d3d9e2;
  color: #303336;
}
.data-table{
  overflow-x: hidden;
  padding: 25px 15px;
}
.dishTable .data-table{
  padding: 0px !important;
}
.data-table thead th:not(.sortable-active),
.data-table thead td:not(.sortable-active) {
    color: #232426 !important;
}
.data-table tbody td:before {
    background-color: #e6eaef !important;
}

.data-table thead th{
  text-overflow: unset !important;
  white-space: inherit !important;
}
.data-table th, .data-table td {
    padding: 10px;
}
.data-table th .txt{
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.el-popover--plain{
  padding: 8px 20px !important;
  min-width: 130px !important;
  max-width: 250px !important;
  font-size: 11px !important;
}
/* element pagination */
.page-pagination {
  padding: 0 0 30px 2px
}
.el-pagination .btn-next,.el-pagination .btn-prev,.el-pager .number,.el-pager .el-icon-more,.el-pager .el-icon-d-arrow-right,.el-pager .el-icon-d-arrow-left{
    border: 1px solid #dbe0e7 !important;
    font-size: 12px;
    width: 27px;
    height: 27px;
    min-width: 27px;
    line-height: 27px !important;
    text-align: center;
    margin: 0 5px;
    padding: 0 !important;
    font-weight: normal;
}
.el-pagination .el-pager li.active {
    width: 27px;
    height: 27px;
    text-align: center;
    min-width: 27px;
    line-height: 27px !important;
    padding: 0 !important;
    border-color: #fe813c !important;
    color: #fe813c;
    cursor: default;
}
.el-pager li:hover {
    color: #fe813c;
}
.el-pagination button:hover {
    color: #fe813c;
}
 .el-pager li.active+li {
    border-left: 1px solid #dbe0e7 !important;
}
.el-pagination .el-select .el-input {
    width: 60px !important;
    margin: 0 0 0 10px !important;
}
.el-pagination__sizes .el-input .el-input__inner{
  font-size: 12px;
  border: none;
  text-align: left;
  padding:0 !important;
  height: 27px;
  min-width: 27px;
  line-height: 27px !important;
}
.el-pagination .el-input__suffix {
    right: -5px !important;
} 
.el-select-dropdown .el-select-dropdown__item{
  font-size: 12px;
  padding: 0 10px;
  height: 28px;
  line-height: 28px;
}
.diancanS .el-input__inner{
    height: 32px !important;
    line-height: 32px !important;
}
.diancanS .el-input__icon{
  line-height: 32px !important;
}
/* 筛选更多 */
.dateSelect .moreScreen{
  position: absolute;
  top: 0;
  right: 15px;
}
.moreScreen{
  margin-top: 15px;
  width: 20px;
  height: 20px;
  overflow: hidden;
}
/* 输入框 */
input::-webkit-input-placeholder {
  color: #979797;
  padding-left: 5px;
  font-size: 12px;
}
input::-moz-input-placeholder {
  color: #979797;
  padding-left: 5px;
  font-size: 12px;
}
input::-ms-input-placeholder {
  color: #979797;
  padding-left: 5px;
  font-size: 12px;
}
/* select 下拉框 */
.el-select .el-input__inner {
  height: 30px;
  line-height: 30px;
}
.el-input__icon {
  line-height: 30px;
}
/* 暂无数据 */
.noData-warp{
  height: 50px;
  border-left: 1px solid #e6eaef;
  border-bottom: 1px solid #e6eaef;
  border-right: 1px solid #e6eaef;
  line-height: 50px;
  text-align: center;
  font-size: 12px;
  color: #909399;
}
.van-dialog{
    width: 70% !important;
}
.el-select-dropdown{
  z-index: 99999 !important;
  overflow: auto !important;

}

.storeTable .data-table thead th, .data-table thead td{
  white-space: none !important;
}
.el-checkbox__input.is-checked+.el-checkbox__label{
  color: #808080;
}
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background-color: #FE813C;
  border-color: #FE813C;
}
.el-checkbox__inner{
  width: 16px;
  height: 16px;
}
.el-checkbox__inner::after{
  left: 6px;
  top:2px
}
/* 切换tab */
.tabBtn .button-round {
    border-radius: 8px !important;
    height: 30px !important;
    line-height: 30px !important;
    padding: 0px 20px;
}
.tabBtn .button-round.active {
    background: #f46f24;
    border-color: #f46f24;
    color: white;
}
/* 抽屉筛选框公共样式 */
.reportSelect{
    padding: 25px 20px 60px;
    width: 100%;
    height:100%;
    overflow-x: hidden;
    overflow-y: scroll;
}
.reportSelect .orderIdInput{
    height: 32px;
    border-radius: 16px;
    border: none;
    box-shadow: 0 0 8px 0 rgba(222, 222, 222, 0.5);
    font-size: 12px;
    overflow:hidden;
}
.payment-box{
    position: relative;
    width:100%;
    height: auto;
    padding: 20px 0;
}
.reportSelect .payment-box .payment-oh{
    overflow: hidden;
}
.reportSelect .payment-box .payment-fl{
    float: left;
}
.reportSelect .payment-box .payment-list{
    clear: both;
    width:100%;
    height:auto;
    background: #F8F8F8;
    padding: 7px 5px; 
}
.reportSelect .payment-box .payment-list span{
    font-size: 11px;
    margin: 5px 5px 0 5px;
    padding: 0 8px;
    line-height: 25px;
    height: 26px;
    display: inline-block;
    border: 1px solid #d3d9e2;
    color: #303336;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    border-radius: 4px;
}
.reportSelect .payment-box .payment-list span.active{
    background: #fe813c;
    border-color: #fe813c;
    color: white;
}
.reportSelect .active {
    background: #FFEBDE;
    border-color: #FFEBDE;
    color: #F46F24;
}
.reportSelect .selectBtn {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #fff;
}
.reportSelect .selectBtn .button {
    border-radius: inherit;
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    padding: 0px;
    width: 100%;
    margin: 0px;
    display: block;
    border: none;
}
.reportSelect .unActive{
    background: #F3F3F5;
    border-color: #F3F3F5;
    color: #505050;
}
.reportSelect .color-orange {
    background: #fe813c !important;
}
.reportSelect .searchCss {
    float: left;
    width: 100%;
    height: 100%;
    border: 1px #D8D8D8 solid;
    margin-top: 12px;
    height: 30px;
    background: none;
    padding-left: 10px;
}
.reportSelect .imgClearText {
    margin-top: 8px;
    float: right;
    width: 15px;
    height: 15px;
    margin-right: 10px;
}
.reportSelect .seacherSelect {
    line-height: 32px;
    background: url("../../assets/images/time_down.png");
    background-repeat: no-repeat;
    background-size: 15px;
    background-position: 96%;
}
.reportSelect .button-round {
   padding: 0 16px;
}
.reportSelect .selectData .timeSelect{
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  background: #f6f6f6;
  border-radius: 5px;
  font-size: 12px;
  text-align: center;
}

</style>
