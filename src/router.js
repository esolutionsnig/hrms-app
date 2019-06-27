import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Projects from './views/Projects.vue'
import Team from './views/Team.vue'
import Profile from './views/Profile.vue'
import Accountsettings from './views/Accountsettings.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import ResetPassword from './views/ResetPassword.vue'
import ResetPasswordFind from './views/ResetPasswordFind.vue'
import Reset from './views/Reset.vue'
import Activate from './views/Activate.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
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
      path: '/projects',
      name: 'projects',
      component: Projects
    },
    {
      path: '/team',
      name: 'team',
      component: Team
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: Profile
    },
    {
      path: '/account-settings',
      name: 'account-seetings',
      component: Accountsettings
    }
  ]
})
