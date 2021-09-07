import {
    ajax
   
} from '@/utils/api'


var request = function () {
    var self = {};

    //登录
    self.login = function (data, successfn) {
        ajax('/app/dp/user/post/loginByCode', data, false, 'post', successfn);
    };
    //获取验证码
    self.sendsms = function (data, successfn) {
        ajax('/app/dp/user/post/sendVercode', data, false, 'post', successfn);
    };
   
    return self;
}();

export {
    request
}