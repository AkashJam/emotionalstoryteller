import Vue from 'vue'
import App from './App.vue'
import store from './router/store'

Vue.config.productionTip = false

import './style/variables.css'
import router from './router'
import './registerServiceWorker'


new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')
