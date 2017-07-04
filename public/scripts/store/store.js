import Vue from 'vue'
import Vuex from 'vuex'
import Resource from 'vue-resource'

Vue.use(Vuex)
Vue.use(Resource)

export default new Vuex.Store({
  state: {
    feed: { data: {}, meta: {} },
    currentState: {}
  },
  getters: {
    feed(state) {
      return state.feed
    },
    currentState(state) {
      return state.currentState
    }
  },
  mutations: {
    updateFeed(state, feed) { state.feed = feed },
    updateCurrentState(state, currentState) { state.currentState = currentState }
  },
  actions: {
    updateFeed({ commit }) {
      Vue.http.get('/api/feed')
      .then(response => {
        if (!response.body.error) {
          commit('updateFeed', response.body)
        }
      }, response => console.error(response))
    },
    updateCurrentState({ commit }) {
      Vue.http.get('/api/state')
      .then(response => {
        commit('updateCurrentState', response.body)
      }, response => console.error(response))
    }
  }
})
