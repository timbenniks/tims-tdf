<template>
  <div class="wrapper">
    <state></state>
    <weather></weather>
    <div class="wrapper" style="overflow: hidden">
      <groups style="width:40%; float:left"></groups>
      <feed style="width:40%; float:left"></feed>
    </div>
  </div>
</template>

<script>
import Weather from './components/weather.vue'
import Groups from './components/groups.vue'
import Feed from './components/feed.vue'
import State from './components/state.vue'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: { Feed, Weather, State, Groups },
  methods: mapActions(['updateCombined', 'updateGroups']),
  mounted(){
    this.updateCombined('state,weather,feed')
    this.updateGroups()

    setInterval(()=>{
      this.updateCombined('state,weather,feed')
      this.updateGroups()
    }, 10000)
  }
}
</script>

<style lang="scss" scoped>
  h1 {
    color: #000;
  }
</style>
