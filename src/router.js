import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Profile from './views/Profile.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import ResetPassword from './views/ResetPassword.vue'
import ResetPasswordFind from './views/ResetPasswordFind.vue'
import Reset from './views/Reset.vue'
import Activate from './views/Activate.vue'
import ApplicantDataManager from './views/ApplicationForms/ApplicantDataManager.vue'
import ResidentialAddress from './views/ApplicationForms/ResidentialAddress.vue'
import HomeTownAddress from './views/ApplicationForms/HomeTownAddress.vue'
import NextOfKin from './views/ApplicationForms/NextOfKin.vue'
import Dependants from './views/ApplicationForms/Dependants.vue'
import Parents from './views/ApplicationForms/Parents.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/applicant-data-manager',
      name: 'applicant-data-manager',
      component: ApplicantDataManager
    },
    {
      path: '/residential-address',
      name: 'residential-address',
      component: ResidentialAddress
    },
    {
      path: '/home-town-address',
      name: 'home-town-address',
      component: HomeTownAddress
    },
    {
      path: '/next-of-kin',
      name: 'next-of-kin',
      component: NextOfKin
    },
    {
      path: '/dependants',
      name: 'dependants',
      component: Dependants
    },
    {
      path: '/parents',
      name: 'parents',
      component: Parents
    },
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/resetPassword',
      name: 'resetPassword',
      component: ResetPassword
    },
    {
      path: '/password/find/:id',
      name: 'resetPasswordFind',
      component: ResetPasswordFind
    },
    {
      path: '/auth/signup/activate/:id',
      name: 'activate',
      component: Activate
    },
    {
      path: '/reset/:id',
      name: 'reset',
      component: Reset
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: Profile
    }
  ]
})
