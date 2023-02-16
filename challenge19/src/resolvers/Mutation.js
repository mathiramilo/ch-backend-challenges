const {
  saveProduct,
  updateProduct: updateProductService,
  deleteProduct: deleteProductService
} = require('../services/products.services')
const { saveMessage } = require('../services/messages.services')
const { saveUser } = require('../services/users.services')

const addProduct = async ({ input }) => {
  const product = await saveProduct(input)
  return product
}

const updateProduct = async ({ id, input }) => {
  const product = await updateProductService(id, input)
  return product
}

const deleteProduct = async ({ id }) => {
  const product = await deleteProductService(id)
  console.log(product)
  return product
}

const addMessage = async ({ input }) => {
  const message = await saveMessage(input)
  return message
}

const createUser = async ({ input }) => {
  const user = await saveUser(input)
  return user
}

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  addMessage,
  createUser
}
