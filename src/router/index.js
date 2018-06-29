import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/auth'
import Tab from '@/components/tab'
import Judging from '@/components/judging'

// import m from './middleware.js'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Tab',
      component: Tab,
      children: [
        {
          path: ':league/:round',
          name: 'league'
        }
      ]
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/judging',
      name: 'Judging',
      component: Judging
    }
  ]
})
