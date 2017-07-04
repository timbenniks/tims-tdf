import Vue from 'vue'
import App from './App.vue'
import store from './store/store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#main',
  store,
  template: '<App/>',
  components: { App }
})
