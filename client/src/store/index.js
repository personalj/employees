import Vue from 'vue'
import Vuex from 'vuex'
import employees from './modules/employees'
import authentication from './modules/authentication'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    employees,
    authentication
  }
})
