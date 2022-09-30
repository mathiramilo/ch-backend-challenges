const express = require('express')
const productsRoutes = require('./products/productsRoutes')
const messagesRoutes = require('./messages/messagesRoutes')

const router = express.Router()

// API subroutes
router.use('/products', productsRoutes)
router.use('/messages', messagesRoutes)

module.exports = router
