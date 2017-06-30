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
    startsTime: rider.ScheduledStartTime,
    time: rider.LocalTime,
    rider: peloton.find(r => r.id === rider.RiderBibNumber),
    timeFromStart: rider.TimeFromStart,
    gapFromBestRider: rider.GapFromBestRider,
    startTime: rider.ActualStartTime,
    position: rider.Position,
    checkpointId: rider.CheckPointId,
    status: rider.ClassificationStatus
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
