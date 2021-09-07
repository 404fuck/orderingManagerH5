<template>
  <div id="app" class="scroll-wrapper toolbar-fixed">
    <router-view />
  </div>
</template>


<style>
@import "../../style/css/framework7.ios.css?111111";
@import "../../style/css/framework7.ios.colors.css?111111";
@import "../../style/css/font-awesome.css?111111";
@import "../../style/css/etms.css?111111";


.el-pagination.is-background .el-pager li:not(.disabled).active{
      background-color: #fe813c !important;
}
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
.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
  background: #ffffff !important;
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
  height: 30px;
  line-height: 30px;
}
.el-select-dropdown__item.selected{
  color: #fe813c !important;
}
</style>
