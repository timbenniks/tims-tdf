import Vue from 'vue'
import Vuex from 'vuex'
import Resource from 'vue-resource'

Vue.use(Vuex)
Vue.use(Resource)

export default new Vuex.Store({
  state: {
    state: {},
    feed: [],
    weather: {}
  },
  getters: {
    state(state) {
      return state.state
    },
    weather(state) {
      return state.weather
    },
    feed(state) {
      return state.feed
    }
  },
  mutations: {
    updateCombined(state, data) {
      for (const api in data) {
        if ({}.hasOwnProperty.call(data, api)) {
          state[api] = data[api]
        }
      }
    }
  },
  actions: {
    updateCombined({ commit }, apis) {
      Vue.http.get(`/api/combined?apis=${apis}`)
        .then(response => {
          if (!response.body.error) {
            commit('updateCombined', response.body)
          }
        }, response => console.error(response))
    }
  }
})
