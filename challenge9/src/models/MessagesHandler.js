const { sqlite } = require('../db/config')
const knex = require('knex')(sqlite)
const colors = require('colors')

class MessagesHandler {
  constructor(fileName) {
    this.fileName = fileName
  }

  save = async message => {
    try {
      await knex('messages').insert(message)
      console.log('Message saved successfully in the database'.green)
    } catch (err) {
      console.log(err.message.red)
    }
  }

  getAll = async () => {
    try {
      const messages = await knex('messages')

      if (messages.length > 0) {
        console.log(
          'All messages successfully received from the database'.green
        )
        return messages
      }

      console.log('No messages found in the database'.red)
      return []
    } catch (err) {
      console.log(err.message.red)
      return []
    }
  }
}

module.exports = MessagesHandler
