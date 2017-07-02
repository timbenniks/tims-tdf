export default {
  addToFeed(state) {
    const item = {
      food: 'bar'
    }
    state.feed.push(item)
  }
}
