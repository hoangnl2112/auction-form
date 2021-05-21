import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Notifications from 'vue-notification'
import PrivacyPolicy from "@/views/PrivacyPolicy";
import Transfer from "@/views/Transfer";

Vue.use(Notifications)
Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Transfer',
      component: Transfer
    },
    {
      path: '/privacy',
      name: 'Policy',
      component: PrivacyPolicy
    }
  ]
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
