const MessagesDAO = require('../models/DAOs/messages.dao')

const getMessages = async () => await MessagesDAO.getAll()
const saveMessage = async message => await MessagesDAO.save(message)

module.exports = {
  getMessages,
  saveMessage
}
