
import Vue from 'vue'
import Router from 'vue-router'
import i18n from '../../utils/i18n'

if (!window.VueRouter) Vue.use(Router)


export default new Router({
  base: "/",
  routes: [{
    path: '/privacyPolicy',
    name: 'privacyPolicy',
    component: resolve => require(['./pages/privacyPolicy'],resolve),
    meta: {
      title: i18n.t('privacyPolicy'),
      requireAuth: true
    }
  }, ]
})