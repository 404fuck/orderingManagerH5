import Vue from 'vue'
import index from './index.vue'
import router from './router'
import store from '../../store'
import VueLazyload from 'vue-lazyload'
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
  DatePicker,
  Tree,
  MessageBox,
  Message,
  Pagination
} from 'element-ui'

Vue.use(Dialog);
Vue.use(Drawer);
Vue.use(Select)
Vue.use(Input)
Vue.use(Option);
Vue.use(DatePicker);
Vue.use(Tree);

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

import moment from 'moment/moment'
Vue.prototype.moment = moment
//日期
Vue.filter('DMY', function (value, formatString) {
  if (!value) {
    i18n.t('orderDetail.select')
  }
  formatString = formatString || 'DD/MM/YYYY'
  return moment(value).format(formatString)
})

//价格
Vue.filter('price', function (value) {
  if (!value) {
    return '0.00'
  }
  value = value= Number(value).toFixed(3);//保留两位小数 四舍五入
  return value;
})
//数量
Vue.filter('count', function (value) {
  if (!value) {
    return '0.0'
  }
  //如果小数位大于3就保留三位小数，其他按照原数据展示
  let localNum = value.toString().indexOf(".") + 1;//获取小数点的位置
  let countNum = value.toString().length - localNum;//获取小数点后的个数
 
  if(localNum > 0) {
     if(countNum>3){
        value= Number(value).toFixed(3);//保留三位小数 四舍五入
     }else{
        value= value;
     }
  } else {
      value=Number(value);
  }
  return value;
})

// 损益数量判断值的正负值
Vue.filter('addSubCount', function (value) {
  if (!value) {
    return '0'
  }
  //如果小数位大于3就保留三位小数，其他按照原数据展示
  let localNum = value.toString().indexOf(".") + 1;//获取小数点的位置
  let countNum = value.toString().length - localNum;//获取小数点后的个数
  
  let numValue = Number(value);
  let numToFixed = Number(value).toFixed(3);//保留三位小数 四舍五入

  if(localNum > 0) {
     if(countNum>3){
         value = siteNum(numToFixed);
     }else{
        value = siteNum(value);
     }
  } else {
      value = siteNum(numValue);
  }
  function siteNum(value) {
    let num = Number(value);
    if (num>0) {
      value="+"+value;
    } else if(num=0){
      value="0";
    }else{
      value=value;
    }
    return value;
  }

  return value;
})
// 损益价格判断值的正负值
Vue.filter('addSubPrice', function (value) {
  if (!value) {
    return '0.00'
  }
  let num = Number(value);
  if (num>0) {
    value="+"+Number(value).toFixed(2);
  } else if(num=0){
    value="0.00";
  }else{
    value=Number(value).toFixed(2);
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
  Checkbox,
} from 'vant';

Vue.use(Button)
  .use(Icon)
  .use(Checkbox)
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