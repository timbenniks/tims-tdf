<template>
  <div class="groups">
    <template v-if="groups.length">
      <p v-if="groups.meta">Speed: {{groups.meta.speed}}km/h.<br/>To finish: {{groups.meta.distToFinish}}km. </p>
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
    <template v-else>
      <p>No group data available</p>
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
