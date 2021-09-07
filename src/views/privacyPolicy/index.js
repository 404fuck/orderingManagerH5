
import Vue from 'vue'
import index from './index.vue'
import store from '../../store'
import router from './router'

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

// Internationalization
import i18n from '../../utils/i18n'

new Vue({
  router,
  store,
  i18n,
  el: '#app',
  render: h => h(index)
}).$mount('#app')