const path = require('path')
const { createLogger, format, transports } = require('winston')

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.resolve(__dirname, '../logs/warn.log'),
      level: 'warn'
    }),
    new transports.File({
      filename: path.resolve(__dirname, '../logs/error.log'),
      level: 'error'
    })
  ],
  format: format.combine(
    format.timestamp(),
    format.colorize({ all: true }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  )
})

module.exports = logger
