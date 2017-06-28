const request = require('request-promise-native')

module.exports = (url) => request({
  uri: url,
  json: true
})
