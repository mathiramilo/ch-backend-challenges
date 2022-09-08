const express = require('express')

const PORT = process.env.PORT || 8080
const app = express()

// Middleware

// Routes

const server = app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`)
})

server.on('error', error => {
  console.error(`Error: ${error}`)
})
