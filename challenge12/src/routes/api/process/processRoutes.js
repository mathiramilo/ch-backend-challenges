const express = require('express')
const ProcessInfoController = require('../../../controllers/processInfo.controller')

const router = express.Router()

router.get('/', ProcessInfoController.getProcessInfo)

module.exports = router
