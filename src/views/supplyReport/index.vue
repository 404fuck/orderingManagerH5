<template>
    <div id="app">
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

*,
*:before,
*::after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -o-box-sizing: border-box;
    box-sizing: border-box;
}
/* reviewContainer */
.header-download{
    margin-top: 12.5px;
    width:auto !important;
    padding: 0 20px 0 10px;
    height:25px;
    border-radius:12px;
    border:1px solid rgba(235,60,28,1);
    font-weight:600;
    font-size: 12px;
    color: #EB3C1C;
    line-height: 25px;
    background: url("../../style/images/download.png") no-repeat 90% center;
    background-size: 9px 13px;
}
.downBtn {
  width: 100px;
  line-height: 25px;
  float: right;
  color: #eb3c1c;
  font-size: 12px;
  text-align: center;
  border-color: #eb3c1c;
}
.downImg {
  width: 10px;
  position: relative;
  top: 2px;
}
/* content */
.content-span span{
    font-weight: 600;
    padding-right: 18px;
    font-size: 10px;
    color: #333;
    text-align: left;
}
.selectSpan span {
    color: #EB3C1C;
}
.selectSpan .van-checkbox__icon--checked .van-icon{
  color: #ffffff;
  border-color: #EB3C1C !important;
  background-color: #EB3C1C !important;
}
.content-filtrate{
    text-align: center;
    width:auto !important;
    padding: 0 15px 0 10px;
    text-align: right;
    font-size: 12px;
    color: #505050;
    background: url("../../style/images/shaixuan.png") no-repeat 100% center;
    background-size: 12px 12px;
    overflow: hidden;
}
/* data table */
.data-table{
    padding-bottom: 30px;
}
.data-table tbody td:before {
    background-color: #e6eaef;
}
.data-table table {
    font-size: 10px;
    color: #505050;
    border: 1px solid #e6eaef;
}
.data-table table thead tr {
    background: #fff9f5;
}
.data-table table thead tr th {
    font-weight: bold;
    color: #333 !important;
    text-align: center;
    line-height: 40px;
}
.data-table table tbody tr td {
    line-height: 40px;
    text-align: center;
}
/* 分页 */
/* element pagination */
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
    right: 0 !important;
} 
.el-select-dropdown .el-select-dropdown__item{
  font-size: 12px;
  padding: 0 10px;
  height: 28px;
  line-height: 28px;
}
.el-select-dropdown__item.selected {
    color: #fe813c;
}
/* dialog*/
.el-dialog__body {
    padding: 10px 20px 25px 20px !important;
}
.downDialog .el-dialog{
    border-radius: 15px;
}
.selectTypeDialog .el-dialog__header{
    padding: 0 !important;
}
.email-input .el-input__inner {
    font-size: 16px !important;
}
/*checkbox*/
.el-checkbox__input.is-checked+.el-checkbox__label {
    color: #FE813C !important;
}
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #FE813C !important;
    border-color: #FE813C !important;
}

.el-checkbox__inner:hover {
    border-color: #FE813C !important;
}
.el-checkbox__inner {
    border-radius: 50% !important;
}
/* tree */
.el-tree-node__content{
   margin: 5px auto 10px auto !important;
}
.data-table th, .data-table td{
    padding: 0px !important;
}
.data-table th.numeric-cell, .data-table td.numeric-cell{
    text-align: center !important;
}
.van-checkbox__icon--checked .van-icon{
  color: #fff !important;
  border-color: #FE813C !important;
  background-color: #FE813C !important;
}

/* data picker */
.el-date-table td.end-date span, .el-date-table td.start-date span {
    background-color: #FE813C !important;
}
.el-date-table td.today span {
    color: #FE813C !important;
}
.el-drawer__body{
    overflow-y: auto;
}
</style>
