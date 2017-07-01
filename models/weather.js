const getUrl = require('../helpers/getUrl')
const callApi = require('../helpers/callApi')

module.exports = (state) => new Promise((resolve, reject) => {
  const weatherUrl = getUrl('weather', state.stage).replace('__distancefromstart__', state.distanceFromStart)

  const clean = weather => ({
    distFormStart: weather.DistanceFromStart,
    type: weather.WeatherType,
    temp: weather.Temperature,
    windDirection: weather.WindDirection,
    windSpeed: weather.AverageWindSpeed,
    humidity: weather.HumidityPercentage,
    time: weather.WeatherDate
  })

  callApi(weatherUrl)
    .then(response => resolve(clean(response)))
    .catch(reject)
})
