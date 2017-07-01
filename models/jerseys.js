const getUrl = require('../helpers/getUrl')
const callApi = require('../helpers/callApi')

module.exports = state => new Promise((resolve, reject) => {
  callApi(getUrl('jerseys', state.stage))
    .then(response => resolve(response))
    .catch(reject)
})
