import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import VueNoty from 'vuejs-noty'

import 'vuejs-noty/dist/vuejs-noty.css'

Vue.use(VueNoty, {
  timeout: 5000,
  theme: 'sunset',
  progressBar: true,
  layout: 'topRight'
})

Vue.config.productionTip = false

const authData = localStorage.getItem("auth")

new Vue({
  router,
  data: {
    auth: authData ? JSON.parse(authData) : {}
  },
  render: h => h(App)
}).$mount('#app')
