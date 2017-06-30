const getUrl = require('../helpers/getUrl')
const callApi = require('../helpers/callApi')

module.exports = () => new Promise((resolve, reject) => {
  const cleanRiders = riders => riders.map(rider => ({
    shortName: rider.ShortName,
    id: rider.Id,
    first: rider.FirstName,
    last: rider.LastName,
    team: rider.TeamName,
    teamCode: rider.TeamCode,
    Nationality: rider.Nationality,
    country: rider.CountryCode,
    birthDate: rider.DateOfBirth,
    photo: rider.PhotoUri,
    withdrawn: rider.IsWithdrawn,
    rank: [{
      yellow: rider.GeneralClassificationRank,
      white: rider.YouthClassificationRank,
      green: rider.SprintClassificationRank,
      polka: rider.MountainClassificationRank,
      redNumber: rider.CombativityClassificationRank,
    }]
  }))

  callApi(getUrl('riders'))
    .then(response => resolve(cleanRiders(response)))
    .catch(reject)
})
