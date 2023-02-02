const express = require('express')
const productsRoutes = require('./products/productsRoutes')
const messagesRoutes = require('./messages/messagesRoutes')
const authRoutes = require('./auth/authRoutes')
const processRoutes = require('./process/processRoutes')
const randomsRoutes = require('./randoms/randomsRoutes')

const router = express.Router()

// API subroutes
router.use('/products', productsRoutes)
router.use('/messages', messagesRoutes)
router.use('/auth', authRoutes)
router.use('/info', processRoutes)
router.use('/randoms', randomsRoutes)

module.exports = router
