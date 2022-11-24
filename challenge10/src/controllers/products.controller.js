const { faker } = require('@faker-js/faker')
const { HTTP_STATUS } = require('../constants/api.constants')
const { successResponse } = require('../utils/api.utils')
const ProductsDAO = require('../models/daos/products.dao')

const productsDAO = new ProductsDAO()

class ProductsController {
  async getProducts(req, res, next) {
    try {
      const products = await productsDAO.getAll()
      const response = successResponse(products)
      res.json(response)
    } catch (err) {
      next(err)
    }
  }

  async getProductById(req, res, next) {
    const { id } = req.params
    try {
      const product = await productsDAO.getById(id)
      const response = successResponse(product)
      res.json(response)
    } catch (err) {
      next(err)
    }
  }

  async saveProduct(req, res, next) {
    try {
      const newProduct = await productsDAO.save(req.body)
      const response = successResponse(newProduct)
      res.status(HTTP_STATUS.CREATED).json(response)
    } catch (err) {
      next(err)
    }
  }

  async updateProduct(req, res, next) {
    const { id } = req.params
    try {
      const updatedProduct = await productsDAO.update(id, req.body)
      const response = successResponse(updatedProduct)
      res.json(response)
    } catch (err) {
      next(err)
    }
  }

  async deleteProduct(req, res, next) {
    const { id } = req.params
    try {
      const deletedProduct = await productsDAO.delete(id)
      const response = successResponse(deletedProduct)
      res.json(response)
    } catch (err) {
      next(err)
    }
  }

  async mockProducts(req, res, next) {
    try {
      const products = []
      for (let i = 0; i < 5; i++) {
        products.push({
          title: faker.commerce.product(),
          price: faker.commerce.price(1, 1000, 2),
          thumbnail: faker.image.imageUrl(64, 64, 'product', true)
        })
      }
      const response = successResponse(products)
      res.json(response)
    } catch (error) {
      next(err)
    }
  }
}

module.exports = new ProductsController()
