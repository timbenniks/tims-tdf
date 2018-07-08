<template>
  <div class="wrapper">
    <header>
      <state></state>
    </header>
    <main>
      <weather></weather>
      <groups></groups>
      <feed></feed>
    </main>
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

