const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt')
const UsersDAO = require('../models/daos/users.dao')

const usersDAO = new UsersDAO()

// Passport Local Strategy

passport.use(
  'register',
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await usersDAO.getByUsername(username)
      if (user) return done(null, false)
      const newUser = {
        username,
        password: await bcrypt.hash(password, 10)
      }
      await usersDAO.save(newUser)
      console.log('User created successfully', newUser)
      return done(null, newUser)
    } catch (err) {
      console.log('Error creating the user')
      return done(err)
    }
  })
)

passport.use(
  'login',
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await usersDAO.getByUsername(username)
      if (!user) return done(null, false)
      if (!user.verifyPassword(password)) return done(null, false)
      return done(null, user)
    } catch (err) {
      return done(err)
    }
  })
)

// Serialization
passport.serializeUser((user, done) => {
  done(null, user._id)
})

// Deserialization
passport.deserializeUser(async (id, done) => {
  const user = await usersDAO.getById(id)
  done(null, user)
})

module.exports = passport
