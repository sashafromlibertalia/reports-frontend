import Vue from 'vue'
import App from './App.vue'

import router from './router/index'
import store from './store/index'
import axios from 'axios'
import Unicon from 'vue-unicons/dist/vue-unicons-vue2.umd'
import { uniPlusCircle, uniTimesCircle, uniArrowLeft } from 'vue-unicons/dist/icons'
import { BootstrapVue } from 'bootstrap-vue'
import Toasted from 'vue-toasted';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Unicon.add([uniPlusCircle, uniTimesCircle, uniArrowLeft])

Vue.use(Unicon)
Vue.use(BootstrapVue)
Vue.use(Toasted)

Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
