// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import store from './store.js'
import FastClick from 'fastclick'
import {AlertPlugin, ToastPlugin} from 'vux'
Vue.config.productionTip = false
FastClick.attach(document.body)

Vue.use(Vuex)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: new Vuex.Store(store),
  components: { App },
  template: '<App/>'
})
