import Vue from 'vue'
import Router from 'vue-router'

// Vue.use(Router)
if (!window.VueRouter) Vue.use(Router)

export default new Router({
  base: "/",
  routes: [{
      path: '/Download',
      name: 'Download',
      component: ()=>import('./pages/Download'),
      meta: {
        title: '下载',
        requireAuth: true
      }
    },
  ]
})