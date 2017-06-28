const getUrl = require('../helpers/getUrl')
const callApi = require('../helpers/callApi')

module.exports = () => new Promise((resolve, reject) => {
  const cleanStages = stages => stages.map(stage => ({
    stage: stage.StageId,
    stageDate: stage.StageDate,
    stageNumber: stage.StageNumber,
    stageType: stage.StageType,
    start: stage.DepartingTown,
    finish: stage.ArrivingTown,
    distance: stage.TotalDistance,
    distanceFromStart: stage.TotalDistanceFromRaceStart
  }))

  callApi(getUrl('stages'))
    .then(response => resolve({ stages: cleanStages(response) }))
    .catch(reject)
})
