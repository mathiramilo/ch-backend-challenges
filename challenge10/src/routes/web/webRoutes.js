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

router.get('/login', (req, res) => {
  const username = req.session?.username
  if (username) {
    res.redirect('/')
  } else {
    res.sendFile(path.resolve('src/public/pages/login.html'))
  }
})

router.get('/logout', (req, res) => {
  const username = req.session?.username
  if (username) {
    req.session.destroy(err => {
      if (!err) {
        res.clearCookie('username')
        res.sendFile(path.resolve('src/public/pages/logout.html'))
      } else {
        res.redirect('/login')
      }
    })
  } else {
    res.redirect('/login')
  }
})

router.post('/login', (req, res) => {
  const { username } = req.body
  req.session.user = username
  req.session.save(err => {
    if (err) {
      console.log('Session error: ', err)
      return res.redirect('/login')
    }
    res.redirect('/')
    res.cookie('username', username)
  })
})

module.exports = router
