const MessagesDAO = require('../database/DAOs/messages.dao')
const messagesDAO = new MessagesDAO()

const getMessages = async () => await messagesDAO.getAll()
const saveMessages = async message => await messagesDAO.save(message)

module.exports = {
  getMessages,
  saveMessages
}
