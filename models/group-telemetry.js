const getUrl = require('../helpers/getUrl')
const callApi = require('../helpers/callApi')

module.exports = state => new Promise((resolve, reject) => {
  const url = getUrl('groupTelemetry', state.stage)
  callApi(url)
    .then(response => {
      resolve({
        originalUrl: url,
        time: response.TimeStamp,
        epoch: response.TimeStampEpoch
      })
    })
    .catch(error => reject({ error, originalUrl: url }))
})
