import Vue from 'vue'
import Router from 'vue-router'
import i18n from '../../utils/i18n'

if (!window.VueRouter) Vue.use(Router)

export default new Router({
  base: "/",
  routes: [{
      path: '/Help',
      name: 'Help',
      component: ()=>import('./pages/Help'),
      meta: {
        title: i18n.t('help.helpCenter'),
        requireAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/QuestionList',
      name: 'QuestionList',
      component: ()=>import('./pages/QuestionList'),
      meta: {
        title: i18n.t('help.question'),
        requireAuth: true
      }
    },
    {
      path: '/QuestionDetail',
      name: 'QuestionDetail',
      component: ()=>import('./pages/QuestionDetail'),
      meta: {
        title: i18n.t('help.questionDetail'),
        requireAuth: true
      }
    }
  ]
})