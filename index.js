const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const api = require('./routes/api')
const config = require('./config.json')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.header('X-powered-by', config.title)
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.get('/', (req, res) => {
  res.render('index', { config })
})

app.use('/api/', api)

const port = process.env.PORT || '5000'

app.listen(port)
