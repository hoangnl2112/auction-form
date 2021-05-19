import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home";
import Transfer from "@/views/Transfer";
import Notifications from 'vue-notification'

Vue.use(Notifications)
Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/transfer',
      name: 'Transfer',
      component: Transfer
    }
  ]
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
