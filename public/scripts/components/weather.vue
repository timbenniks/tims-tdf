<template>
  <div class="weather">
    <template v-if="weather">
      {{weather}}
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'weather',
  computed: mapGetters(['weather'])
}
</script>
