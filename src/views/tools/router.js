import Vue from 'vue'
import Router from 'vue-router'
import i18n from '../../utils/i18n'

if (!window.VueRouter) Vue.use(Router)


export default new Router({
  base: "/",
  routes: [{
    path: '/tools',
    name: 'tools',
    component: resolve => require(['./pages/tools'],resolve),
    meta: {
      title: '数据同步小工具',
      requireAuth: true
    }
  }, 
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['./pages/login'],resolve),
    meta: {
      title: '数据同步小工具',
      requireAuth: true
    }
  },
  {
    path: '/importStart',
    name: 'importStart',
    component: resolve => require(['./pages/importStart'],resolve),
    meta: {
      title: '数据同步小工具',
      requireAuth: true
    }
  },
  {
    path: '/importSuccess',
    name: 'importSuccess',
    component: resolve => require(['./pages/importSuccess'],resolve),
    meta: {
      title: '导入成功',
      requireAuth: true
    }
  },
  {
    path: '/importFail',
    name: 'importFail',
    component: resolve => require(['./pages/importFail'],resolve),
    meta: {
      title: '导入失败',
      requireAuth: true
    }
  },]
})