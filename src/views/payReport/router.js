import Vue from 'vue'
import Router from 'vue-router'
import i18n from '../../utils/i18n'

if (!window.VueRouter) Vue.use(Router)

export default new Router({
    base: "/",
    routes: [{
            path: '/recordCenter',
            name: 'recordCenter',
            component: ()=>import('./pages/recordCenter'),
            meta: {
                title: i18n.t('payreport.duizhangCenter'),
                requireAuth: true
            }
        },
        {
            path: '/settleRecord',
            name: 'settleRecord',
            component: ()=>import('./pages/settleRecord'),
            meta: {
                title:  i18n.t('payreport.jiesuan'),
                requireAuth: true
            }
        },


    ]
})