const path = require('path')
const express = require('express')

const router = express.Router()

// Web Routes
router.get('/', (req, res) => {
  res.sendFile(path.resolve('src/public/index.html'))
})

router.get('/chat', (req, res) => {
  res.sendFile(path.resolve('src/public/pages/chat.html'))
})

router.get('/randomProducts', (req, res) => {
  res.sendFile(path.resolve('src/public/pages/randomProducts.html'))
})

module.exports = router
