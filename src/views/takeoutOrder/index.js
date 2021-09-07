import Vue from 'vue'
import index from './index.vue'
import router from './router'
import store from '../../store'
import {
  Select,
  Input,
  Option,
  MessageBox,
  Message,
  Pagination
} from 'element-ui'

Vue.use(Select)
Vue.use(Input)
Vue.use(Option)
Vue.use(Pagination)

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
  Actionsheet
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
  el: '#app',
  render: h => h(index)
}).$mount('#app')