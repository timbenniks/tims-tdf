<template>
  <div class="feed">
    <template v-if="feed && feed.data">
      <article v-for="item in feed.data.items" :key="item.id">
        <h1>{{item.title}}</h1>
        <p>{{item.description}}</p>
      </article>
    </template>
    {{currentState}}
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'feed',
  computed: mapGetters(['feed', 'currentState'])
}
</script>
