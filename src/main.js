import Vue from 'vue'
import App from './App.vue'

import router from './router/index'
import store from './store/index'
import axios from 'axios'
import Unicon from 'vue-unicons/dist/vue-unicons-vue2.umd'
import { uniPlusCircle } from 'vue-unicons/dist/icons'

Unicon.add([uniPlusCircle])
Vue.use(Unicon)

Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
