const express = require('express')
const combined = require('./combined')
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
const getGroups = require('../models/groups')

const router = express.Router()

// API calls
router.get('/', (req, res) => {
  let baseurl = 'http://localhost:5100'

  if (req.env === 'production') {
    baseurl = 'http://tims-tdf-2017.herokuapp.com'
  }

  res.json({
    message: 'Welcome to Tims TDF2017 API. You can use the following urls',
    env: req.env,
    urls: [
      `${baseurl}/api/`,
      `${baseurl}/api/status`,
      `${baseurl}/api/state`,
      `${baseurl}/api/feed`,
      `${baseurl}/api/weather`,
      `${baseurl}/api/stages`,
      `${baseurl}/api/starters`,
      `${baseurl}/api/trial`,
      `${baseurl}/api/riders`,
      `${baseurl}/api/route`,
      `${baseurl}/api/withdrawals`,
      `${baseurl}/api/classification-overall`,
      `${baseurl}/api/jerseys`,
      `${baseurl}/api/group-telemetry`,
      `${baseurl}/api/rider-telemetry`,
      `${baseurl}/api/combined`,
    ]
  })
})

router.get('/status', (req, res) => {
  getStatus()
    .then(response => res.json(response))
    .catch(error => res.json({ error }))
})

router.get('/state', (req, res) => {
  getState()
    .then(response => res.json(response))
    .catch(error => res.json({ error }))
})

router.get('/feed', (req, res) => {
  getState()
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
  getState()
    .then(getStarters)
    .then(response => res.json(response))
    .catch(error => res.json({ error }))
})

router.get('/trial', (req, res) => {
  getState()
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
  getState()
    .then(getRiders)
    .then(response => res.json(response))
    .catch(error => res.json({ error }))
})

router.get('/route', (req, res) => {
  getState()
    .then(getRoute)
    .then(response => res.json(response))
    .catch(error => res.json({ error }))
})

router.get('/withdrawals', (req, res) => {
  getState()
    .then(getWithdrawals)
    .then(response => res.json(response))
    .catch(error => res.json({ error }))
})

router.get('/classification-overall', (req, res) => {
  getState()
    .then((state) => {
      getRiders()
        .then((riders) => {
          getClassificationOverall(state, riders)
            .then(response => res.json(response))
            .catch(error => res.json({ error }))
        })
        .catch(error => res.json({ error }))
    })
    .catch(error => res.json({ error }))
})

router.get('/jerseys', (req, res) => {
  getState()
    .then((state) => {
      getRiders()
        .then((riders) => {
          getJerseys(state, riders)
            .then(response => res.json(response))
            .catch(error => res.json({ error }))
        })
        .catch(error => res.json({ error }))
    })
    .catch(error => res.json({ error }))
})

router.get('/group-telemetry', (req, res) => {
  getState()
    .then((state) => {
      getRiders()
        .then((riders) => {
          getGroupTelemetry(state, riders)
            .then(response => res.json(response))
            .catch(error => res.json({ error }))
        })
        .catch(error => res.json({ error }))
    })
    .catch(error => res.json({ error }))
})

router.get('/rider-telemetry', (req, res) => {
  getState()
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

router.get('/groups', (req, res) => {
  Promise.all([getState(), getRiders()])
    .then(data => Promise.all([getGroupTelemetry(data[0], data[1]), getRiderTelemetry(data[0], data[1])]))
    .then(results => getGroups(results[0], results[1]))
    .then(response => res.json(response))
    .catch(error => res.json({ error }))
})

router.use('/combined/', combined)

module.exports = router
