// Imports
const path = require('path')
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')
const dbConfig = require('./db/db.config')
const logger = require('./middlewares/logger')
const errorMiddleware = require('./middlewares/error')
const apiRoutes = require('./routes/api/apiRoutes')
const webRoutes = require('./routes/web/webRoutes')

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('src/public'))
app.use(
  session({
    secret: 'ch-backend-challenges',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
    store: MongoStore.create({
      mongoUrl: dbConfig.mongodb.uri,
      collectionName: 'users'
    })
  })
)
app.use(passport.initialize())
app.use(passport.session())
require('./middlewares/passport')(passport)
app.use(logger)

// Routes
app.use(webRoutes)
app.use('/api', apiRoutes)
app.get('*', (req, res) => {
  res.status(404).sendFile(path.resolve(__dirname + '/public/pages/404.html'))
})
app.use(errorMiddleware)

module.exports = app
