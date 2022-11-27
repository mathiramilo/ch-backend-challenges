const path = require('path')
const express = require('express')
const authMiddleware = require('../../middlewares/auth')

const router = express.Router()

// Web Routes
router.get('/', authMiddleware, (req, res) => {
  res.sendFile(path.resolve('src/public/index.html'))
})

router.get('/chat', authMiddleware, (req, res) => {
  res.sendFile(path.resolve('src/public/pages/chat.html'))
})

router.get('/randomProducts', authMiddleware, (req, res) => {
  res.sendFile(path.resolve('src/public/pages/randomProducts.html'))
})

router.get('/login', (req, res) => {
  res.sendFile(path.resolve('src/public/pages/login'))
})

router.get('/register', (req, res) => {
  res.sendFile(path.resolve('src/public/pages/register'))
})

module.exports = router
