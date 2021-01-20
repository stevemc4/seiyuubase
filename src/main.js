// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import analytics from 'vue-analytics'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(analytics, {
  id: 'UA-125118012-2',
  router,
  debug: {
    sendHitTask: process.env.NODE_ENV === 'production'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
