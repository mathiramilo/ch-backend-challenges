const express = require('express')
const productsRoutes = require('./products/productsRoutes')

const router = express.Router()

// API subroutes
router.use('/products', productsRoutes)

module.exports = router
