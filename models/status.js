const getUrl = require('../helpers/getUrl')
const callApi = require('../helpers/callApi')

module.exports = () => new Promise((resolve, reject) => {
  callApi(getUrl('status'))
    .then(response => {
      resolve({
        status: response.State,
        message: response.Message
      })
    })
    .catch(reject)
})
