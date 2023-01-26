const jwt = require('jsonwebtoken')
const config = require('../config')
const { HTTP_STATUS } = require('../constants/api.constants')
const { HttpError } = require('../utils/api.utils')
const { getUser } = require('../services/users.services')

const authMiddleware = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(new HttpError(HTTP_STATUS.UNAUTHORIZED, 'Not authorized to access this route'))
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.JWT_SECRET)

    const user = await getUser(decoded.id)

    if (!user) {
      return next(new HttpError(HTTP_STATUS.NOT_FOUND, 'No user found with this id'))
    }

    req.user = user
    next()
  } catch (error) {
    return next(new HttpError(HTTP_STATUS.UNAUTHORIZED, 'Not authorized to access this route'))
  }
}

module.exports = authMiddleware
