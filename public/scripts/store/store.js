import Vue from 'vue'
import Vuex from 'vuex'
import Resource from 'vue-resource'

Vue.use(Vuex)
Vue.use(Resource)

export default new Vuex.Store({
  state: {
    feed: []
  },
  getters: {
    feed(state) {
      return state.feed
    }
  },
  mutations: {
    updateFeed(state, feed) {
      state.feed = feed
    }
  },
  actions: {
    updateFeed({ commit }) {
      return new Promise((resolve) => {
        Vue.http.get('/api/feed')
          .then(response => {
            commit('updateFeed', response.body)
            resolve(response)
          })
      })
    }
  }
})
