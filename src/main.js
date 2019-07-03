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

Vue.filter('getAge', function(value) {
  if (value) {
    return moment(String(value)).fromNow()
  }
})

Vue.config.productionTip = false

const authData = localStorage.getItem("auth")
const authDataUser = localStorage.getItem("curuser")
const authDataAdm = localStorage.getItem("curuseradm")
const authDataRa = localStorage.getItem("curuserra")
const authDataHta = localStorage.getItem("curuserhta")
const authDataNok = localStorage.getItem("curusernok")
const authDataDep = localStorage.getItem("curuserdep")
const authDataParent = localStorage.getItem("curuserparent")
const authDataGuardian = localStorage.getItem("curuserguardian")
const authDataAe = localStorage.getItem("curuserae")
const authDataPe = localStorage.getItem("curuserpe")
const authDataPm = localStorage.getItem("curuserpm")

new Vue({
  router,
  data: {
    auth: authData ? JSON.parse(authData) : {},
    curuser: authDataUser ? JSON.parse(authDataUser) : {},
    curuseradm: authDataAdm ? JSON.parse(authDataAdm) : {},
    curuserra: authDataRa ? JSON.parse(authDataRa) : {},
    curuserhta: authDataHta ? JSON.parse(authDataHta) : {},
    curusernok: authDataNok ? JSON.parse(authDataNok) : {},
    curuserdep: authDataDep ? JSON.parse(authDataDep) : {},
    curuserparent: authDataParent ? JSON.parse(authDataParent) : {},
    curuserguardian: authDataGuardian ? JSON.parse(authDataGuardian) : {},
    curuserae: authDataAe ? JSON.parse(authDataAe) : {},
    curuserpe: authDataPe ? JSON.parse(authDataPe) : {},
    curuserpm: authDataPm ? JSON.parse(authDataPm) : {}
  },
  render: h => h(App)
}).$mount('#app')
