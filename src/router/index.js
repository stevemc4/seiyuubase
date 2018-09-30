import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import InfoPage from '@/pages/info'
import About from '@/pages/about'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/info/:name',
      name: 'Info',
      component: InfoPage
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
