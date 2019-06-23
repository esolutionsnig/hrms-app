import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#af0000',
    secondary: '#424242',
    accent: '#E53935',
    error: '#E53935',
    info: '#00E5FF',
    success: '#009688',
    warning: '#FFC107'
  }
})
