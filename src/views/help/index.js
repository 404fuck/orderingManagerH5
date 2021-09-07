
import Vue from 'vue'
import index from './index.vue'
import router from './router'
import store from '../../store'

//http请求
import {
  request
} from './config/http'
Vue.prototype.request = request 
//字符工具类
import {
  stringutils
} from '../../utils/stringutils'
Vue.prototype.stringutils = stringutils
import {
  baseUrl
} from '../../utils/baseUrl'
Vue.prototype.baseUrl = baseUrl
import {
  toast
} from '../../utils/toast'
Vue.prototype.toast = toast

import {
  Button,
  Icon,
  Tab,
  Tabs,
  Popup,
} from 'vant';

Vue.use(Button)
  .use(Icon)
  .use(Tab)
  .use(Tabs)
  .use(Popup)
 
Vue.config.productionTip = false

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
  render: h => h(index)
}).$mount('#app')