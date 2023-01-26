const { HTTP_STATUS } = require('../constants/api.constants')
const { successResponse } = require('../utils/api.utils')
const { saveUser, getUserByUsername } = require('../services/users.services')

class AuthController {
  async register(req, res, next) {
    try {
      const newUser = await saveUser(req.body)
      const response = successResponse({ newUser, token: newUser.getSignedJwtToken() })
      res.status(HTTP_STATUS.CREATED).json(response)
    } catch (err) {
      next(err)
    }
  }

  async login(req, res, next) {
    const { username, password } = req.body

    try {
      if (!username || !password) {
        const message = 'Please enter an username and password'
        throw new HttpError(HTTP_STATUS.BAD_REQUEST, message)
      }

      const user = await getUserByUsername(username)

      const isMatch = await user.matchPasswords(password)

      if (!isMatch) {
        const message = 'Username or password incorrect'
        throw new HttpError(HTTP_STATUS.UNAUTHORIZED, message)
      }

      const response = successResponse({
        user,
        token: user.getSignedJwtToken()
      })
      res.status(HTTP_STATUS.OK).json(response)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = new AuthController()
