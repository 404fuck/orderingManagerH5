import Vue from 'vue'
import store from '../store'
import VueI18n from 'vue-i18n'
import zh from '../assets/i18n/zh'
import en from '../assets/i18n/en'
import ms from '../assets/i18n/ms'
Vue.use(VueI18n)

// 以下为语言包单独设置的场景，单独设置时语言包需单独引入
const messages = {
    'zh_CN': zh, // 中文语言包
    'en_US': en, // 英文语言包
    'ms_MY': ms // 马来文语言包
}

// 最后 export default，这一步肯定要写的。
export default new VueI18n({
    locale: store.getters.language || 'en_US', // set locale 默认显示英文
    messages: messages // set locale messages
})