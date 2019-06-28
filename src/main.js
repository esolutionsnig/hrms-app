import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import VueNoty from 'vuejs-noty'
import moment from 'moment'
import VueSlimScroll from 'vue-slimscroll'

import 'vuejs-noty/dist/vuejs-noty.css'

Vue.use(VueSlimScroll)

Vue.use(VueNoty, {
  timeout: 5000,
  theme: 'sunset',
  progressBar: true,
  layout: 'topRight'
})

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
})

Vue.config.productionTip = false

const authData = localStorage.getItem("auth")
const authDataUser = localStorage.getItem("curuser")

new Vue({
  router,
  data: {
    auth: authData ? JSON.parse(authData) : {},
    curuser: authDataUser ? JSON.parse(authDataUser) : {}
  },
  render: h => h(App)
}).$mount('#app')
