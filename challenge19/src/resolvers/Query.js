const { getProduct: getProductService, getProducts: getProductsService } = require('../services/products.services')
const { getMessages: getMessagesService } = require('../services/messages.services')

const getProducts = async () => {
  const products = await getProductsService()
  return products
}

const getProduct = async ({ id }) => {
  const product = await getProductService(id)
  return product
}

const getMessages = async () => {
  const messages = await getMessagesService()
  return messages
}

module.exports = {
  getProducts,
  getProduct,
  getMessages
}
