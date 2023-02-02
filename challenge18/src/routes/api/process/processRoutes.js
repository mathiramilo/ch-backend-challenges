const express = require('express')
const compression = require('compression')
const ProcessInfoController = require('../../../controllers/processInfo.controller')

const router = express.Router()

router.get('/', compression(), ProcessInfoController.getProcessInfo)

module.exports = router
