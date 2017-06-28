const getUrl = require('../helpers/getUrl')
const callApi = require('../helpers/callApi')

module.exports = (state) => new Promise((resolve, reject) => {
  const cleanCheckPoints = (checkPoints) => checkPoints.map((point) => ({
    ridersPassed: point.NumberOfRidersPassed,
    distFromStart: point.DistanceFromStart,
    distToFinish: point.DistanceToFinish,
    name: point.CheckpointName,
    type: point.CheckpointType
  }))

  callApi(getUrl('trial', state.stage))
    .then((response) => {
      resolve({
        CheckPoints: cleanCheckPoints(response.CheckPoints),
        RidersStillToStart: response.RidersStillToStart,
        RidersStarted: response.RidersStarted,
        RidersCompleted: response.RidersCompleted,
        NumberOfRidersRacing: response.NumberOfRidersRacing
      })
    })
    .catch(error => reject(error))
})
