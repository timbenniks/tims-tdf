<template>
  <div class="feed">
    <template v-if="feed">
      <article v-for="item in feed.items" :key="item.id">
        <h1>{{item.title}}</h1>
        <p>{{item.description}}</p>
      </article>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'feed',
  computed: mapGetters(['feed'])
}
</script>
