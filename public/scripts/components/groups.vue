<template>
  <div class="groups">
    <template v-if="groups">
      <div class="meta" v-if="groups.meta">
        <p>Current Speed: {{groups.meta.speed}}km/h &mdash; {{groups.meta.distToFinish}}km to go</p>
        <div class="meta-total-distance">
          <div class="meta-to-go" :style="{ width: groups.meta.percentage }"></div>
        </div>
      </div>
      <ul>
        <li v-for="group in groups.groups" :key="group.key">
          <p>{{group.position}}: {{group.name}}({{group.size}})<br/>
            <template v-if="group.hasYellowJersey || group.hasGreenJersey || group.hasWhiteJersey || group.hasPolkaJersey || group.hasRedNumber">
              <span v-if="group.hasYellowJersey">yellow</span>
              <span v-if="group.hasGreenJersey">green</span>
              <span v-if="group.hasWhiteJersey">white</span>
              <span v-if="group.hasPolkaJersey">polka</span>
              <span v-if="group.hasRedNumber">red number</span>
              <br/>
            </template>
            To finish: {{group.distToFinish}}km<br />
            To next group: {{group.gapToNextGroup}}sec<br />
            To leading group: {{group.gapToLeadingGroup}}sec<br />
          </p>
        </li>
      </ul>
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'groups',
  computed: mapGetters(['groups'])
}
</script>
