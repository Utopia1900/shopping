// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import store from './store.js'
import VueCookie from 'vue-cookie'
import FastClick from 'fastclick'
import {AlertPlugin, ToastPlugin, ConfirmPlugin} from 'vux'
import './style/index.less'
Vue.config.productionTip = false
FastClick.attach(document.body)

Vue.use(Vuex)
Vue.use(VueCookie)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: new Vuex.Store(store),
  components: { App },
  template: '<App/>'
})
