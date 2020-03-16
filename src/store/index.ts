import Vue from "vue";
import Vuex from "vuex";

import user from './modules/user'

Vue.use(Vuex)
const initPageState = () => {
  return {

  }
}

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    user
  },
  state: initPageState(),
  mutations: {

  },
  actions: {}
})

export default store;