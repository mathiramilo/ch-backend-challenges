const express = require('express')
const productsRoutes = require('./products/productsRoutes')
const messagesRoutes = require('./messages/messagesRoutes')
const authRoutes = require('./auth/authRoutes')

const router = express.Router()

// API subroutes
router.use('/products', productsRoutes)
router.use('/messages', messagesRoutes)
router.use('/auth', authRoutes)

module.exports = router
