const getUrl = require('../helpers/getUrl')
const callApi = require('../helpers/callApi')

module.exports = state => new Promise((resolve, reject) => {
  const cleanCheckPoints = checkPoints => checkPoints.map(point => ({
    ridersPassed: point.NumberOfRidersPassed,
    distFromStart: point.DistanceFromStart,
    distToFinish: point.DistanceToFinish,
    name: point.CheckpointName,
    type: point.CheckpointType
  }))

  callApi(getUrl('trial', state.stage))
    .then(response => {
      resolve({
        checkPoints: cleanCheckPoints(response.CheckPoints),
        ridersStillToStart: response.RidersStillToStart,
        ridersStarted: response.RidersStarted,
        ridersCompleted: response.RidersCompleted,
        numberOfRidersRacing: response.NumberOfRidersRacing
      })
    })
    .catch(reject)
})
