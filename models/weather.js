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

  const url = getUrl('weather', state.stage).replace('__distancefromstart__', state.distanceFromStart)

  callApi(url)
    .then(response => resolve({
      originalUrl: url,
      weather: cleanWeather(response)
    }))
    .catch(error => reject({ error, originalUrl: url }))
})
