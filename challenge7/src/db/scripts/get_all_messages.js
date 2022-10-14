const { sqlite } = require('../config')
const knex = require('knex')(sqlite)

const getAllMessages = async () => {
  try {
    const exists = await knex.schema.hasTable('messages')
    if (exists) {
      const messages = await knex('messages')
      console.table(messages)
    } else {
      console.log('Table messages does not exist')
    }
  } catch (error) {
    console.log(error)
  } finally {
    knex.destroy()
  }
}

module.exports = getAllMessages
