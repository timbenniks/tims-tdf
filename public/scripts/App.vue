<template>
  <feed></feed>
</template>

<script>
import Feed from './components/feed.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  components: { Feed },
  methods: mapActions(['updateFeed','updateCurrentState']),
  mounted(){
    this.updateFeed()
    this.updateCurrentState()
    setInterval(()=>{
      this.updateFeed()
      this.updateCurrentState()
    }, 10000)
  }
}
</script>

<style lang="scss" scoped>
  h1 {
    color: #000;
  }
</style>
