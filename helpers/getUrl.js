const config = require('../config.json')

module.exports = (which, stage = 0, apibaseurl = config.apibaseurl, race = config.race, guid = config.guid) => {
  const url = config.urls[which]
                .replace('__apibaseurl__', apibaseurl)
                .replace('__race__', race)
                .replace('__guid__', guid)
                .replace('__stage__', stage)
  return url
}
