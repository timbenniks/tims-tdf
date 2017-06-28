const getUrl = require('../helpers/getUrl')
const callApi = require('../helpers/callApi')

module.exports = () => new Promise((resolve, reject) => {
  const cleanRiders = riders => riders.map(rider => ({ rider }))

  callApi(getUrl('riders'))
    .then(response => resolve({ stages: cleanRiders(response) }))
    .catch(reject)
})
