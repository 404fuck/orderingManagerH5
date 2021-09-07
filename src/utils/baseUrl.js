
//请求地址配置
var baseUrl = function () {
    var self = {};

    //获取基础地址
    self.getBaseUrl = function () {
        var base_url = ''
        switch (process.env.NODE_ENV) {
            case 'development'://http://192.168.1.206:18091
                base_url = "http://up.shule666.com:18091" //这里是本地的请求url
                break
            case 'test': // 注意这里的名字要和步骤二中设置的环境名字对应起来  http://up.shule666.com:18091
                base_url = "http://up.shule666.com:18091" //这里是测试环境中的url
                break
            case 'production': //http://www.shule666.com:18091
                base_url = "http://up.shule666.com:18091" //生产环境url
                break
        }
        return base_url;
    }
    //获取供应链基础地址
    self.getSupplyUrl = function () {
        var base_url2 = ''
        switch (process.env.NODE_ENV) {
            case 'development':
            base_url2 = "http://up.shule666.com:18087" //这里是本地的请求url
                break
            case 'test': //注意这里的名字要和步骤二中设置的环境名字对应起来 http://up.shule666.com:18087
            base_url2 = "http://up.shule666.com:18087" //这里是测试环境中的url
                break
            case 'production'://http://www.shule666.com:18087
            base_url2 = "http://up.shule666.com:18087" //生产环境url
                break
        }
        return base_url2;
    }

    //获取服务员基础地址
    self.getWaiterUrl = function () {
        var base_url3 = ''
        switch (process.env.NODE_ENV) {
            case 'development':
            base_url3 = "http://up.shule666.com:18082" //这里是本地的请求url
                break
            case 'test': //注意这里的名字要和步骤二中设置的环境名字对应起来 http://up.shule666.com:18082
            base_url3 = "http://up.shule666.com:18082" //这里是测试环境中的url
                break
            case 'production'://http://www.shule666.com:18082
            base_url3 = "http://up.shule666.com:18082" //生产环境url
                break
        }
        return base_url3;
    }
    //获取外卖基础地址
    self.getTakeoutUrl = function () {
        var base_url4 = ''
        switch (process.env.NODE_ENV) {
            case 'development':
            base_url4 = "http://up.shule666.com:18092" //这里是本地的请求url
                break
            case 'test': //注意这里的名字要和步骤二中设置的环境名字对应起来
            base_url4 = "http://up.shule666.com:18092" //这里是测试环境中的url http://up.shule666.com:18092
                break
            case 'production'://http://www.shule666.com:18092
            base_url4 = "http://up.shule666.com:18092" //生产环境url
                break
        }
        return base_url4;
    }

    //获取StoreHub地址
    self.getStoreHubUrl = function () {
        var base_url5 = ''
        switch (process.env.NODE_ENV) {
            case 'development':
            base_url5 = "http://up.shule666.com:19999" //这里是本地的请求url
                break
            case 'test': //注意这里的名字要和步骤二中设置的环境名字对应起来
            base_url5 = "http://up.shule666.com:19999" //这里是测试环境中的url http://up.shule666.com:19999
                break
            case 'production'://http://www.sjoyfood.com:19999
            base_url5 = "http://up.shule666.com:19999" //生产环境url
                break
        }
        return base_url5;
    }

    return self;
}();

export {
    baseUrl
}