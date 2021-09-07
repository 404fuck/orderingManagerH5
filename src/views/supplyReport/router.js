import Vue from 'vue'
import Router from 'vue-router'

import i18n from '../../utils/i18n'

if (!window.VueRouter) Vue.use(Router)

export default new Router({
    base: "/",
    routes: [{
            path: '/stock',
            name: 'stock',
            component: resolve => require(['./pages/stock'],resolve),
            meta: {
                title: i18n.t('supplyReport.kucunReport'),
                requireAuth: true
            }
        },
        {
            path: '/profitLoss',
            name: 'profitLoss',
            component: resolve => require(['./pages/profitLoss'],resolve),
            meta: {
                title: i18n.t('supplyReport.pandainReport'),
                requireAuth: true
            }
        },
        {
            path: '/materialInOut',
            name: 'materialInOut',
            component: resolve => require(['./pages/materialInOut'],resolve),
            meta: {
                title: i18n.t('supplyReport.wuliaoReport'),
                requireAuth: true
            }
        },
        {
            path: '/materialConsumption',
            name: 'materialConsumption',
            component:resolve => require(['./pages/materialConsumption'],resolve),
            meta: {
                title: i18n.t('supplyReport.wuliaoxiaohao'),
                requireAuth: true
            }
        },
    

    ]
})