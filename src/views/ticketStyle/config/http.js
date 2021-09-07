import {
    ajax
} from '@/utils/api'
var request = function () {
    var self = {};

    //门店列表无分页
    self.branchStoreListAll = function (data, successfn) {
        ajax('/apis/dept/post/deptall', data, false, 'post', successfn);
    };

    //门店数据统计
    self.managedata = function (data, successfn) {
        ajax('/apis/dept/count/managedata', data, false, 'post', successfn);
    };

    //支付方式统计
    self.ewallrank = function (data, successfn) {
        ajax('/apis/dept/count/ewallrank', data, false, 'post', successfn);
    };
    //支付方式报表
    self.reportPay = function (data, successfn) {
        ajax('/apis/dept/report/pay', data, false, 'post', successfn);
    };

    //支付方式报表
    self.deprank = function (data, successfn) {
        ajax('/apis/dept/count/deprank', data, false, 'post', successfn);
    };

    //时段报表
    self.hourReport = function (data, successfn) {
        ajax('/apis/dept/report/hour', data, false, 'post', successfn);
    };

    //分类
    self.getdish = function (data, successfn) {
        ajax('/apis/dept/print/getdish', data, false, 'post', successfn);
    };

    //分类
    self.detail = function (data, successfn) {
        ajax('/apis/dept/order/detail', data, false, 'post', successfn);
    };

    //支付类型
    self.getpaytype = function (data, successfn) {
        ajax('/apis/dept/post/getpaytype', data, false, 'post', successfn);
    };

    return self;
}();

export {
    request
}