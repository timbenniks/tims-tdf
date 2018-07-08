<template>
  <div class="weather">
    <template v-if="weather">
      <p>{{weather.temp}}°C with {{weather.windSpeed}}km/h winds at {{weather.humidity}}% humidity</p>
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
