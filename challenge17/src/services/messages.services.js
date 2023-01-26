const MessagesDAO = require('../database/DAOs/messages.dao')

const getMessages = async () => await MessagesDAO.getAll()
const saveMessages = async message => await MessagesDAO.save(message)

module.exports = {
  getMessages,
  saveMessages
}
