// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port: 3307,
      user: 'root',
      password: '',
      database: 'ch_challenges_ecommerce'
    },
    migrations: {
      directory: './src/db/migrations'
    }
  }
}
