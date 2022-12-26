const { HTTP_STATUS } = require('../constants/api.constants')
const { successResponse } = require('../utils/api.utils')
const MessagesDAO = require('../models/daos/messages.dao')

const messagesDAO = new MessagesDAO()

class MessagesController {
  async getMessages(req, res, next) {
    try {
      const messages = await messagesDAO.getAll()
      const response = successResponse(messages)
      res.json(response)
    } catch (err) {
      next(err)
    }
  }

  async saveMessage(req, res, next) {
    const message = req.body
    try {
      const newMessage = await messagesDAO.save(message)
      const response = successResponse(newMessage)
      res.status(HTTP_STATUS.CREATED).json(response)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = new MessagesController()
