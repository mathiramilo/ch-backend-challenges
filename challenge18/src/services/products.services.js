const { faker } = require('@faker-js/faker')
const ProductsDAO = require('../models/DAOs/products.dao')

const getProducts = async () => await ProductsDAO.getAll()
const getProduct = async id => await ProductsDAO.getById(id)
const saveProduct = async product => await ProductsDAO.save(product)
const updateProduct = async (id, product) => await ProductsDAO.update(id, product)
const deleteProduct = async id => await ProductsDAO.delete(id)
const mockProducts = async () => {
  const products = []
  for (let i = 0; i < 5; i++) {
    products.push({
      title: faker.commerce.product(),
      price: faker.commerce.price(1, 1000, 2),
      thumbnail: faker.image.imageUrl(64, 64, 'product', true)
    })
  }
  return products
}

module.exports = {
  getProducts,
  getProduct,
  saveProduct,
  updateProduct,
  deleteProduct,
  mockProducts
}
