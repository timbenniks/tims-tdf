const getUrl = require('../helpers/getUrl')
const callApi = require('../helpers/callApi')

module.exports = state => new Promise((resolve, reject) => {
  const cleanWeather = weather => ({
    distFormStart: weather.DistanceFromStart,
    type: weather.WeatherType,
    temp: weather.Temperature,
    windDirection: weather.WindDirection,
    windSpeed: weather.AverageWindSpeed,
    humidity: weather.HumidityPercentage,
    time: weather.WeatherDate
  })

  const url = getUrl('weather', state.data.stage).replace('__distancefromstart__', state.data.distanceFromStart)
  const meta = {
    originalUrl: url,
    type: 'weather'
  }

  callApi(url)
    .then(response => resolve({
      meta,
      data: cleanWeather(response)
    }))
    .catch(error => reject({ error, meta }))
})
