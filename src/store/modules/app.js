const app = {
    state: {
        isClear: true,
        // 中英文
        language: localStorage.getItem('language') || 'en_US',
        // 数据导入中英文
        toolsLanguage: localStorage.getItem('toolsLanguage') || 'en_US',
        showNaviBar: localStorage.getItem('showNaviBar') || false,
        //本地orderingManageToken
        orderingManageToken: localStorage.getItem('orderingManageToken') || '',
        currentStore: localStorage.getItem('currentStore') && JSON.parse(localStorage.getItem('currentStore')) || {},
        storeList: localStorage.getItem('storeList') && JSON.parse(localStorage.getItem('storeList')) || {},
        requestData: null,
        // StoreHub用户
        mobile_inf: localStorage.getItem('mobile_inf') || '',
        pwd: localStorage.getItem('pwd') || '',
        toolsToken: localStorage.getItem('toolsToken') || '',
        orderResData: sessionStorage.getItem('orderResData') && JSON.parse(localStorage.getItem('orderResData')) || null,
        
        
    },
    mutations: {
        //清空缓存
        CLEAR_COOKIES: (state, isClear) => {
            state.isClear = isClear
            localStorage.clear()
            sessionStorage.clear()
            //初始化state
            state.language = 'en_US'
            state.toolsLanguage = 'en_US'
            state.orderingManageToken = ''
            state.currentStore = {}
            state.storeList = {}
        },
        // 导航栏显示
        SET_showNaviBar: (state, showNaviBar) => {
            state.showNaviBar = showNaviBar
            localStorage.setItem('showNaviBar', showNaviBar)
        },
        // 中英文
        SET_LANGUAGE: (state, language) => {
            state.language = language
            localStorage.setItem('language', language)

        },
        // 导入数据中英文
        SET_toolsLanguage: (state, toolsLanguage) => {
            state.toolsLanguage = toolsLanguage
            localStorage.setItem('toolsLanguage', toolsLanguage)

        },
        // orderingManageToken
        SET_TOKEN: (state, orderingManageToken) => {
            state.orderingManageToken = orderingManageToken
            localStorage.setItem('orderingManageToken', orderingManageToken)
        },
        // mobile_inf
        SET_mobile_inf: (state, mobile_inf) => {
            state.mobile_inf = mobile_inf
            localStorage.setItem('mobile_inf', mobile_inf)
        },
        // pwd
        SET_pwd: (state, pwd) => {
            state.pwd = pwd
            localStorage.setItem('pwd', pwd)
        },
        // toolsToken
        SET_toolsToken: (state, toolsToken) => {
            state.toolsToken = toolsToken
            localStorage.setItem('toolsToken', toolsToken)
        },
        // currentStore
        SET_currentStore: (state, currentStore) => {
            state.currentStore = currentStore
            localStorage.setItem('currentStore', JSON.stringify(currentStore))
        },
        // storeList
        SET_STORELIST: (state, storeList) => {
            state.storeList = storeList
            localStorage.setItem('storeList', JSON.stringify(storeList))
        },
        SET_REQUESTDATA: (state, data) => {
            state.requestData = data
            sessionStorage.setItem('requestData', JSON.stringify(data))
        },

        SET_ORDERRESDATA: (state, orderResData) => {
            state.orderResData = orderResData
            sessionStorage.setItem('orderResData', JSON.stringify(orderResData))
        },
        
    },
    actions: {

        //清空缓存
        clearCookies({
            commit
        }, isClear) {
            commit('CLEAR_COOKIES', isClear)
        },

        setShowNaviBar({
            commit
        }, showNaviBar) {
            commit('SET_showNaviBar', showNaviBar)
        },
        // 中英文
        setLanguage({
            commit
        }, language) {
            commit('SET_LANGUAGE', language)
        },
        // 数据导入中英文
        settoolsLanguage({
            commit
        }, toolsLanguage) {
            commit('SET_toolsLanguage', toolsLanguage)
        },
        // orderingManageToken
        setToken({
            commit
        }, orderingManageToken) {
            commit('SET_TOKEN', orderingManageToken)
        },
        // mobile_inf
        setmobile_inf({
            commit
        }, mobile_inf) {
            commit('SET_mobile_inf', mobile_inf)
        },
        //pwd
        setpwd({
            commit
        }, pwd) {
            commit('SET_pwd', pwd)
        },
        // toolsToken
        settoolsToken({
            commit
        }, toolsToken) {
            commit('SET_toolsToken', toolsToken)
        }, // currentStore
        setcurrentStore({
            commit
        }, currentStore) {
            commit('SET_currentStore', currentStore)
        }, // USER
        setStoreList({
            commit
        }, storeList) {
            commit('SET_STORELIST', storeList)
        },
        setRequestData({
            commit
        }, data) {
            commit('SET_REQUESTDATA', data)
        },
        setOrderResData({
            commit
        }, orderResData) {
            commit('SET_ORDERRESDATA', orderResData)
        },

    }

}

export default app