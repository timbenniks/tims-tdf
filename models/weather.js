const getUrl = require('../helpers/getUrl')
const callApi = require('../helpers/callApi')

module.exports = (state) => new Promise((resolve, reject) => {
  const weatherUrl = getUrl('weather').replace('__distancefromstart__', state.distanceFromStart)

  callApi(weatherUrl)
    .then(weather => resolve({ weather }))
    .catch(reject)
})
