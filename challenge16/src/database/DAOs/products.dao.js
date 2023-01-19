const MongoContainer = require('../containers/mongo.container')
const productSchema = require('../models/Product')

const collection = 'products'

class ProductsDAO extends MongoContainer {
  constructor() {
    super(collection, productSchema)
  }
}

module.exports = ProductsDAO
