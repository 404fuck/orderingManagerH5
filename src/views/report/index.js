import Vue from 'vue'
import index from './index.vue'
import router from './router'
import VueLazyload from 'vue-lazyload'
import i18n from '../../utils/i18n'
import store from '../../store'

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
  Select,
  Input,
  Option,
  MessageBox,
  Message,
  Pagination,
  Checkbox,
  Dropdown,
  DropdownMenu,
  Popover,
  DropdownItem,
  DatePicker
} from 'element-ui'

Vue.use(Select)
Vue.use(Input)
Vue.use(Option)
Vue.use(Checkbox)
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Popover);
Vue.use(DatePicker)

// 分页引入组件 
Vue.component(Pagination.name, Pagination)

Vue.use(VueLazyload);
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
Vue.filter('YMD', function (value, formatString) {
  if (!value) {
    return i18n.t('orderDetail.select')
  }
  formatString = formatString || 'YYYYMMDD'
  return moment(value).format(formatString)
})
// 找零取反
Vue.filter('ReversePrice', function (value) {
	if (!value) {
		return '0.00'
	}
	let num = Number(value);
	if (num > 0) {
		value = value="-" + Number(value).toFixed(2);
	} else if (num <0) {
		value = value="+" + Math.abs(Number(value).toFixed(2));
	} else {
		value =  value= Number(value).toFixed(2)
  }
	return value;
})
Vue.filter('momentSS', function (value, formatString) {
  if (!value) {
    return ''
  }
  formatString = formatString || 'YYYY-MM-DD'
  return moment(value).format(formatString)
})

Vue.filter('ddMoment', function (value, formatString) {
  if (!value) {
    return ''
  }
  formatString = formatString || 'DD/MM/YYYY'
  return moment(value).format(formatString)
})
//价格
Vue.filter('price', function (value) {
  if (!value) {
    return '0.00'
  }
  value = value= Number(value).toFixed(2);//保留两位小数 四舍五入
  return value;
})
//价格（1位）
Vue.filter('onePrice', function (value) {
  if (!value) {
    return '0.0'
  }
  value = value= Number(value).toFixed(1);//保留1位小数 四舍五入
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
  Cell,
  Tabbar,
  NavBar,
  TabbarItem,
  Swipe,
  SwipeItem,
  Lazyload,
  PullRefresh,
  List,
  NoticeBar,
  Card,
  Collapse,
  CollapseItem,
  Field,
  CellGroup,
  Notify,
  AddressEdit,
  Icon,
  AddressList,
  Tab,
  Tabs,
  Popup,
  DatetimePicker,
  Actionsheet,
  Dialog
} from 'vant';

Vue.use(Button)
  .use(Cell)
  .use(Tabbar)
  .use(NavBar)
  .use(TabbarItem)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(PullRefresh)
  .use(List)
  .use(NoticeBar)
  .use(Card)
  .use(Collapse)
  .use(CollapseItem)
  .use(Field)
  .use(CellGroup)
  .use(Notify)
  .use(Icon)
  .use(AddressList)
  .use(AddressEdit)
  .use(Tab)
  .use(Tabs)
  .use(Popup)
  .use(DatetimePicker)
  .use(Actionsheet)
  .use(Dialog)
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
  i18n,
  store,
  el: '#app',
  render: h => h(index)
}).$mount('#app')