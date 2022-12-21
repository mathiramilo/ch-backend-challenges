const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt')
const UsersDAO = require('../models/daos/users.dao')

const usersDAO = new UsersDAO()

// Passport Local Strategy
module.exports = function (passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const user = await usersDAO.getByUsername(username)
      if (!user) return done(null, false)
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw new Error(err)
        if (result) return done(null, user)
        else return done(null, false)
      })
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
}
