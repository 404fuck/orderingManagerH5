import http from 'axios'
import store from '../store'
import {
  Toast
} from 'vant';
import {
  baseUrl
} from './baseUrl'
import {
  stringutils
} from './stringutils'

// alert('api：'+store.getters.language)
//master

//请求基地址
var BaseUrl = baseUrl.getBaseUrl()
//供应链请求基地址
var BaseUrl2 = baseUrl.getSupplyUrl()
//服务员请求基地址
var BaseUrl3 = baseUrl.getWaiterUrl()

// 外卖请求地址
var BaseUrl4 = baseUrl.getTakeoutUrl()

// StoreHub地址
var BaseUrl5 = baseUrl.getStoreHubUrl() 

var axios = http.create({
  baseUrl: BaseUrl,
  transformRequest: [function (data,headers) {
    // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
    var token = store.getters.token
    if (token !== null && token !== "" && typeof (token) !== "undefined") {
      data['token'] = token;
    }
    return JSON.stringify(data);
  }],
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Request-App': 'web',
    'lang': store.getters.language == 'undefined' ? 'en_US' : store.getters.language
  },
});
var axios2 = http.create({
  baseUrl: BaseUrl2,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Request-App': 'web',
    'lang': store.getters.language == 'undefined' ? 'en_US' : store.getters.language
  },
  transformRequest: [function (data) {
    // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
    var token = store.getters.token
    if (token !== null && token !== "" && typeof (token) !== "undefined") {
      data['token'] = token;
    }
    return JSON.stringify(data);
  }]
});
var axios3 = http.create({
  baseUrl: BaseUrl3,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Request-App': 'web',
    'lang': store.getters.language == 'undefined' ? 'en_US' : store.getters.language
  },
  transformRequest: [function (data) {
    // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
    var token = store.getters.token
    if (token !== null && token !== "" && typeof (token) !== "undefined") {
      data['token'] = token;
    }
    return JSON.stringify(data);
  }]
});
var axios4 = http.create({
  baseUrl: BaseUrl4,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Request-App': 'web',
    'lang': store.getters.language == 'undefined' ? 'en_US' : store.getters.language
  },
  transformRequest: [function (data) {
    // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
    var token = store.getters.token
    if (token !== null && token !== "" && typeof (token) !== "undefined") {
      data['token'] = token;
    }
    return JSON.stringify(data);
  }]
});
var axios5 = http.create({
  baseUrl: BaseUrl5,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Request-App': 'web',
    'lang': store.getters.language == 'undefined' ? 'en_US' : store.getters.language
  },
  // transformRequest: [function (data) {
  //   // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
  //   var token = store.getters.token
  //   if (token !== null && token !== "" && typeof (token) !== "undefined") {
  //     data['token'] = token;
  //   }
  //   return JSON.stringify(data);
  // }]
});
export const ajax = function (action, data, async, type, successfn, noLoading, errorFun) {
  var url = action;

  // if (url != '/apis/dept/order/detail') {
  //   Toast.loading({
  //     duration: 0, // 持续展示 toast
  //     forbidClick: true, // 禁用背景点击
  //     loadingType: 'spinner',
  //     onClose: timeOut(),
  //   });
  // }
  Toast.loading({
    duration: 500, // 持续展示 toast
    forbidClick: true, // 禁用背景点击
    loadingType: 'spinner',
    onClose: timeOut(),
  });
  async = (async ==null || async =="" || typeof (async) == "undefined") ? true : async;
  type = (type == null || type == "" || typeof (type) == "undefined") ? "post" : type;
  data = (data == null || data == "" || typeof (data) == "undefined") ? {
    "date": new Date().getTime()
  } : data;

  //使用get 方法的时候将参数拼入url中
  if (type == 'get') {
    for (let i in data) {
      if (url.indexOf("?") != -1) {
        url += '&' + i + '=' + data[i]
      } else {
        url += '?' + i + '=' + data[i]
      }
    }
  }

  // 发送 ajax 请求
  axios({
      method: (type == null || type == "" || typeof (type) == "undefined") ? "post" : type, // default,
      url: BaseUrl + url,
      data: data,
      timeout: 30000,
    }).then(function (info) {
      Toast.clear();
      let res = info.data;


      //登录失效
      if (res.code == '401' || res.code == '403') {

        store.dispatch('setToken', null)
        if (stringutils.isOSXMAC()) {
          window.webkit.messageHandlers.reLogin.postMessage();
        } else {
          window.android.reLogin();
        }
        return
      }
      if (res.code == '460') {

        store.dispatch('setToken', null)
        if (stringutils.isOSXMAC()) {
          window.webkit.messageHandlers.reLoginByAuthChange.postMessage();
        } else {
          window.android.reLoginByAuthChange();
        }
        return
      }


      var token = res.token
      if (token !== null && token !== "" && typeof (token) !== "undefined") {
        //token不为空将token存储起来;
        //toast.error('token不为空将token存储起来')
        store.dispatch('setToken', token)

      }
      successfn(res);
    })
    .catch(function (e) {
      // successfn({
      //   code: 10086
      // });
      Toast.clear();
      let originalRequest = e.config
      if (e.code === 'ECONNABORTED' && e.message.indexOf('timeout') !== -1 && !originalRequest._retry) {
        // eslint-disable-next-line
        Toast('timeout!');
      }
    });

}
export const ajax2 = function (action, data, async, type, successfn, noLoading, errorFun) {
  var url = action;

  // if (url != '/capis/shoppingcart/modifynote') {
  //   Toast.loading({
  //     duration: 0, // 持续展示 toast
  //     forbidClick: true, // 禁用背景点击
  //     loadingType: 'spinner',
  //     onClose: timeOut(),
  //   });
  // }
  Toast.loading({
    duration: 500, // 持续展示 toast
    forbidClick: true, // 禁用背景点击
    loadingType: 'spinner',
    onClose: timeOut(),
  });

  async = (async ==null || async =="" || typeof (async) == "undefined") ? true : async;
  type = (type == null || type == "" || typeof (type) == "undefined") ? "post" : type;
  data = (data == null || data == "" || typeof (data) == "undefined") ? {
    "date": new Date().getTime()
  } : data;

  //使用get 方法的时候将参数拼入url中
  if (type == 'get') {
    for (let i in data) {
      if (url.indexOf("?") != -1) {
        url += '&' + i + '=' + data[i]
      } else {
        url += '?' + i + '=' + data[i]
      }

    }
  }

  // 发送 ajax 请求
  axios2({
      method: (type == null || type == "" || typeof (type) == "undefined") ? "post" : type, // default,
      url: BaseUrl2 + url,
      data: data,
      timeout: 30000,
    }).then(function (info) {
      Toast.clear();
      let res = info.data;
      //登录失效
      if (res.code == '401' || res.code == '403') {
        store.dispatch('setToken', null)
        if (stringutils.isOSXMAC()) {
          window.webkit.messageHandlers.reLogin.postMessage();
        } else {
          window.android.reLogin();
        }
        return
      }
      if (res.code == '460') {
        store.dispatch('setToken', null)
        if (stringutils.isOSXMAC()) {
          window.webkit.messageHandlers.reLoginByAuthChange.postMessage();
        } else {
          window.android.reLoginByAuthChange();
        }
        return
      }


      var token = res.token
      if (token !== null && token !== "" && typeof (token) !== "undefined") {
        //token不为空将token存储起来;
        //toast.error('token不为空将token存储起来')
        store.dispatch('setToken', token)

      }
      successfn(res);
    })
    .catch(function (e) {
      Toast.clear();
      let originalRequest = e.config
      if (e.code === 'ECONNABORTED' && e.message.indexOf('timeout') !== -1 && !originalRequest._retry) {
        // eslint-disable-next-line
        Toast('timeout!');
      }
    });

}
export const ajax3 = function (action, data, async, type, successfn, noLoading, errorFun) {
  var url = action;

  // if (url != '/capis/shoppingcart/modifynote') {
  //   Toast.loading({
  //     duration: 0, // 持续展示 toast
  //     forbidClick: true, // 禁用背景点击
  //     loadingType: 'spinner',
  //     onClose: timeOut(),
  //   });
  // }
  Toast.loading({
    duration: 500, // 持续展示 toast
    forbidClick: true, // 禁用背景点击
    loadingType: 'spinner',
    onClose: timeOut(),
  });

  async = (async ==null || async =="" || typeof (async) == "undefined") ? true : async;
  type = (type == null || type == "" || typeof (type) == "undefined") ? "post" : type;
  data = (data == null || data == "" || typeof (data) == "undefined") ? {
    "date": new Date().getTime()
  } : data;

  //使用get 方法的时候将参数拼入url中
  if (type == 'get') {
    for (let i in data) {
      if (url.indexOf("?") != -1) {
        url += '&' + i + '=' + data[i]
      } else {
        url += '?' + i + '=' + data[i]
      }

    }
  }

  // 发送 ajax 请求
  axios3({
      method: (type == null || type == "" || typeof (type) == "undefined") ? "post" : type, // default,
      url: BaseUrl3 + url,
      data: data,
      timeout: 30000,
    }).then(function (info) {
      Toast.clear();
      let res = info.data;
      //登录失效
      if (res.code == '401' || res.code == '403') {

        store.dispatch('setToken', null)
        if (stringutils.isOSXMAC()) {
          window.webkit.messageHandlers.reLogin.postMessage();
        } else {
          window.android.reLogin();
        }
        return
      }
      if (res.code == '460') {

        store.dispatch('setToken', null)
        if (stringutils.isOSXMAC()) {
          window.webkit.messageHandlers.reLoginByAuthChange.postMessage();
        } else {
          window.android.reLoginByAuthChange();
        }
        return
      }


      var token = res.token
      if (token !== null && token !== "" && typeof (token) !== "undefined") {
        //token不为空将token存储起来;
        //toast.error('token不为空将token存储起来')
        store.dispatch('setToken', token)

      }
      successfn(res);
    })
    .catch(function (e) {
      Toast.clear();
      let originalRequest = e.config
      if (e.code === 'ECONNABORTED' && e.message.indexOf('timeout') !== -1 && !originalRequest._retry) {
        // eslint-disable-next-line
        Toast('timeout!');
      }
    });

}
export const ajax4 = function (action, data, async, type, successfn, noLoading, errorFun) {
  var url = action;

  // if (url != '/capis/shoppingcart/modifynote') {
  //   Toast.loading({
  //     duration: 0, // 持续展示 toast
  //     forbidClick: true, // 禁用背景点击
  //     loadingType: 'spinner',
  //     onClose: timeOut(),
  //   });
  // }
  Toast.loading({
    duration: 500, // 持续展示 toast
    forbidClick: true, // 禁用背景点击
    loadingType: 'spinner',
    onClose: timeOut(),
  });

  async = (async ==null || async =="" || typeof (async) == "undefined") ? true : async;
  type = (type == null || type == "" || typeof (type) == "undefined") ? "post" : type;
  data = (data == null || data == "" || typeof (data) == "undefined") ? {
    "date": new Date().getTime()
  } : data;

  //使用get 方法的时候将参数拼入url中
  if (type == 'get') {
    for (let i in data) {
      if (url.indexOf("?") != -1) {
        url += '&' + i + '=' + data[i]
      } else {
        url += '?' + i + '=' + data[i]
      }

    }
  }

  // 发送 ajax 请求
  axios4({
      method: (type == null || type == "" || typeof (type) == "undefined") ? "post" : type, // default,
    url: BaseUrl4 + url,
      data: data,
      timeout: 30000,
    }).then(function (info) {
      Toast.clear();
      let res = info.data;
      //登录失效
      if (res.code == '401' || res.code == '403') {

        store.dispatch('setToken', null)
        if (stringutils.isOSXMAC()) {
          window.webkit.messageHandlers.reLogin.postMessage();
        } else {
          window.android.reLogin();
        }
        return
      }
      if (res.code == '460') {

        store.dispatch('setToken', null)
        if (stringutils.isOSXMAC()) {
          window.webkit.messageHandlers.reLoginByAuthChange.postMessage();
        } else {
          window.android.reLoginByAuthChange();
        }
        return
      }


      var token = res.token
      if (token !== null && token !== "" && typeof (token) !== "undefined") {
        //token不为空将token存储起来;
        //toast.error('token不为空将token存储起来')
        store.dispatch('setToken', token)

      }
      successfn(res);
    })
    .catch(function (e) {
      Toast.clear();
      let originalRequest = e.config
      if (e.code === 'ECONNABORTED' && e.message.indexOf('timeout') !== -1 && !originalRequest._retry) {
        // eslint-disable-next-line
        Toast('timeout!');
      }
    });

}
export const ajax5 = function (action, data, async, type, successfn, noLoading, errorFun) {
  var url = action;

  // if (url != '/capis/shoppingcart/modifynote') {
  //   Toast.loading({
  //     duration: 0, // 持续展示 toast
  //     forbidClick: true, // 禁用背景点击
  //     loadingType: 'spinner',
  //     onClose: timeOut(),
  //   });
  // }
  Toast.loading({
    duration: 500, // 持续展示 toast
    forbidClick: true, // 禁用背景点击
    loadingType: 'spinner',
    onClose: timeOut(),
  });

  async = (async ==null || async =="" || typeof (async) == "undefined") ? true : async;
  type = (type == null || type == "" || typeof (type) == "undefined") ? "post" : type;
  data = (data == null || data == "" || typeof (data) == "undefined") ? {
    "date": new Date().getTime()
  } : data;

  //使用get 方法的时候将参数拼入url中
  if (type == 'get') {
    for (let i in data) {
      if (url.indexOf("?") != -1) {
        url += '&' + i + '=' + data[i]
      } else {
        url += '?' + i + '=' + data[i]
      }

    }
  }

  // 发送 ajax 请求
  axios5({
      method: (type == null || type == "" || typeof (type) == "undefined") ? "post" : type, // default,
    url: BaseUrl5 + url,
      data: data,
      timeout: 500000,
    }).then(function (info) {
      Toast.clear();
      let res = info.data;
      //登录失效
      if (res.code == '401' || res.code == '403') {

        store.dispatch('setToken', null)
        if (stringutils.isOSXMAC()) {
          window.webkit.messageHandlers.reLogin.postMessage();
        } else {
          window.android.reLogin();
        }
        return
      }
      if (res.code == '460') {

        store.dispatch('setToken', null)
        if (stringutils.isOSXMAC()) {
          window.webkit.messageHandlers.reLoginByAuthChange.postMessage();
        } else {
          window.android.reLoginByAuthChange();
        }
        return
      }


      var token = res.token
      if (token !== null && token !== "" && typeof (token) !== "undefined") {
        //token不为空将token存储起来;
        //toast.error('token不为空将token存储起来')
        store.dispatch('setToken', token)

      }
      successfn(res);
    })
    .catch(function (e) {
      Toast.clear();
      let originalRequest = e.config
      if (e.code === 'ECONNABORTED' && e.message.indexOf('timeout') !== -1 && !originalRequest._retry) {
        // eslint-disable-next-line
        Toast('timeout!');
      }
    });

}
export const ajax6 = function (action, data, async, type, successfn, noLoading, errorFun) {
  var url = action;
  Toast.loading({
    duration: 500, // 持续展示 toast
    forbidClick: true, // 禁用背景点击
    loadingType: 'spinner',
    onClose: timeOut(),
  });

  async = (async ==null || async =="" || typeof (async) == "undefined") ? true : async;
  type = (type == null || type == "" || typeof (type) == "undefined") ? "post" : type;
  data = (data == null || data == "" || typeof (data) == "undefined") ? {
    "date": new Date().getTime()
  } : data;

  //使用get 方法的时候将参数拼入url中
  if (type == 'get') {
    for (let i in data) {
      if (url.indexOf("?") != -1) {
        url += '&' + i + '=' + data[i]
      } else {
        url += '?' + i + '=' + data[i]
      }

    }
  }
}
var axiosFile = http.create({
  baseUrl: '/',
  headers: {
    'Content-Type': 'multipart/form-data',
    'X-REQUESTED-WITH': 'xmlhttprequest',
    'Request-App': 'web',
    'lang': store.getters.language == 'undefined' ? 'en_US' : store.getters.language
  }

});

