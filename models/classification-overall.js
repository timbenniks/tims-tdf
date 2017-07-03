const getUrl = require('../helpers/getUrl')
const callApi = require('../helpers/callApi')

module.exports = (state, peloton) => new Promise((resolve, reject) => {
  const cleanClassification = riders => riders.map(rider => ({
    timeTaken: rider.TimeDuration,
    quality: rider.Quality,
    position: rider.Position,
    points: rider.Points,
    gap: rider.Gap,
    rider: peloton.find(r => r.id === rider.Bib)
  }))

  const url = getUrl('classificationOverall', state.stage)

  callApi(url)
    .then(response => resolve({
      originalUrl: url,
      yellow: cleanClassification(response.General),
      white: cleanClassification(response.Sprint),
      youth: cleanClassification(response.Youth)
    }))
    .catch(error => reject({ error, originalUrl: url }))
})
