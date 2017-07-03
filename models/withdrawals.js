const getUrl = require('../helpers/getUrl')
const callApi = require('../helpers/callApi')

module.exports = state => new Promise((resolve, reject) => {
  const cleanRiders = riders => riders.map(rider => ({
    id: rider.Id,
    first: rider.FirstName,
    last: rider.LastName,
    shortName: rider.ShortName,
    team: rider.TeamName,
    teamCode: rider.TeamCode,
    country: rider.Nationality,
    countryCode: rider.CountryCode,
    birthDate: rider.DateOfBirth,
    photo: rider.PhotoUri,
    withdrawn: rider.IsWithdrawn
  }))

  const url = getUrl('withdrawals', state.data.stage)
  const meta = {
    originalUrl: url,
    type: 'withdrawals'
  }

  callApi(url)
    .then(response => resolve({
      meta,
      data: cleanRiders(response[0].Value)
    }))
    .catch(error => reject({ error, meta }))
})
