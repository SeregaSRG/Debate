import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/auth'
import Table from '@/components/table'

// import m from './middleware.js'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/table',
      name: 'Table',
      component: Table,
      children: [
        {
          path: ':league',
          name: 'league',
          component: Auth
        },
        {
          path: ':league/:round',
          name: 'league',
          component: Auth
        }
      ]
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    }
  ]
})
