import Vue from 'vue'
import Vuex from 'vuex'
import Resource from 'vue-resource'

Vue.use(Vuex)
Vue.use(Resource)

export default new Vuex.Store({
  state: {
    state: {},
    feed: {
      count: 0,
      items: []
    },
    weather: {},
    groups: {}
  },
  getters: {
    state(state) {
      return state.state
    },
    weather(state) {
      return state.weather
    },
    feed(state) {
      return {
        count: state.feed.count,
        items: state.feed.items.slice(0, 5)
      }
    },
    groups(state) {
      return state.groups
    }
  },
  mutations: {
    updateCombined(state, data) {
      for (const api in data) {
        if ({}.hasOwnProperty.call(data, api)) {
          state[api] = data[api]
        }
      }
    },
    updateGroups(state, data) {
      state.groups = data
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
    },
    updateGroups({ commit }) {
      Vue.http.get('/api/groups')
        .then(response => {
          if (!response.body.error) {
            commit('updateGroups', response.body)
          }
        }, response => console.error(response))
    }
  }
})
