// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import store from './store.js'
import FastClick from 'fastclick'

Vue.config.productionTip = false
FastClick.attach(document.body)


// const history = window.sessionStorage
// history.clear()
// let historyCount = history.getItem('count') * 1 || 0
// history.setItem('/', 0)
//
// router.beforeEach(function(to, from ,next) {
//   next()
// })
//
// router.afterEach(function (to) {
//
// })


Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: new Vuex.Store(store),
  components: { App },
  template: '<App/>'
})
