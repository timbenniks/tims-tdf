const getUrl = require('../helpers/getUrl')
const callApi = require('../helpers/callApi')

module.exports = state => new Promise((resolve, reject) => {
  const cleanRidersPerStage = stages => stages.map(stage => ({
    stage: stage.Key,
    riders: stage.Value.map(rider => ({
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
  }))

  const url = getUrl('withdrawals', state.data.stage)
  const meta = {
    originalUrl: url,
    type: 'withdrawals'
  }

  callApi(url)
    .then(response => {
      if (response === null) {
        resolve({ meta, data: 'NO_RESPONSE' })
      }

      resolve({
        meta,
        data: cleanRidersPerStage(response)
      })
    })
    .catch(error => reject({ error, meta }))
})
