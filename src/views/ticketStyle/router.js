import Vue from 'vue'
import Router from 'vue-router'
// const TicketStyle = () => import("./pages/TicketStyle")
// import TicketStyle from './pages/TicketStyle'
import i18n from '../../utils/i18n'

if (!window.VueRouter) Vue.use(Router)


export default new Router({
  base: "/",
  routes: [{
    path: '/TicketStyle',
    name: 'TicketStyle',
    component: resolve => require(['./pages/TicketStyle'],resolve),
    meta: {
      title: i18n.t('help.xiaopiao'),
      requireAuth: true
    }
  }, ]
})