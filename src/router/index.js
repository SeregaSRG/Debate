import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/Auth'

// import m from './middleware.js'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Auth',
      component: Auth
    }
  ]
})
