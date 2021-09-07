import Vue from 'vue'
import Router from 'vue-router'
import i18n from '../../utils/i18n'

if (!window.VueRouter) Vue.use(Router)

export default new Router({
  base: "/",
  routes: [{
      path: '/Report',
      name: 'Report',
      component: ()=>import('./pages/Report'),
      meta: {
        title: i18n.t('report.jingying'),
        requireAuth: true
      }
    },
    {
      path: '/SetorderDetail',
      name: 'SetorderDetail',
      component: ()=>import('./pages/SetorderDetail'),
      meta: {
        title: i18n.t('report.orderDetail'),
        requireAuth: true
      }
    },
    {
      path: '/Refund',
      name: 'Refund',
      component: ()=>import('./pages/Refund'),
      meta: {
        title: i18n.t('payreport.refund'),
        requireAuth: true
      }
    },
    {
      path: '/StoreContrast',
      name: 'StoreContrast',
      component: ()=>import('./pages/StoreContrast'),
      meta: {
        title: i18n.t('report.mendianduibi'),
        requireAuth: true
      }
    },
    {
      path: '/PayReport',
      name: 'PayReport',
      component: ()=>import('./pages/PayReport'),
      meta: {
        title: i18n.t('report.zhifufenxi'),
        requireAuth: true
      }
    },
    {
      path: '/TimeReport',
      name: 'TimeReport',
      component: ()=>import('./pages/TimeReport'),
      meta: {
        title:  i18n.t('report.shiduanfenxi'),
        requireAuth: true
      }
    },
    {
      path: '/OrderList',
      name: 'OrderList',
      component: ()=>import('./pages/OrderList'),
      meta: {
        title: i18n.t('report.orderDetail'),
        requireAuth: true
      }
    },
    {
      path: '/SalesReport',
      name: 'SalesReport',
      component: ()=>import('./pages/SalesReport'),
      meta: {
        title: i18n.t('report.salesReport'),
        requireAuth: true
      }
    },
    {
      path: '/SealReport',
      name: 'SealReport',
      component: ()=>import('./pages/SealReport'),
      meta: {
        title: i18n.t('report.SealReport'),
        requireAuth: true
      }
    },
    {
      path: '/takeoutRefund',
      name: 'takeoutRefund',
      component: resolve => require(['./pages/takeoutRefund'],resolve),
      meta: {
        title:'退款详情',
        requireAuth: true
      }
    }, 
    {
      path: '/RefundReport',
      name: 'RefundReport',
      component: ()=>import('./pages/RefundReport'),
      meta: {
        title: i18n.t('report.refundReport'),
        requireAuth: true
      }
    },
    {
      path: '/memberReport',
      name: 'memberReport',
      component: ()=>import('./pages/memberReport'),
      meta: {
        title: i18n.t('report.memberReport'),
        requireAuth: true
      }
    },
    {
      path: '/feedingReport',
      name: 'feedingReport',
      component: ()=>import('./pages/feedingReport'),
      meta: {
        title:  i18n.t('report.addOnReport'),
        requireAuth: true
      }
    },
    {
      path: '/tasteReport',
      name: 'tasteReport',
      component: ()=>import('./pages/tasteReport'),
      meta: {
        title: i18n.t('report.tasteReport'),
        requireAuth: true
      }
    },
    {
      path: '/promotionReport',
      name: 'promotionReport',
      component: ()=>import('./pages/promotionReport'),
      meta: {
        title: i18n.t('report.promotionReport'),
        requireAuth: true
      }
    },
    {
      path: '/dishProDetail',
      name: 'dishProDetail',
      component: ()=>import('./pages/dishProDetail'),
      meta: {
        title: '',
        requireAuth: true
      }
    },
    {
      path: '/productReport',
      name: 'productReport',
      component: ()=>import('./pages/productReport'),
      meta: {
        title: i18n.t('report.productReport'),
        requireAuth: true
      }
    },
  ]
})