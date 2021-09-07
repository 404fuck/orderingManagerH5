import store from '../store'
var stringutils = function () {
    var self = {};
    //格式化日期
    self.formatDate = function (date, fmt) {

        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        }
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + ''
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
            }
        }
        return fmt
    };

    function padLeftZero(str) {
        return ('00' + str).substr(str.length)
    }

    self.getJsonLength = function (json) {
        var jsonLength = 0;
        if (json == null || json.length == 0) {
            return 0;
        }
        for (var i in json) {
            jsonLength++;
        }
        return jsonLength;
    }

    //数组去重
    self.putDuplicate = function (data) {
        var arr = [];
        for (var i = 0; i < data.length; i++) {
            if (arr.indexOf(data[i]) == -1) {
                arr.push(data[i]);
            }
        }
        return arr;
    }
    //数组种插入数组的方法
    self.insert = function (arrfirst, arrlast, index) {
        if (index < 0) {
            index = 0;
        } else if (index > arrfirst.length) {
            index = arrfirst.length;
        }
        for (var i = arrlast.length - 1; i >= 0; i--) {
            arrfirst.splice(index, 0, arrlast[i]); //是在index位置用arrlast[i]替换掉arrfirst数组中的0个元素
        }
        return arrfirst;
    }

    self.isOSXMAC = function () {
        var u = navigator.userAgent;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isIOS) {
            return true
        }
        return false
    }

    self.setDishNum = function (dishID, num) {
        var dic = store.getters.dishNums
        dic[dishID] = num
        store.dispatch("setDishNums", dic)
    }

    self.clearDishNum = function () {
        let dic = store.getters.dishNums
        for (var i in dic) {
            dic[i] = 0
        }
        store.dispatch("setDishNums", dic);
    }

    self.deepClone = function (obj) { //深拷贝
        let objClone = Array.isArray(obj) ? [] : {};
        if (obj && typeof obj === "object") {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    //判断ojb子元素是否为对象，如果是，递归复制
                    if (obj[key] && typeof obj[key] === "object") {
                        objClone[key] = this.deepClone(obj[key]);
                    } else {
                        //如果不是，简单复制
                        objClone[key] = obj[key];
                    }
                }
            }
        }
        return objClone;
    }

    self.sortBy = function (attr, rev) {
        return function (a, b) {
            a = a[attr]
            b = b[attr]
            if (a < b) {
                return rev * -1
            }
            if (a > b) {
                return rev * 1
            }
            return 0
        }
    }

    self.formatPrice = function (value) {
        if (!value) {
            return '0.00'
        }
        value = Math.round(parseFloat(value) * 100) / 100;
        var xsd = value.toString().split(".");
        if (xsd.length == 1) {
            value = value.toString() + ".00";
            return value;
        }
        if (xsd.length > 1) {
            if (xsd[1].length < 2) {
                value = value.toString() + "0";
            }
            return value;
        }
        return value;
    }

    self.formatEmpty = function (date) {
        if (date.length > 0) {
            return date;
        }
        return ''
    }

    return self;
}();


export {
    stringutils
}