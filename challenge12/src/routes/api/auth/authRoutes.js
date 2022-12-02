const express = require('express')
const passport = require('passport')
const AuthController = require('../../../controllers/auth.controller')

const router = express.Router()

router.post(
  '/register',
  passport.authenticate(
    'register',
    {
      failureRedirect: '/register'
    },
    AuthController.register
  )
)
router.post(
  '/login',
  passport.authenticate(
    'login',
    {
      failureRedirect: '/login'
    },
    AuthController.login
  )
)
router.post('/logout')

module.exports = router
