const express = require('express')
const getState = require('../models/state')
const getTimeTrial = require('../models/timeTrial')

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

router.get('/state', (req, res) => {
  getAppState()
    .then(state => res.json(state))
    .catch(error => res.json({ error }))
})

router.get('/trial', (req, res) => {
  // get app state for stage id
  getAppState().then((state) => {
    // get actuall time trial data based on stage id
    getTimeTrial(state)
      .then(response => res.json(response))
      .catch(error => res.json({ error }))
  }).catch(error => res.json({ error }))
})

module.exports = router
