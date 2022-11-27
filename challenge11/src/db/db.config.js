const envConfig = require('../config')

const dbConfig = {
  mongodb: {
    uri: envConfig.MONGO_URI
  }
}

module.exports = dbConfig
