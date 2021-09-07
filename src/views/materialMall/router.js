import Vue from 'vue'
import Router from 'vue-router'
import i18n from '../../utils/i18n'

if (!window.VueRouter) Vue.use(Router)


export default new Router({
  base: "/",
  routes: [{
    path: '/MaterialMall',
    name: 'MaterialMall',
    component: resolve => require(['./pages/MaterialMall'],resolve),
    meta: {
      title: '物料商城',
      requireAuth: true
    }
  }, 
  {
    path: '/WaiterDown',
    name: 'WaiterDown',
    component: resolve => require(['./pages/WaiterDown'],resolve),
    meta: {
      title: '服务员App下载',
      requireAuth: true
    }
  },]
})