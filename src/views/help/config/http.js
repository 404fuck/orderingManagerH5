import {
    ajax

} from '@/utils/api'


var request = function () {
    var self = {};

    //文档列表
    self.doclist = function (data, successfn) {
        ajax('/apis/dept/post/doclist', data, false, 'post', successfn);
    };

    //查询文档
    self.doc = function (data, successfn) {
        ajax('/apis/dept/post/doc', data, false, 'post', successfn);
    };

    //查询问题
    self.findproblem = function (data, successfn) {
        ajax('/apis/dept/post/findproblem', data, false, 'post', successfn);
    };

    return self;
}();

export {
    request
}