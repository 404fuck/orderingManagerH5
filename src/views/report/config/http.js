import {
    ajax,
    ajax3,
    ajax4
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

    //
    self.updateViewTooltip = function (data, successfn) {
        ajax('/apis/dept/config/updateViewTooltip', data, false, 'post', successfn);
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
    self.reporthour = function (data, successfn) {
        ajax('/apis/dept/report/hour', data, false, 'post', successfn);
    };

    //商场数据报表
    self.marketReport = function (data, successfn) {
        ajax('/apis/dept/report/marketReport', data, false, 'post', successfn);
    };

    //分类
    self.getdish = function (data, successfn) {
        ajax('/apis/dept/print/getdish', data, false, 'post', successfn);
    };

    //菜品分类
    self.alltype = function (data, successfn) {
        ajax('/apis/dish/type/alltype', data, false, 'post', successfn);
    };

    //分类
    self.detail = function (data, successfn) {
        ajax('/apis/dept/order/detail', data, false, 'post', successfn);
    };
    //支付类型
    self.getpaytype = function (data, successfn) {
        ajax('/apis/dept/post/getpaytype', data, false, 'post', successfn);
    };

    //订单详情
    self.details = function (data, successfn) {
        ajax('/apis/dept/order/details', data, false, 'post', successfn);
    };
    //获取订单明细报表需要筛选的支付方式
    self.getDepPayTypeForReport = function (data, successfn) {
        ajax('/apis/dept/order/getDepPayTypeForReport', data, false, 'post', successfn);
    };
    

    //查询门店配置
    self.selectDishSet = function (data, successfn) {
        ajax('/apis/dept/config/select', data, false, 'post', successfn);
    };

    //获取Redis中的门店配置信息
    self.getRedisDeptConfigInfo = function (data, successfn) {
        ajax('/apis/dept/config/getRedisDeptConfigInfo', data, false, 'post', successfn);
    };

    //退款
    self.returnMoney = function (data, successfn) {
        ajax('/apis/company/order/post/refund', data, false, 'post', successfn);
    };

    //支付方式报表
    self.payreport = function (data, successfn) {
        ajax('/apis/dept/report/pay', data, false, 'post', successfn);
    };

    //时段报表
    self.hourReport = function (data, successfn) {
        ajax('/apis/dept/report/hour', data, false, 'post', successfn);
    };

    //订单报表
    self.orderReport = function (data, successfn) {
        ajax('/apis/dept/report/order', data, false, 'post', successfn);
    };

    //日销售统计报表
    self.dailysale = function (data, successfn) {
        ajax('/apis/dept/report/dailysale', data, false, 'post', successfn);
    };

    //菜品销售报表
    self.dishsale = function (data, successfn) {
        ajax('/apis/dept/report/dishsale', data, false, 'post', successfn);
    };

    //菜品销售报表
    self.Saledish = function (data, successfn) {
        ajax('/apis/dept/report/dishsale', data, false, 'post', successfn);
    };

    //门店页面退款报表
    self.pagerefund = function (data, successfn) {
        ajax('/apis/dept/report/pagerefund', data, false, 'post', successfn);
    };

    //退款报表
    self.refundReport = function (data, successfn) {
        ajax('/apis/dept/report/refund', data, false, 'post', successfn);
    };

    //菜品分类统计报表
    self.dishTypeCountReport = function (data, successfn) {
        ajax('/apis/dept/report/dishTypeCountReport', data, false, 'post', successfn);
    };
    //套餐销售报表
    self.setmeal = function (data, successfn) {
        ajax('/apis/dept/report/setmeal', data, false, 'post', successfn);
    };

    //套餐销售报表
    self.setmealReport = function (data, successfn) {
        ajax('/apis/dept/report/setmeal', data, false, 'post', successfn);
    };

    //会员概览数据统计
    self.memberManageData = function (data, successfn) {
        ajax('/apis/dept/count/memberManageData', data, false, 'post', successfn);
    };

    //会员概览数据统计
    self.memberReport = function (data, successfn) {
        ajax('/apis/dept/count/memberManageData', data, false, 'post', successfn);
    };

    //加料配菜报表
    self.additionalReport = function (data, successfn) {
        ajax('/apis/dept/report/additionalReport', data, false, 'post', successfn);
    };

    //餐盒报表
    self.boxReport = function (data, successfn) {
        ajax('/apis/dept/report/boxReport', data, false, 'post', successfn);
    };

    //促销分析数据概览
    self.promotionData = function (data, successfn) {
        ajax('/apis/dept/count/promotionData', data, false, 'post', successfn);
    };
    //菜品促销/结账优惠报表
    self.promotionReport = function (data, successfn) {
        ajax('/apis/dept/report/promotionReport', data, false, 'post', successfn);
    };
    //促销分析活动名称下拉列表
    self.getCouponInfoSelectList = function (data, successfn) {
        ajax('/apis/dept/report/getCouponInfoSelectList', data, false, 'post', successfn);
    };
    //口味做法报表
    self.tasteReport = function (data, successfn) {
        ajax('/apis/dept/report/tasteReport', data, false, 'post', successfn);
    };
    //获取口味字典
    self.getKouwei = function (data, successfn) {
        ajax('/apis/dish/dt/kouwei', data, false, 'post', successfn);
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


    //服务员退款
    self.refundWaiter = function (data, successfn) {
        ajax3('/app/waiter/order/refund', data, false, 'post', successfn);
    };
    //服务员退款
    self.refundWaiter = function (data, successfn) {
        ajax3('/app/waiter/order/refund', data, false, 'post', successfn);
    };
    //获取取消订单原因
    self.cancelOrderReason = function (data, successfn) {
        ajax4('/apis/delivery/waiter/cancelOrderReason', data, false, 'post', successfn);
    };
    //获取消费者退款原因
    self.refundReason = function (data, successfn) {
        ajax4('/apis/delivery/consumer/order/refundReason', data, false, 'post', successfn);
    };
    //外卖 获取支付方式
    self.getDlyPayMent = function (data, successfn) {
        ajax4('/apis/delivery/getDlyPayMent', data, false, 'post', successfn);
    };
    return self;
}();

export {
    request
}