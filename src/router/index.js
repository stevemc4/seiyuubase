import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/index'
import Compare from '@/pages/compare'
import NotFound from '@/pages/NotFound'

const InfoPage = () => import('@/pages/info')
const MarkdownRenderer = () => import('@/pages/markdownRenderer')

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
      component: MarkdownRenderer,
      meta: {
        title: "About SeiyuuBase",
        fileToRender: 'README'
      }
    },
    {
      path: '/changelog',
      name: 'Changelog',
      component: MarkdownRenderer,
      meta: {
        title: "Changelog",
        fileToRender: 'CHANGELOG'
      }
    },
    {
      path: '/compare',
      name: 'Compare',
      component: Compare,
      meta: {
        title: "VA Comparison"
      }
    },
    {
      path: '*',
      redirect: '/404'
    },
    {
      path: '/404',
      name: 'NotFound',
      component: NotFound,
      meta: {
        title: "Four-Oh-Four, Not Found"
      }
    }
  ]
})

router.beforeEach((from, to, next) => {
  document.title = from.meta.title + " - SeiyuuBase"
  next()
})

export default router