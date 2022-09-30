const fs = require('fs')
const colors = require('colors')

class MessagesHandler {
  constructor(fileName) {
    this.fileName = fileName
  }

  save = async message => {
    try {
      const messages = await this.getAll()
      messages.push(message)

      await fs.promises.writeFile(
        `data/${this.fileName}`,
        JSON.stringify(messages)
      )
    } catch (err) {
      console.log(err.message.red)
    }
  }

  getAll = async () => {
    try {
      const content = await fs.promises.readFile(
        `data/${this.fileName}`,
        'utf-8'
      )
      const messages = JSON.parse(content || '[]')
      return messages
    } catch (err) {
      console.log(err.message.red)
      return []
    }
  }
}

module.exports = MessagesHandler
