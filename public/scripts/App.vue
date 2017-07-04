<template>
  <div class="wrapper">
    <state></state>
    <weather></weather>
    <feed></feed>
  </div>
</template>

<script>
import Weather from './components/weather.vue'
import Feed from './components/feed.vue'
import State from './components/state.vue'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: { Feed, Weather, State },
  methods: mapActions(['updateCombined']),
  mounted(){
    this.updateCombined('state,weather,feed')
    setInterval(()=>{
      this.updateCombined('state,weather,feed')
    }, 10000)
  }
}
</script>

<style lang="scss" scoped>
  h1 {
    color: #000;
  }
</style>
