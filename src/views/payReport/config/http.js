import {
    ajax
} from '@/utils/api'
var request = function () {
    var self = {};

    //门店列表无分页
    self.branchStoreListAll = function (data, successfn) {
        ajax('/apis/dept/post/deptall', data, false, 'post', successfn);
    };
    //门店对账中心
    self.getRecPages = function (data, successfn) {
        ajax('/apis/financial3/getRecPages', data, false, 'post', successfn);
     };
   
    //门店结算记录
    self.depSettlePages = function (data, successfn) {
       ajax('/apis/financial3/depSettlePages', data, false, 'post', successfn);
    };

     //下载报表
     self.download = function (data, successfn) {
        ajax('/apis/financial3/download', data, false, 'post', successfn);
     };
     //收款方式
     self.getPayType = function (data, successfn) {
        ajax('/apis/dept/post/getpaytype', data, false, 'post', successfn);
     };
    return self;
}()

export {
    request
}