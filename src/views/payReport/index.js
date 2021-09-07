import Vue from 'vue'
import index from './index.vue'
import router from './router'
import store from '../../store'
import i18n from '../../utils/i18n'

import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import locale from 'element-ui/lib/locale'


import { Locale } from 'vant';
import enUS from 'vant/es/locale/lang/en-US'
import zhCN from 'vant/lib/locale/lang/zh-CN'
// 设置语言
if(store.getters.language=='zh_CN'){
    moment.locale("zh-CN");
    locale.use(zhLocale)
    Locale.use('zhCN', zhCN)
}else{
    moment.locale("en-US");
    locale.use(enLocale)
    Locale.use('en-US', enUS)
}


import {
  Dialog,
  Drawer,
  Select,
  Input,
  Option,
  Checkbox,
  MessageBox,
  Message,
  Pagination,
} from 'element-ui'

Vue.use(Dialog);
Vue.use(Drawer);
Vue.use(Select)
Vue.use(Input)
Vue.use(Option);
Vue.use(Checkbox);

// 分页引入组件 
Vue.component(Pagination.name, Pagination)





Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = Vue.prototype.$msgbox.alert
Vue.prototype.$confirm = Vue.prototype.$msgbox.confirm
Vue.prototype.$prompt = Vue.prototype.$msgbox.prompt
Vue.prototype.$message = Message

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
Vue.prototype.$echarts = echarts

import moment from 'moment/moment'
Vue.prototype.moment = moment
//日期
Vue.filter('DMY', function (value, formatString) {
  if (!value) {
    return ''
  }
  formatString = formatString || 'DD/MM/YYYY'
  return moment(value).format(formatString)
})
Vue.filter('moment_ss', function (value, formatString) {
  if (!value) {
    return ''
  }
  formatString = formatString || 'DD/MM/YYYY   HH:mm:ss'
  return moment(value).format(formatString)
})
Vue.filter('moment', function (value, formatString) {
  if (!value) {
    return ''
  }
  formatString = formatString || 'DD/MM/YYYY   HH:mm'
  return moment(value).format(formatString)
})
Vue.filter('DM', function (value, formatString) {
  if (!value) {
    return ''
  }
  formatString = formatString || 'DD/MM'
  return moment(value).format(formatString)
})

Vue.filter('YMD', function (value, formatString) {
  if (!value) {
    return i18n.t('orderDetail.select')
  }
  formatString = formatString || 'YYYY-MM-DD'
  return moment(value).format(formatString)
})
//价格
Vue.filter('price', function (value) {
  if (!value) {
    return '0.00'
  }
  value = Math.round(parseFloat(value) * 100) / 100;
  var xsd = value.toString().split(".");
  if (xsd.length == 1) {
    value = value.toString() + ".00";
    return value;
  }
  if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      value = value.toString() + "0";
    }
    return value;
  }
  return value;
})
//字段
Vue.filter('text', function (value) {
  if (!value) {
    return '-'
  }
  return value;
})
import {
  Button,
  Icon,
  DatetimePicker
} from 'vant';

Vue.use(Button)
  .use(Icon)
  .use(DatetimePicker)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

// Internationalization


new Vue({
  router,
  store,
  i18n,
  el: '#app',
  render: h => h(index)
}).$mount('#app')