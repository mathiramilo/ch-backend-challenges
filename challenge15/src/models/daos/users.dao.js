const MongoContainer = require('../containers/mongo.container')
const userSchema = require('../schemas/user.schema')

const collection = 'users'

class UsersDAO extends MongoContainer {
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

module.exports = UsersDAO
