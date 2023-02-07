// Imports
const path = require('path')
const express = require('express')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const loggerMiddleware = require('./middlewares/logger')
const errorMiddleware = require('./middlewares/error')
const logger = require('./utils/logger.utils')

const apiRoutes = require('./routes/api/apiRoutes')
const webRoutes = require('./routes/web/webRoutes')

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('src/public'))
app.use(loggerMiddleware)

// Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CH Backend Challenges API',
      description: 'Rest API for the Coderhouse backend course challenges',
      version: '1.0.0'
    }
  },
  apis: [path.join(__dirname, '../docs/**/*.yaml')]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/apidocs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

// Routes
app.use(webRoutes)
app.use('/api', apiRoutes)
app.get('*', (req, res) => {
  const { method, url } = req
  logger.warn(`Nonexistent Route: ${method} => ${url}`)
  res.status(404).sendFile(path.resolve(__dirname + '/public/pages/404.html'))
})
app.use(errorMiddleware)

module.exports = app
