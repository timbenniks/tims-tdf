const getUrl = require('../helpers/getUrl')
const callApi = require('../helpers/callApi')

module.exports = (state) => new Promise((resolve, reject) => {
  const getPointOfInterestType = point => {
    let type = ''
    switch (point) {
      case 1: type = 'SPRINT'; break
      case 2: type = 'CLIMB'; break
      case 3: type = 'FINISH'; break
      case 4: type = 'TRIAL'; break
      case 7: type = 'START'; break
      default: type = ''; break
    }

    return type
  }

  const cleanPointsOfInterest = points => points.map(point => ({
    lat: point.Latitude,
    lon: point.Longitude,
    type: getPointOfInterestType(point.PointOfInterestType),
    name: point.CheckpointName,
    distFromStart: point.DistanceFromStart,
    distToFinish: point.DistanceToFinish,
    climbCat: point.ClimbCategory,
    sequence: point.Sequence,
    altitude: point.Altitude || false,
    angle: point.Angle || false,
    length: point.Length || false,
    keyword: point.POIKeyword || false,
    image: point.PoiImage || false,
    results: point.Results && point.Results.length || false
  }))

  const cleanPoints = points => points.map(point => ({
    lat: point.Latitude,
    lon: point.Longitude,
    distFromStart: point.DistanceFromStart,
    altitude: point.Altitude
  }))

  const url = getUrl('route', state.data.stage)
  const meta = {
    originalUrl: url,
    type: 'route'
  }

  callApi(url)
    .then(response => {
      resolve({
        meta,
        data: {
          pointsOfInterest: cleanPointsOfInterest(response.PointsOfInterest),
          points: cleanPoints(response.profilePoints)
        }
      })
    })
    .catch(error => reject({ error, meta }))
})
