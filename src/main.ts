import Vue from 'vue'
import App from './App.vue'
import store from './store'
import 'bootstrap'; import 'bootstrap/dist/css/bootstrap.min.css';
import { IconsPlugin } from 'bootstrap-vue'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
