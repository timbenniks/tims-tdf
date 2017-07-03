<template>
<button @click="increment">{{count}}</button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  computed: mapGetters([
    'count'
  ]),
  methods: mapActions([
    'increment'
  ])
}
</script>

<style lang="scss" scoped>
  h1 {
    color: #000;
  }
</style>
