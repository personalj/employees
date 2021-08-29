import Vue from 'vue'
import VueToast from 'vue-toast-notification'
import router from "../../router/index.js"
import { apiLink }  from "@/config.js"
import makeRequest from "@/services/makeRequest"

Vue.use(VueToast)

export default ({
  state: {
   token: localStorage.getItem('access_token') || null
  },
  getters: {
    loggedIn(state) {
      return state.token !== null
    }
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token
    },
    destroyToken(state) {
      state.token = null
    }
  },
  actions: {
    register(context, data) {
      makeRequest({
        url: apiLink+'users/register',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: false
        },
        data: JSON.stringify(data)
      })
      .then(() => {
       router.push("/login?message=success-register")
      })
      .catch((e) => {
        Vue.$toast.error(e.response.data)
      })
    },
    logIn(context, data) {
      makeRequest({
        url: apiLink+'users/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: false
        },
        data: JSON.stringify(data)
      })
      .then((res) => {
       const token = res.data
       localStorage.setItem('access_token', token)
       context.commit('retrieveToken', token)
       router.push("/")
      })
      .catch((e) => {
        Vue.$toast.error(e.response.data)
      })
    },
    destroyToken(context) {
      if(context.getters.loggedIn) {
          localStorage.removeItem('access_token')
          context.commit('destroyToken')
          router.push("/login?message=logout")
      }
    }
  }
});
