const MongoDAO = require('./mongo.dao')
const messageSchema = require('../schemas/Message')

const collection = 'messages'

class MessagesDAO extends MongoDAO {
  constructor() {
    super(collection, messageSchema)
  }
}

module.exports = new MessagesDAO()
