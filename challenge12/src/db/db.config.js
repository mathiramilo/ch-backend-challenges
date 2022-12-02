const config = require('../config')

const dbConfig = {
  mongodb: {
    uri: config.MONGO_URI
  }
}

module.exports = dbConfig
