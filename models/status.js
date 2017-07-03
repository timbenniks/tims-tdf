const getUrl = require('../helpers/getUrl')
const callApi = require('../helpers/callApi')

module.exports = () => new Promise((resolve, reject) => {
  const url = getUrl('status')

  callApi(url)
    .then(response => {
      resolve({
        originalUrl: url,
        status: response.State,
        message: response.Message
      })
    })
    .catch(error => reject({ error, originalUrl: url }))
})
