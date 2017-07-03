const getUrl = require('../helpers/getUrl')
const callApi = require('../helpers/callApi')

module.exports = (state, peloton) => new Promise((resolve, reject) => {
  const findJersey = (which, jerseys) => jerseys.filter(jersey => jersey.Position === 1 && jersey.Jersey === which)
  const url = getUrl('jerseys', state.stage)

  callApi(url)
    .then(response => resolve({
      originalUrl: url,
      yellow: peloton.find(r => r.id === findJersey('General', response)[0].RiderBibNumber),
      green: peloton.find(r => r.id === findJersey('Sprint', response)[0].RiderBibNumber),
      white: peloton.find(r => r.id === findJersey('Youth', response)[0].RiderBibNumber),
      polka: peloton.find(r => r.id === findJersey('Mountain', response)[0].RiderBibNumber)
    }))
    .catch(error => reject({ error, originalUrl: url }))
})
