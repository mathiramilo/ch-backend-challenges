const logger = require('../utils/logger.utils')

const loggerMiddleware = (req, res, next) => {
  const method = req.method
  const url = req.url

  logger.info(`${method} => ${url}`)
  next()
}

module.exports = loggerMiddleware
