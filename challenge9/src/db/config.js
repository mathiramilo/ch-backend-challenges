module.exports = {
  mariaDB: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port: 3307,
      user: 'root',
      password: '',
      database: 'ch_challenges_ecommerce'
    }
  },
  sqlite: {
    client: 'sqlite3',
    connection: {
      filename: './src/db/ecommerce.sqlite'
    },
    useNullAsDefault: true
  }
}
