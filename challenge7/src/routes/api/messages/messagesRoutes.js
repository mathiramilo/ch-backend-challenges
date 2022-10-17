const express = require('express')
const MessagesHandler = require('../../../models/MessagesHandler')

const messagesHandler = new MessagesHandler('messages.json')

const router = express.Router()

// Routes
router.get('/', async (req, res) => {
  try {
    const messages = await messagesHandler.getAll()
    res.json({ success: true, result: messages })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'An error has ocurred getting all messages'
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const { email, text } = req.body

    if (!email || !text) {
      return res.status(400).json({
        success: false,
        error: 'Wrong body format: email and text fields are required'
      })
    }
    if (typeof email !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Wrong body format: email must be a string'
      })
    }
    if (typeof text !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Wrong body format: text must be a string'
      })
    }

    const newMessage = {
      email,
      date: new Date().toLocaleString(),
      text
    }

    await messagesHandler.save(newMessage)
    return res.json({ success: true, result: newMessage })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'An error has ocurred saving the message'
    })
  }
})

module.exports = router
