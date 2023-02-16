const mongoose = require('mongoose')
const config = require('../config')

const connect = async () => {
  await mongoose.connect(config.MONGO_URI)
}

const disconnect = async () => {
  await mongoose.disconnect()
}

module.exports = { connect, disconnect }
