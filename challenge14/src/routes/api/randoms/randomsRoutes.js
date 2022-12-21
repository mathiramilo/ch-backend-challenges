const express = require('express')
const RandomsController = require('../../../controllers/randoms.controller')

const router = express.Router()

router.get('/', RandomsController.getRandoms)

module.exports = router
