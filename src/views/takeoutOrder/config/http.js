import {
    ajax,ajax3,ajax4
} from '@/utils/api'
var request = function () {
    var self = {};
    
    //服务员退款
    self.refundWaiter = function (data, successfn) {
        ajax3('/app/waiter/order/refund', data, false, 'post', successfn);
    };

    //门店列表无分页
    self.branchStoreListAll = function (data, successfn) {
        ajax('/apis/dept/post/deptall', data, false, 'post', successfn);
    };

    //管家外卖支付类型
    // self.getDlyPayMent = function (data, successfn) {
    //     ajax('/apis/delivery/getDlyPayMent', data, false, 'post', successfn);
    // };
     //支付类型
    self.getDlyPayMent = function (data, successfn) {
        ajax('/apis/dept/post/getpaytype', data, false, 'post', successfn);
    };

    //查询门店配置
    self.selectDishSet = function (data, successfn) {
        ajax('/apis/dept/config/select', data, false, 'post', successfn);
    };
    //获取邮箱地址
    self.getmail = function (data, successfn) {
        ajax('/apis/dept/mail/get', data, false, 'post', successfn);
    };
    //获取邮箱地址
    self.getUserMail = function (data, successfn) {
        ajax('/apis/dept/mail/getUserMail', data, false, 'post', successfn);
    };

    //修改邮件
    self.updateUserMail = function (data, successfn) {
        ajax('/apis/dept/mail/updateUserMail', data, false, 'post', successfn);
    };
    //发送邮件
    self.sendmail = function (data, successfn) {
        ajax('/apis/dept/mail/send', data, false, 'post', successfn);
    };

    //修改邮件
    self.updatemail = function (data, successfn) {
        ajax('/apis/dept/mail/update', data, false, 'post', successfn);
    };



    //外卖门店订单明细列表
    self.orderlist = function (data, successfn) {
        ajax4('/apis/delivery/waiter/man/orderlist', data, false, 'post', successfn);
    };

    //外卖订单列表(下载报表)
    self.deliveryOrder = function (data, successfn) {
        ajax4('/apis/delivery/report/order', data, false, 'post', successfn);
    };

    //外卖门店订单详情
    self.deliveryDetails = function (data, successfn) {
        ajax4('/apis/delivery/waiter/man/details', data, false, 'post', successfn);
    };

    //获取取消订单原因
    self.cancelOrderReason = function (data, successfn) {
        ajax4('/apis/delivery/waiter/cancelOrderReason', data, false, 'post', successfn);
    };

    return self;
}();

export {
    request
}