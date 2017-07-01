const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const api = require('./routes/api')
const config = require('./config.json')
const browserify = require('browserify-middleware')
const sass = require('express-sass-middleware')
const babelify = require('babelify')
const vueify = require('vueify')
const autoprefixer = require('autoprefixer')

const app = express()
const port = process.env.PORT || '5100'

browserify.settings({
  transform: [
    [babelify, { presets: ['es2015'], plugins: ['transform-object-assign', 'es6-promise'] }],
    [vueify]
  ],
  production: {
    cache: true,
    precompile: true,
    minify: true,
    gzip: true,
    debug: false
  },
  development: {
    cache: 'dynamic',
    precompile: false,
    minify: false,
    gzip: false,
    debug: true
  }
})

vueify.compiler.applyConfig({
  postcss: [
    autoprefixer({ browsers: ['last 2 versions', 'ie >= 11', 'Safari >= 9', 'iOS >= 9'] }),
  ]
})

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

app.use('/app.js', browserify(path.join(__dirname, '/public/scripts/app.js')))

app.get('/styles.css', sass({
  file: path.join(__dirname, '/public/styles/styles.scss'),
  watch: true,
  precompile: true,
  outputStyle: 'compressed'
}))

app.use('/api/', api)
app.listen(port)
