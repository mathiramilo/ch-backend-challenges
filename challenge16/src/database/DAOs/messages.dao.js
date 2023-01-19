const MongoContainer = require('../containers/mongo.container')
const messageSchema = require('../models/Message')

const collection = 'messages'

class MessagesDAO extends MongoContainer {
  constructor() {
    super(collection, messageSchema)
  }
}

module.exports = MessagesDAO
