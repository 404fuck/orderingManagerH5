import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import getters from './getters'
Vue.use(Vuex)

import {
  Popup
} from 'vant';
Vue.use(Popup);

const store = new Vuex.Store({
  modules: {
    app,
  },
  getters
})

export default store