function timeOut() {
  Toast("Time out");
}

export const ajaxFile = function (action, data, async, type, successfn, noLoading, errorFun) {
  if (!noLoading) {

  }


  var url = action;
  async = (async ==null || async =="" || typeof (async) == "undefined") ? true : async;
  type = (type == null || type == "" || typeof (type) == "undefined") ? "post" : type;
  data = (data == null || data == "" || typeof (data) == "undefined") ? {
    "date": new Date().getTime()
  } : data;

  //使用get 方法的时候将参数拼入url中
  if (type == 'get') {
    for (let i in data) {
      if (url.indexOf("?") != -1) {
        url += '&' + i + '=' + data[i]
      } else {
        url += '?' + i + '=' + data[i]
      }

    }
  }

  // 发送 ajax 请求
  axiosFile({
      method: (type == null || type == "" || typeof (type) == "undefined") ? "post" : type, // default,
      url: url,
      data: data,
      timeout: 30000,
    }).then(function (info) {

      let res = info.data;
      var token = res.token
      if (token !== null && token !== "" && typeof (token) !== "undefined") {
        //token不为空将token存储起来;
        store.dispatch('setToken', token)
      }
      successfn(res);
    })
    .catch(function (e) {
      Toast.clear();
      let originalRequest = e.config
      if (e.code === 'ECONNABORTED' && e.message.indexOf('timeout') !== -1 && !originalRequest._retry) {
        // eslint-disable-next-line
        Toast('timeout!');
      }
    });

}