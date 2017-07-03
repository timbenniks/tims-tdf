import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    count(state) {
      return state.count
    }
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    increment({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('increment')
          resolve()
        }, 1000)
      })
    }
  }
})
