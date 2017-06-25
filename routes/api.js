const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.json({ error: 'What is the magic word?' })
})

module.exports = router
