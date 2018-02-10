import Vue from 'vue'
import VueRouter from 'vue-router'
import iView from 'iview'
import App from './app.vue'
import routers from './router.js'
import 'iview/dist/styles/iview.css'

Vue.use(VueRouter)
Vue.use(iView)

const router = new VueRouter({
  mode: 'hash',
  routes: routers
})

const VueApp = new Vue({
  el: '#app',
  template: '<App/>',
  router,
  components: {
      App
  }
})

