module.exports = (groups, riders) => new Promise((resolve) => {
  const cleanedGroups = groups.data.groups.map(group => ({
    key: group.key,
    speed: group.speed,
    avgSpeed: group.avgSpeed,
    maxSpeed: group.maxSpeed,
    hasYellowJersey: group.hasYellowJersey,
    hasGreenJersey: group.hasGreenJersey,
    hasWhiteJersey: group.hasWhiteJersey,
    hasPolkaJersey: group.hasPolkaJersey,
    hasRedNumber: group.hasRedNumber,
    gapFromNextGroup: group.gapFromNextGroup,
    riders: group.riders.map(rider => riders.data.riders.find(r => r.id === rider.id))
  }))

  const meta = {
    speed: riders.data.speed,
    maxSpeed: riders.data.maxSpeed,
    distToFinish: riders.data.distToFinish,
    distFromStart: riders.data.distFromStart
  }

  resolve({
    meta,
    groups: cleanedGroups
  })
})
