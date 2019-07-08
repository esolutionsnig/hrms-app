import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import VueNoty from 'vuejs-noty'
import moment from 'moment'
import VueSlimScroll from 'vue-slimscroll'
import CKEditor from '@ckeditor/ckeditor5-vue';

import 'vuejs-noty/dist/vuejs-noty.css'

Vue.use(VueSlimScroll)

Vue.use( CKEditor );

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
const authDataSlc = localStorage.getItem("curuserslc")
const authDataEh = localStorage.getItem("curusereh")
const authDataNysc = localStorage.getItem("curusernysc")
const authDataGen = localStorage.getItem("curusergen")
const authDataHob = localStorage.getItem("curuserhob")
const authDataSm = localStorage.getItem("curusersm")
const authDataSp = localStorage.getItem("curusersp")
const authDataBd = localStorage.getItem("curuserbd")
const authDataSd = localStorage.getItem("curusersd")
const authDataSdQt1 = localStorage.getItem("qt1")
const authDataSdQt2 = localStorage.getItem("qt2")
const authDataSdQt3 = localStorage.getItem("qt3")
const authDataSdQt4 = localStorage.getItem("qt4")
const authDataSdQt5 = localStorage.getItem("qt5")
const authDataSdQt6 = localStorage.getItem("qt6")
const authDataSdQt7 = localStorage.getItem("qt7")
const authDataSdQt8 = localStorage.getItem("qt8")
const authDataSdQt9 = localStorage.getItem("qt9")
const authDataSdQt10 = localStorage.getItem("qt10")
const authDataSdQt11 = localStorage.getItem("qt11")
const authDataRef = localStorage.getItem("curuserref")
const authDataEsa = localStorage.getItem("curuseresa")

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
    curuserpm: authDataPm ? JSON.parse(authDataPm) : {},
    curuserslc: authDataSlc ? JSON.parse(authDataSlc) : {},
    curusereh: authDataEh ? JSON.parse(authDataEh) : {},
    curusernysc: authDataNysc ? JSON.parse(authDataNysc) : {},
    curusergen: authDataGen ? JSON.parse(authDataGen) : {},
    curuserhob: authDataHob ? JSON.parse(authDataHob) : {},
    curusersm: authDataSm ? JSON.parse(authDataSm) : {},
    curusersp: authDataSp ? JSON.parse(authDataSp) : {},
    curuserbd: authDataBd ? JSON.parse(authDataBd) : {},
    curusersd: authDataSd ? JSON.parse(authDataSd) : {},
    qt1: authDataSdQt1 ? authDataSdQt1 : {},
    qt2: authDataSdQt2 ? authDataSdQt2 : {},
    qt3: authDataSdQt3 ? authDataSdQt3 : {},
    qt4: authDataSdQt4 ? authDataSdQt4 : {},
    qt5: authDataSdQt5 ? authDataSdQt5 : {},
    qt6: authDataSdQt6 ? authDataSdQt6 : {},
    qt7: authDataSdQt7 ? authDataSdQt7 : {},
    qt8: authDataSdQt8 ? authDataSdQt8 : {},
    qt9: authDataSdQt9 ? authDataSdQt9 : {},
    qt10: authDataSdQt10 ? authDataSdQt10 : {},
    qt11: authDataSdQt11 ? authDataSdQt11 : {},
    curuserref: authDataRef ? JSON.parse(authDataRef) : {},
    curuseresa: authDataEsa ? JSON.parse(authDataEsa) : {},
  },
  render: h => h(App)
}).$mount('#app')
