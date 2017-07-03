const getUrl = require('../helpers/getUrl')
const callApi = require('../helpers/callApi')

module.exports = (state, peloton) => new Promise((resolve, reject) => {
  const findJersey = (which, jerseys) => jerseys.filter(jersey => jersey.Position === 1 && jersey.Jersey === which)

  callApi(getUrl('jerseys', state.stage))
    .then(response => resolve({
      yellow: peloton.find(r => r.id === findJersey('General', response)[0].RiderBibNumber),
      green: peloton.find(r => r.id === findJersey('Sprint', response)[0].RiderBibNumber),
      white: peloton.find(r => r.id === findJersey('Youth', response)[0].RiderBibNumber),
      polka: peloton.find(r => r.id === findJersey('Mountain', response)[0].RiderBibNumber)
    }))
    .catch(reject)
})
