const getUrl = require('../helpers/getUrl')
const callApi = require('../helpers/callApi')

module.exports = (state, peloton) => new Promise((resolve, reject) => {
  const findJersey = (which, jerseys) => jerseys.filter(jersey => jersey.Position === 1 && jersey.Jersey === which)
  const url = getUrl('jerseys', state.data.stage)
  const meta = {
    originalUrl: url,
    type: 'jerseys'
  }

  callApi(url)
    .then(response => resolve({
      meta,
      data: {
        yellow: peloton.data.find(r => r.id === findJersey('General', response)[0].RiderBibNumber),
        green: peloton.data.find(r => r.id === findJersey('Sprint', response)[0].RiderBibNumber),
        white: peloton.data.find(r => r.id === findJersey('Youth', response)[0].RiderBibNumber),
        polka: peloton.data.find(r => r.id === findJersey('Mountain', response)[0].RiderBibNumber)
      }
    }))
    .catch(error => reject({ error, meta }))
})
