import '@mdi/font/css/materialdesignicons.css'
import 'vue-toast-notification/dist/theme-sugar.css'
import 'vuetify/dist/vuetify.min.css'
import '@/assets/main.scss'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueToast from 'vue-toast-notification'
import vClickOutside from 'v-click-outside'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
Vue.use(VueToast)
Vue.use(vClickOutside)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        path: '/login?message=login',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  render: h => h(App)
}).$mount('#app')
