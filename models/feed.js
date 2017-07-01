const getUrl = require('../helpers/getUrl')
const callApi = require('../helpers/callApi')

module.exports = (state) => new Promise((resolve, reject) => {
  const cleanItems = items => items.map(item => ({
    id: item.ActivityId,
    title: item.Title,
    description: item.Description,
    kind: item.ContentType,
    type: item.EventType,
    additionalContent: item.ContentUri,
    distFromStart: item.DistanceFromStart,
    distToFinish: item.DistanceToFinish,
    time: item.ActivityTime,
    stageId: item.StageId
  }))

  callApi(getUrl('feed', state.stage))
    .then(response => {
      resolve({
        items: cleanItems(response.Items),
        count: response.Count
      })
    })
    .catch(reject)
})
