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
.el-input{
    border: 1px #E5E5E5 solid;
    border-radius: 4px;
}
.importStart .el-input__inner{
    background: none;
    color: white;
}
.langStyle .el-input{
  border: none !important;
  width: 100px;
}
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background-color: #FE813C;
  border-color: #FE813C;
}
.el-checkbox__input.is-checked+.el-checkbox__label{
  color: #505050;
  font-size: 16px;
}
.el-checkbox__inner{
  width: 16px;
  height: 16px;
  font-size: 16px;
}
.el-checkbox__inner::after{
  left: 5px;
  top: 2px;
}
.el-checkbox__label{
  font-size: 16px;
}
.el-step__icon{
  width: 16px;
  height: 16px;
}
.el-step.is-vertical .el-step__line{
  left: 6px;
  width: 6px;
  top: 8px;
  height: 45px;
}
.el-step__line{
  background-color: white;
  opacity: 0 !important;
}
.is-finish .el-step__line .el-step__line-inner{
  border-color: red;
  left: 2px;
  width: 2px;
  position: relative;
}
.el-step__head.is-finish,.el-step__head.is-process,.el-step__head.is-wait{
  border-color: white;
  color:white;
  top: 0;
  bottom: 0;
}
.el-step__title.is-finish,.el-step__title.is-process,.el-step__title.is-wait{
  color: white;
  font-weight: normal;
}
.el-step.is-vertical .el-step__title{
  line-height: 18px;
}
.is-finish .el-step__icon-inner{
  background: red !important;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    color: red;
    text-indent:-9999px;
} 
.el-popover{
  font-size: 12px;
}
.storeList li{
    margin-top: 30px;
}
.el-input ::-webkit-input-placeholder { /* WebKit browsers */ 
color: #fff; 
} 
.el-input :-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
color: #fff; 
} 
.el-input ::-moz-placeholder { /* Mozilla Firefox 19+ */ 
color: #fff; 
} 
.el-input :-ms-input-placeholder { /* Internet Explorer 10+ */ 
color: #fff; 
} 
.el-select-dropdown__item.selected{
  color: #f7682f;
}
.van-dialog{
  width: 280px !important;
}
.logo1Css{
  padding-left: 30px;
}
.logoCss{
  padding-right: 60px;
}
.storeHUbDiv{
  text-align: center;
}
.mjoyDiv{
  text-align: center;
}
.mjoyText{
  text-align: left;
}
.storeHUbText{
  text-align: left;
}
@media screen and (min-width:768px){
  .logo1Css{padding-left: 29%;}
  .logoCss{padding-right: 29%;}
  .storeHUbDiv{text-align: right;}
  .mjoyDiv{text-align: left;}
  .storeHUbText{text-align: right;}
 }
.loginCss .el-input{
  border: none;
  padding-bottom: 10px;
  width: 67%;
}
</style>
