const MongoDAO = require('./mongo.dao')
const userSchema = require('../schemas/User')

const collection = 'users'

class UsersDAO extends MongoDAO {
  constructor() {
    super(collection, userSchema)
  }

  async getByUsername(username) {
    const user = await this.model.findOne({ username }, { __v: 0 })
    if (!user) {
      return null
    }
    return user
  }
}

module.exports = new UsersDAO()
