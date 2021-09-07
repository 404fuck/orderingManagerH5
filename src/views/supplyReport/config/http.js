
import {
    ajax2
} from '@/utils/api'
var request = function () {
    var self = {};

    //库存报表
    self.getStockReport = function (data, successfn) {
        ajax2('/api/expend/getStockReport', data, false, 'post', successfn);
    };
    //盘点损益表
    self.getProfitLossReport = function (data, successfn) {
        ajax2('/api/expend/getProfitLossReport', data, false, 'post', successfn);
    };

    //物料出入库明细表
    self.getInOutStoreDetail = function (data, successfn) {
        ajax2('/api/expend/getInOutStoreDetail', data, false, 'post', successfn);
    };

    //物料消耗统计表
    self.getExpendInfo = function (data, successfn) {
        ajax2('/api/expend/getExpendInfo', data, false, 'post', successfn);
    };

    //所有的仓库列表
    self.storehouseList = function (data, successfn) {
        ajax2('/api/storehouse/list', data, false, 'post', successfn);
    };

    //供应商列表(无分页）
    self.supplierList = function (data, successfn) {
        ajax2('/api/supplier/list', data, false, 'post', successfn);
    };

    //下载报表
    self.download = function (data, successfn) {
        ajax2('/api/expend/download', data, false, 'post', successfn);
    };

    //类别层级列表
    self.getypeinfotreelist = function (data, successfn) {
        ajax2('/api/type/getypeinfotreelist', data, false, 'post', successfn);
    };

    //类别字典(出入库类型：1>入库 2>出库 4>全部)
    self.getTypeDicInfo = function (data, successfn) {
        ajax2('/api/type/getTypeDicInfo', data, false, 'post', successfn);
    };
   //所有的仓库列表
    self.storehouseList = function (data, successfn) {
        ajax2('/api/storehouse/list', data, false, 'post', successfn);
    };
    //库存报表合计获取
    self.getStockReportSum = function (data, successfn) {
        ajax2('/api/expend/getStockReportSum', data, false, 'post', successfn);
    };
    //物料消耗金额合计，传入参数同列表
    self.getExpendSum = function (data, successfn) {
        ajax2('/api/expend/getExpendSum', data, false, 'post', successfn);
    };

    //获取邮箱
    self.getUserMail = function (data, successfn) {
        ajax2('/api/expend/getUserMail', data, false, 'post', successfn);
    };

    //修改邮箱
    self.updateUserMail = function (data, successfn) {
        ajax2('/api/expend/updateUserMail', data, false, 'post', successfn);
    };

    return self;
}()

export {
    request
}