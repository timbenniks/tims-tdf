const getUrl = require('../helpers/getUrl')
const callApi = require('../helpers/callApi')

module.exports = (state, peloton) => new Promise((resolve, reject) => {
  const cleanCheckPoints = checkPoints => checkPoints.map(point => ({
    id: point.CheckPointId,
    ridersPassed: point.NumberOfRidersPassed,
    distFromStart: point.DistanceFromStart,
    distToFinish: point.DistanceToFinish,
    name: point.CheckpointName,
    type: point.CheckpointType
  }))

  const cleanRiderInfo = riders => riders.map(rider => ({
    scheduledStartTime: rider.ScheduledStartTime,
    actualStartTime: rider.ActualStartTime,
    localTime: rider.LocalTime,
    timeFromStart: rider.TimeFromStart,
    gapFromBestRider: rider.GapFromBestRider,
    position: rider.Position,
    checkpointId: rider.CheckPointId,
    status: rider.ClassificationStatus,
    rider: peloton.find(r => r.id === rider.RiderBibNumber)
  }))

  callApi(getUrl('trial', state.stage))
    .then(response => {
      resolve({
        checkPoints: cleanCheckPoints(response.CheckPoints),
        ridersToStart: cleanRiderInfo(response.RidersStillToStart),
        ridersStarted: cleanRiderInfo(response.RidersStarted),
        ridersCompleted: cleanRiderInfo(response.RidersCompleted),
        numberOfRidersRacing: response.NumberOfRidersRacing
      })
    })
    .catch(reject)
})
