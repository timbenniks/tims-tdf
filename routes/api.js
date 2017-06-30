const express = require('express')
const getState = require('../models/state')
const getStages = require('../models/stages')
const getTrial = require('../models/trial')
const getRiders = require('../models/riders')
const getStatus = require('../models/status')
const getStarters = require('../models/starters')

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

module.exports = router
