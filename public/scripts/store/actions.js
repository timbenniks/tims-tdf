export default {
  register({ commit }) {
    setTimeout(() => {
      commit('addToFeed')
    }, 1000)
  }
}
