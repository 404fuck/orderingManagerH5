import {
    Locale
} from 'vant';
import store from '../store'
import enUS from 'vant/lib/locale/lang/en-US';
import zhCN from 'vant/lib/locale/lang/zh-CN';

export function Local() {
    var lang = store.getters.language
    console.log(lang)
    if (lang == "zh_CN") {
        Locale.use('zh-CN', zhCN)
    } else {
        Locale.use('en-US', enUS)
    }
}