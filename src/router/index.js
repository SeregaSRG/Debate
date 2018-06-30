import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/auth'
import Tab from '@/components/tab'
import Judging from '@/components/judging'
import Admin from '@/components/admin'
import Speakers from '@/components/speakers'
import Teams from '@/components/teams'
import Judges from '@/components/judges'
import Generator from '@/components/tabGenerator'

import m from './middleware.js'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/admin',
      name: 'Admin',
      beforeEnter: m.auth,
      component: Admin,
      children: [
        {
          path: 'speakers',
          name: 'Speakers',
          beforeEnter: m.auth,
          component: Speakers
        },
        {
          path: 'teams',
          name: 'Teams',
          beforeEnter: m.auth,
          component: Teams
        },
        {
          path: 'judges',
          name: 'Judges',
          beforeEnter: m.auth,
          component: Judges
        },
        {
          path: 'tabs',
          name: 'Tabs',
          beforeEnter: m.auth,
          component: Generator,
          children: [
            {
              path: ':league/:round'
            }
          ]
        }
      ]
    },
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
      beforeEnter: m.auth,
      component: Judging
    }
  ]
})
