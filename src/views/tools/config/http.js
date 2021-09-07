import {
    ajax5
} from '@/utils/api'
var request = function () {
    var self = {};

    //登录Mjoy系统
    self.login = function (data, successfn) {
        ajax5('/api/import/login', data, false, 'post', successfn);
    };

    //storehun数据导入到mjoy平台
    self.importStoreInfo = function (data, successfn) {
        ajax5('/api/import/importStoreInfo', data, false, 'post', successfn);
    };

    //获取Storehun门店列表
    self.gethundeplist = function (data, successfn) {
        ajax5('/api/import/gethundeplist', data, false, 'post', successfn);
    };

    //获取Mjoy门店列表
    self.getdeplist = function (data, successfn) {
        ajax5('/api/import/getdeplist', data, false, 'post', successfn);
    };

    //获取导入进度
    self.getProgress = function (data, successfn) {
        ajax5('/api/import/getProgress', data, false, 'post', successfn);
    };
    
    return self;
}();

export {
    request
}