const { mariaDB } = require('../db/config')
const knex = require('knex')(mariaDB)
const colors = require('colors')

class ProductsHandler {
  constructor() {}

  save = async product => {
    try {
      await knex('products').insert(product)
      console.log('Product saved successfully in the database'.green)
    } catch (err) {
      console.log(err.message.red)
    }
  }

  updateById = async product => {
    try {
      const { id, title, price, thumbnail } = product

      const productToUpdate = await knex('products').where({ id }).first()

      if (!productToUpdate) {
        console.log('Product not found in the database'.red)
        return -1
      }

      await knex('products').where({ id }).update({ title, price, thumbnail })
      console.log('Product updated successfully in the database'.green)
    } catch (err) {
      console.log(err.message.red)
    }
  }

  getById = async productId => {
    try {
      const product = await knex('products').where({ id: productId }).first()

      if (product) {
        console.log('Product found successfully in the database'.green)
        return product
      }
      console.log('Product not found in the database'.red)
      return null
    } catch (err) {
      console.log(err.message.red)
      return null
    }
  }

  getAll = async () => {
    try {
      const products = await knex('products')

      if (products.length > 0) {
        console.log(
          'All products successfully received from the database'.green
        )
        return products
      }

      console.log('No products found in the database'.red)
      return []
    } catch (err) {
      console.log(err.message.red)
      return []
    }
  }

  deleteById = async productId => {
    try {
      const productToDelete = await knex('products')
        .where({ id: productId })
        .first()

      if (!productToDelete) {
        console.log('Product not found in the database'.red)
        return -1
      }

      await knex('products').where({ id: productId }).del()
      console.log('Product deleted successfully from the database'.green)
    } catch (err) {
      console.log(err.message.red)
    }
  }

  deleteAll = async () => {
    try {
      await knex('products').del()
      console.log('All products deleted successfully from the database'.green)
    } catch (err) {
      console.log(err.message.red)
    }
  }
}

module.exports = ProductsHandler
