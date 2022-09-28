const path = require('path')
const express = require('express')

const router = express.Router()

// Web Routes
router.get('/', (req, res) => {
  res.sendFile(path.resolve('public/index.html'))
})

router.get('/chat', (req, res) => {
  res.sendFile(path.resolve('public/pages/chat.html'))
})

module.exports = router
