const getUrl = require('../helpers/getUrl')
const callApi = require('../helpers/callApi')

module.exports = (state, peloton) => new Promise((resolve, reject) => {
  const cleanRiders = riders => riders.map(rider => ({
    lat: rider.Latitude,
    lon: rider.Longitude,
    gradient: rider.Gradient,
    temperature: rider.CurrentTemperature,
    humidity: rider.RelativeHumidity,
    windSpeed: rider.WindSpeedkmph,
    windDirection: rider.WindDirection,
    windStatus: rider.RiderWindDirection,
    posInRace: rider.PositionInTheRace,
    gapToFirstRider: rider.GapToFirstRiderT,
    gapToPreviousRider: rider.GapToPreviousRiderT,
    currentSpeed: rider.CurrentSpeed,
    avgSpeed: rider.AverageSpeedR,
    maxSpeed: rider.MaximumSpeedR,
    distToFinish: rider.DistanceToFinish,
    distFromStart: rider.DistanceFromStart,
    virtualLeader: rider.TTVirtualLeader || false,
    gapToVirtualLeader: rider.TTGapToVirtualLeaderT || false,
    generalWindDirection: rider.RelativeWindDirection || false,
    riderInfo: peloton.find(r => r.id === rider.Bib)
  }))

  const url = getUrl('riderTelemetry', state.stage)

  callApi(url)
    .then(response => {
      resolve({
        originalUrl: url,
        epoch: response.TimeStampEpoch,
        periodStart: response.TimeStampStart,
        periodEnd: response.TimeStampEnd,
        speed: response.RaceSpeed,
        maxSpeed: response.RaceMaxSpeed,
        distToFinish: response.RaceDistanceToFinish,
        distFromStart: response.RaceDistanceFromStart,
        riders: cleanRiders(response.Riders)
      })
    })
    .catch(error => reject({ error, originalUrl: url }))
})
