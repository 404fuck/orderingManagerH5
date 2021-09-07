import Vue from 'vue'
import index from './index.vue'
import router from './router'
import store from '../../store'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)
import {
  Popup,
  Picker,
  Swipe,
  SwipeItem,
  Lazyload,
  Stepper,
  Tag,
  PasswordInput,
  NumberKeyboard,
  Dialog,
  Toast,
  Actionsheet,
  Checkbox,
  Tab,
  Tabs
} from 'vant';

Vue.use(Popup)
  .use(Picker)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(Stepper)
  .use(Tag)
  .use(PasswordInput)
  .use(NumberKeyboard)
  .use(Dialog)
  .use(Toast)
  .use(Actionsheet)
  .use(Checkbox)
  .use(Tab)
  .use(Tabs)

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
  toast
} from '../../utils/toast'
Vue.prototype.toast = toast

import moment from 'moment/moment'
Vue.prototype.moment = moment
//日期
Vue.filter('YMD', function (value, formatString) {
  if (!value) {
    return i18n.t('orderDetail.select')
  }
  formatString = formatString || 'YYYYMMDD'
  return moment(value).format(formatString)
})

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