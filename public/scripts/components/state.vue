<template>
  <div class="state">
    <template v-if="state">
      {{state}}
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
