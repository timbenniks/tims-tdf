<template>
  <div class="state">
    <template v-if="state">
      <p>Stage {{state.stageNumber}} ({{state.stageType}}) &mdash; {{state.distance}}km</p>
      <h1>{{state.start}}&mdash;{{state.finish}}</h1>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'state',
  computed: mapGetters(['state'])
}
</script>
