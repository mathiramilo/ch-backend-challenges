const express = require('express')
const path = require('path')
const apiRoutes = require('./routes/index')
const logger = require('./middlewares/logger')

const PORT = process.env.PORT || 8080
const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(logger)

// Routes
app.use('/api', apiRoutes)
app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, '/public/pages/404.html'))
})

const server = app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`)
})

server.on('error', error => {
  console.error(`Error: ${error}`)
})
