import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    url: 'http://127.0.0.1:3000/',
    islogin: false,
    userInfo:{},
    manage:[],
    data: null,
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
