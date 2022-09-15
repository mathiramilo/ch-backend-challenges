const express = require('express')
const path = require('path')
const logger = require('./middlewares/logger')
const apiRoutes = require('./routes/api/apiRoutes')
const webRoutes = require('./routes/web/webRoutes')

const PORT = process.env.PORT || 8080
const app = express()

// Template Engine Config
app.set('view engine', 'pug')
app.set('views', './views')

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(logger)

// Routes
app.use(webRoutes)
app.use('/api', apiRoutes)
app.get('*', (req, res) => {
  res.status(404).render('404')
})

const server = app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`)
})

server.on('error', error => {
  console.error(`Error: ${error}`)
})
