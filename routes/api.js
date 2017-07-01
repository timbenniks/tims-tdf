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
const getClassification = require('../models/classification')
const getJerseys = require('../models/jerseys')
const getGroupTelemetry = require('../models/group-telemetry')
const getRiderTelemetry = require('../models/rider-telemetry')

const router = express.Router()
let appState = false

const getAppState = () => new Promise((resolve, reject) => {
  if (!appState) {
    getState()
      .then((state) => {
        appState = state
        resolve(appState)
      })
      .catch(reject)
  }
  else {
    resolve(appState)
  }
})

router.get('/', (req, res) => {
  res.json({ error: 'Nothing here... move along' })
})

router.get('/status', (req, res) => {
  getStatus()
    .then(response => res.json(response))
    .catch(error => res.json({ error }))
})

router.get('/state', (req, res) => {
  getAppState()
    .then(response => res.json(response))
    .catch(error => res.json({ error }))
})

router.get('/feed', (req, res) => {
  getAppState()
    .then(getFeed)
    .then(response => res.json(response))
    .catch(error => res.json({ error }))
})

router.get('/weather', (req, res) => {
  getState()
    .then(getWeather)
    .then(response => res.json(response))
    .catch(error => res.json({ error }))
})

router.get('/stages', (req, res) => {
  getStages()
    .then(response => res.json(response))
    .catch(error => res.json({ error }))
})

router.get('/starters', (req, res) => {
  getAppState()
    .then(getStarters)
    .then(response => res.json(response))
    .catch(error => res.json({ error }))
})

router.get('/trial', (req, res) => {
  getAppState()
    .then((state) => {
      getRiders()
        .then((riders) => {
          getTrial(state, riders)
            .then(response => res.json(response))
            .catch(error => res.json({ error }))
        })
        .catch(error => res.json({ error }))
    })
    .catch(error => res.json({ error }))
})

router.get('/riders', (req, res) => {
  getAppState()
    .then(getRiders)
    .then(response => res.json(response))
    .catch(error => res.json({ error }))
})

router.get('/route', (req, res) => {
  getAppState()
    .then(getRoute)
    .then(response => res.json(response))
    .catch(error => res.json({ error }))
})

router.get('/withdrawals', (req, res) => {
  getAppState()
    .then(getWithdrawals)
    .then(response => res.json(response))
    .catch(error => res.json({ error }))
})

router.get('/classification', (req, res) => {
  getAppState()
    .then(getClassification)
    .then(response => res.json(response))
    .catch(error => res.json({ error }))
})

router.get('/jerseys', (req, res) => {
  getAppState()
    .then(getJerseys)
    .then(response => res.json(response))
    .catch(error => res.json({ error }))
})

router.get('/group-telemetry', (req, res) => {
  getAppState()
    .then(getGroupTelemetry)
    .then(response => res.json(response))
    .catch(error => res.json({ error }))
})

router.get('/rider-telemetry', (req, res) => {
  getAppState()
    .then((state) => {
      getRiders()
        .then((riders) => {
          getRiderTelemetry(state, riders)
            .then(response => res.json(response))
            .catch(error => res.json({ error }))
        })
        .catch(error => res.json({ error }))
    })
    .catch(error => res.json({ error }))
})

module.exports = router
