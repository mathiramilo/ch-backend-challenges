const knex = require('knex')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const exists = await knex.schema.hasTable('products')
  if (!exists) {
    return knex.schema.createTable('products', table => {
      table.increments('id').primary()
      table.string('title').notNullable()
      table.float('price').notNullable()
      table.string('thumbnail').notNullable()
    })
  }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  const exists = await knex.schema.hasTable('products')
  if (exists) {
    return knex.schema.dropTable('products')
  }
}
