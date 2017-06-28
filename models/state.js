const getUrl = require('../helpers/getUrl')
const callApi = require('../helpers/callApi')

module.exports = () => new Promise((resolve, reject) => {
  callApi(getUrl('currentStage'))
    .then((response) => {
      resolve({
        stage: response.StageId,
        stageDate: response.StageDate,
        stageNumber: response.StageNumber,
        stageType: response.StageType,
        start: response.DepartingTown,
        finish: response.ArrivingTown,
        distance: response.TotalDistance,
        distanceFromStart: response.TotalDistanceFromRaceStart
      })
    })
    .catch((error) => {
      reject(error)
    })
})
