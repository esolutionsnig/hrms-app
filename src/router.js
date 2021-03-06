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
import Guardian from './views/ApplicationForms/Guardian.vue'
import AcademicQualification from './views/ApplicationForms/AcademicQualification.vue'
import ProfessionalQualification from './views/ApplicationForms/ProfessionalQualification.vue'
import ProfessionalMembership from './views/ApplicationForms/ProfessionalMembership.vue'
import SchoolLeavingCertificate from './views/ApplicationForms/SchoolLeavingCertificate.vue'
import EmploymentHistory from './views/ApplicationForms/EmploymentHistory.vue'
import NationalYouthServiceCorps from './views/ApplicationForms/NationalYouthServiceCorps.vue'
import General from './views/ApplicationForms/General.vue'
import Hobbies from './views/ApplicationForms/Hobbies.vue'
import SocialMembership from './views/ApplicationForms/SocialMembership.vue'
import Sport from './views/ApplicationForms/Sport.vue'
import BankingDetail from './views/ApplicationForms/BankingDetail.vue'
import SelfDisclosure from './views/ApplicationForms/SelfDisclosure.vue'
import Referees from './views/ApplicationForms/Referees.vue'
import EmploymentSelfAssessment from './views/ApplicationForms/EmploymentSelfAssessment.vue'

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
      path: '/guardian',
      name: 'guardian',
      component: Guardian
    },
    {
      path: '/academic-qualification',
      name: 'academic-qualification',
      component: AcademicQualification
    },
    {
      path: '/professional-qualification',
      name: 'professional-qualification',
      component: ProfessionalQualification
    },
    {
      path: '/professional-membership',
      name: 'professional-membership',
      component: ProfessionalMembership
    },
    {
      path: '/school-leaving-certificate',
      name: 'school-leaving-certificate',
      component: SchoolLeavingCertificate
    },
    {
      path: '/employment-history',
      name: 'employment-history',
      component: EmploymentHistory
    },
    {
      path: '/national-youth-service-corps',
      name: 'national-youth-service-corps',
      component: NationalYouthServiceCorps
    },
    {
      path: '/general',
      name: 'general',
      component: General
    },
    {
      path: '/hobbies',
      name: 'hobbies',
      component: Hobbies
    },
    {
      path: '/social-membership',
      name: 'social-membership',
      component: SocialMembership
    },
    {
      path: '/sport',
      name: 'sport',
      component: Sport
    },
    {
      path: '/banking-details',
      name: 'banking-details',
      component: BankingDetail
    },
    {
      path: '/self-disclosure',
      name: 'self-disclosure',
      component: SelfDisclosure
    },
    {
      path: '/referees',
      name: 'referees',
      component: Referees
    },
    {
      path: '/employment-self-assessment',
      name: 'employment-self-assessment',
      component: EmploymentSelfAssessment
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
