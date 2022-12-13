const passport = require('passport')
const bcrypt = require('bcrypt')
const { HTTP_STATUS } = require('../constants/api.constants')
const { HttpError, successResponse } = require('../utils/api.utils')
const UsersDAO = require('../models/daos/users.dao')

const usersDAO = new UsersDAO()

class AuthController {
  async register(req, res, next) {
    try {
      const { username, password } = req.body
      const user = await usersDAO.getByUsername(username)
      if (user) {
        throw new HttpError(
          HTTP_STATUS.BAD_REQUEST,
          `User with username ${username} already exists`
        )
      }
      if (!user) {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = {
          username,
          password: hashedPassword
        }
        await usersDAO.save(newUser)
        const response = successResponse(newUser)
        res.status(HTTP_STATUS.CREATED).json(response)
      }
    } catch (err) {
      next(err)
    }
  }

  async login(req, res, next) {
    try {
      passport.authenticate('local', (err, user, info) => {
        if (err) next(err)
        if (!user) {
          throw new HttpError(
            HTTP_STATUS.NOT_FOUND,
            'No user found with this username'
          )
        } else {
          req.login(user, err => {
            if (err) next(err)
            const response = successResponse('Successfully Authenticated')
            res.json(response)
          })
        }
      })(req, res, next)
    } catch (err) {
      next(err)
    }
  }

  async logout(req, res, next) {
    try {
    } catch (err) {
      next(err)
    }
  }
}

module.exports = new AuthController()
