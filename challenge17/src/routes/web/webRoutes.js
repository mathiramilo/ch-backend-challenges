const path = require('path')
const express = require('express')
const authMiddleware = require('../../middlewares/auth')

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

router.get('/login', (req, res) => {
  res.sendFile(path.resolve('src/public/pages/login.html'))
})

router.get('/register', (req, res) => {
  res.sendFile(path.resolve('src/public/pages/register.html'))
})

router.get('/info', (req, res) => {
  res.sendFile(path.resolve('src/public/pages/info.html'))
})

module.exports = router
