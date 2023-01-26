const express = require('express')
const messagesController = require('../../../controllers/messages.controller')

const router = express.Router()

// Routes
router.get('/', messagesController.getMessages)
router.post('/', messagesController.saveMessage)

module.exports = router
