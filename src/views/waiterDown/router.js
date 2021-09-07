import Vue from 'vue'
import Router from 'vue-router'
import i18n from '../../utils/i18n'
if (!window.VueRouter) Vue.use(Router)

export default new Router({
  base: "/",
  routes: [{
    path: '/WaiterDown',
    name: 'WaiterDown',
    component: resolve => require(['./pages/WaiterDown'],resolve),
    meta: {
      title: i18n.t('help.fuwuyuanDown'),
      requireAuth: true
    }
  }, ]
})