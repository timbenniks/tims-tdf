const getUrl = require('../helpers/getUrl')
const callApi = require('../helpers/callApi')

module.exports = (state) => new Promise((resolve, reject) => {
  callApi(getUrl('activityFeed', state.stage))
    .then(response => {
      resolve({
        items: response.Items,
        count: response.Count
      })
    })
    .catch(reject)
})
