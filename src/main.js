import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import "./mock"
import store from "./store"
store.dispatch("setting/fetchSetting");
Vue.config.productionTip = false

import "@/styles/global.less"

import showMessage from "@/utils/showMessage";
Vue.prototype.$showMessage = showMessage

import "./directives"
import "./eventBus.js"

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')