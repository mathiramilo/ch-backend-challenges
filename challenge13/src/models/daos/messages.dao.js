const MongoContainer = require('../containers/mongo.container')
const messageSchema = require('../schemas/message.schema')

const collection = 'messages'

class MessagesDAO extends MongoContainer {
  constructor() {
    super(collection, messageSchema)
  }
}

module.exports = MessagesDAO
