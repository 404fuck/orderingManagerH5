import Vue from 'vue'
import Router from 'vue-router'
// const TicketStyle = () => import("./pages/TicketStyle")
// import TicketStyle from './pages/TicketStyle'
import i18n from '../../utils/i18n'

Vue.use(Router)


export default new Router({
  base: "/",
  routes: [
    {
    path: '/takeoutOrderlist',
    name: 'takeoutOrderlist',
    component: resolve => require(['./pages/takeoutOrderlist'],resolve),
    meta: {
      title:'外卖订单',
      requireAuth: true
    }
  }, 
  {
    path: '/takeoutSelect',
    name: 'takeoutSelect',
    component: resolve => require(['./pages/takeoutSelect'],resolve),
    meta: {
      title:'筛选条件',
      requireAuth: true
    }
  }, 
  {
    path: '/takeoutDetail',
    name: 'takeoutDetail',
    component: resolve => require(['./pages/takeoutDetail'],resolve),
    meta: {
      title:'订单详情',
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
]
})