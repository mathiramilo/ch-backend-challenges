const { faker } = require('@faker-js/faker')
const ProductsDAO = require('../database/DAOs/products.dao')
const productsDAO = new ProductsDAO()

const getProducts = async () => await productsDAO.getAll()
const getProduct = async id => await productsDAO.getById(id)
const saveProduct = async product => await productsDAO.save(product)
const updateProduct = async (id, product) => await productsDAO.update(id, product)
const deleteProduct = async id => await productsDAO.delete(id)
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
