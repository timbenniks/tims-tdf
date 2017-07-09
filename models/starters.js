const getUrl = require('../helpers/getUrl')
const callApi = require('../helpers/callApi')

module.exports = state => new Promise((resolve, reject) => {
  const cleanRiders = riders => riders.map(rider => ({
    id: rider.RiderBibNumber,
    first: rider.FirstName,
    last: rider.LastName,
    shortName: rider.ShortName,
    nationality: rider.Nationality,
    countryCode: rider.CountryCode,
    birthDate: rider.DateOfBirth,
    photo: rider.PhotoUri,
    withdrawn: rider.IsWithdrawn
  }))

  const cleanStarters = starters => starters.map(team => ({
    countryCode: team.CountryCode,
    country: team.CountryName,
    teamCode: team.TeamCode,
    teamName: team.TeamName,
    diretor: team.Director,
    coDirector: team.CoDirector,
    riders: cleanRiders(team.Riders)
  }))

  const url = getUrl('starters', state.data.stage)
  const meta = {
    originalUrl: url,
    type: 'starters'
  }

  callApi(url)
    .then(response => {
      if (response === null) {
        resolve({ meta, data: 'NO_RESPONSE' })
      }

      resolve({
        meta,
        data: cleanStarters(response)
      })
    })
    .catch(error => reject({ error, meta }))
})
