<template>
  <div class="bla">
    <article v-for="item in feed.data.items" :key="item.id">
      <h1>{{item.title}}</h1>
      <p>{{item.description}}</p>
    </article>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  computed: mapGetters([
    'feed'
  ]),
  methods: mapActions([
    'updateFeed'
  ]),
  mounted(){
    this.updateFeed()
  }
}
</script>

<style lang="scss" scoped>
  h1 {
    color: #000;
  }
</style>
