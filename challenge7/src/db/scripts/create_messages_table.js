const { sqlite } = require('../config')
const knex = require('knex')(sqlite)

const createMessagesTable = async () => {
  try {
    const exists = await knex.schema.hasTable('messages')
    if (!exists) {
      knex.schema.createTable('messages', table => {
        table.increments('id').primary()
        table.string('email').notNullable()
        table.string('date').notNullable()
        table.string('text').notNullable()
      })
      console.log('Table messages created successfully')
    }
  } catch (error) {
    console.log(error)
  } finally {
    knex.destroy()
  }
}

module.exports = createMessagesTable
