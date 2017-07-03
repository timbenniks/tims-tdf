const getUrl = require('../helpers/getUrl')
const callApi = require('../helpers/callApi')

module.exports = (state, peloton) => new Promise((resolve, reject) => {
  const getRiders = riders => riders.map(rider => peloton.data.find(r => r.id === rider.Bib))

  const cleanGroups = groups => groups.map(group => ({
    id: group.Latitude,
    key: group.GroupNameKey,
    speed: group.GroupSpeed,
    avgSpeed: group.GroupAverageSpeed,
    maxSpeed: group.GroupMaxSpeed,
    hasYellowJersey: group.HasGeneralClassificationJersey,
    hasGreenJersey: group.HasSprintJersey,
    hasWhiteJersey: group.HasYouthJersey,
    hasPolkaJersey: group.HasMountainJersey,
    hasRedNumber: group.HasCombativityJersey,
    gapFromNextGroup: group.GapFromNextGroupT,
    riders: getRiders(group.Riders)
  }))

  const url = getUrl('groupTelemetry', state.data.stage)
  const meta = {
    originalUrl: url,
    type: 'group-telemetry'
  }

  callApi(url)
    .then(response => {
      resolve({
        meta,
        data: {
          time: response.TimeStamp,
          epoch: response.TimeStampEpoch,
          periodStart: response.TimeStampStart,
          groups: cleanGroups(response.Groups),
          caravan: {
            lat: response.Caravan.Latitude,
            lon: response.Caravan.Longitude
          }
        }
      })
    })
    .catch(error => reject({ error, meta }))
})
