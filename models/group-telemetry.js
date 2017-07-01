const getUrl = require('../helpers/getUrl')
const callApi = require('../helpers/callApi')

module.exports = state => new Promise((resolve, reject) => {
  callApi(getUrl('groupTelemetry', state.stage))
    .then(response => {
      resolve({
        time: response.TimeStamp,
        epoch: response.TimeStampEpoch
      })
    })
    .catch(reject)
})
