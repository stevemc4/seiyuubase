import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import InfoPage from '@/pages/info'
import About from '@/pages/about'
import Changelog from '@/pages/changelog'

Vue.use(Router)

var router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        title: "A Site For Your Seiyuu Needs!"
      }
    },
    {
      path: '/info/:name',
      name: 'Info',
      component: InfoPage,
      meta: {
        title: "Loading..."
      }
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: {
        title: "About SeiyuuBase"
      }
    },
    {
      path: '/changelog',
      name: 'Changelog',
      component: Changelog,
      meta: {
        title: "Changelog"
      }
    }
  ]
})

router.beforeEach((from, to, next) => {
  document.title = from.meta.title + " - SeiyuuBase"
  next()
})

export default router