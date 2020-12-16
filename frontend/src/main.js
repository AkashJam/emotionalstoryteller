import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import './style/variables.css'


new Vue({
  render: h => h(App),
}).$mount('#app')
