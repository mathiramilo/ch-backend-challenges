const MongoDAO = require('./mongo.dao')
const productSchema = require('../schemas/Product')

const collection = 'products'

class ProductsDAO extends MongoDAO {
  constructor() {
    super(collection, productSchema)
  }
}

module.exports = new ProductsDAO()
