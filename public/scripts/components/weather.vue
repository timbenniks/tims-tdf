<template>
  <div class="weather">
    <template v-if="weather">
      <ul>
        <li>{{weather.temp}}°C</li>
        <li>{{weather.windDirection}} wind at {{weather.windSpeed}}km/h</li>
        <li>{{weather.humidity}}% humidity</li>
      </ul>
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
