const express = require('express')
const productsController = require('../../../controllers/products.controller')

const router = express.Router()

// Routes
router.get('/', productsController.getProducts)
router.get('/test', productsController.mockProducts)
router.get('/:id', productsController.getProductById)
router.post('/', productsController.saveProduct)
router.put('/:id', productsController.updateProduct)
router.delete('/:id', productsController.deleteProduct)

module.exports = router
