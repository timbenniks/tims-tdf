const express = require('express')
const getState = require('../models/state')
const getStages = require('../models/stages')
const getTrial = require('../models/trial')
const getRiders = require('../models/riders')
const getStatus = require('../models/status')
const getStarters = require('../models/starters')
const getWeather = require('../models/weather')
const getFeed = require('../models/feed')
const getRoute = require('../models/route')
const getWithdrawals = require('../models/withdrawals')
const getClassificationOverall = require('../models/classification-overall')
const getJerseys = require('../models/jerseys')
const getGroupTelemetry = require('../models/group-telemetry')
const getRiderTelemetry = require('../models/rider-telemetry')

const router = express.Router()

router.get('/', (req, res) => {
  const qs = req.query.apis && req.query.apis.split(',')
  const whitelist = ['status', 'state', 'feed', 'weather', 'stages', 'starters', 'trial', 'riders', 'route', 'withdrawals', 'classification-overall', 'jerseys', 'group-telemetry', 'rider-telemetry', 'groups']
  const errorQs = []
  const correctQs = []
  const promises = []
  const response = {}

  if (!qs) {
    res.json({
      message: 'No query parameters given. Use: ?apis= with a comma seperated list.',
      apis: 'status, state, feed, weather, stages, starters, trial, riders, route, withdrawals, classification-overall, jerseys, group-telemetry, rider-telemetry, groups',
      example: '/api/combined?apis=feed,route'
    })
  }

  qs.forEach(q => {
    if (whitelist.indexOf(q) === -1) {
      errorQs.push(q)
    }
    else {
      correctQs.push(q)
    }
  })

  if (errorQs.length > 0) {
    res.json({ message: `[${errorQs}] should exist in [${whitelist}]` })
  }

  Promise.all([getState(), getRiders()])
    .then(data => {
      correctQs.forEach(q => {
        if (q === 'status') { promises.push(getStatus()) }
        if (q === 'state') { promises.push(getState()) }
        if (q === 'feed') { promises.push(getFeed(data[0])) }
        if (q === 'weather') { promises.push(getWeather(data[0])) }
        if (q === 'stages') { promises.push(getStages()) }
        if (q === 'starters') { promises.push(getStarters(data[0])) }
        if (q === 'riders') { promises.push(getRiders(data[0])) }
        if (q === 'route') { promises.push(getRoute(data[0])) }
        if (q === 'withdrawals') { promises.push(getWithdrawals(data[0])) }
        if (q === 'jerseys') { promises.push(getJerseys(data[0], data[1])) }
        if (q === 'group-telemetry') { promises.push(getGroupTelemetry(data[0], data[1])) }
        if (q === 'rider-telemetry') { promises.push(getRiderTelemetry(data[0], data[1])) }
        if (q === 'classification-overall') { promises.push(getClassificationOverall(data[0], data[1])) }
        if (q === 'trial') { promises.push(getTrial(data[0], data[1])) }
      })

      Promise.all(promises)
        .then(results => {
          results.forEach(result => {
            response[result.meta.type] = result.data
          })

          res.json(response)
        }, reason => {
          res.json(reason)
        })
        .catch(error => res.json({ error }))
    })
})

module.exports = router
