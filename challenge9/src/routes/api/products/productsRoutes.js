const express = require('express')
const { faker } = require('@faker-js/faker')
const ProductsHandler = require('../../../models/ProductsHandler')

const productsHandler = new ProductsHandler()

const router = express.Router()

// Routes
router.get('/', async (req, res) => {
  try {
    const products = await productsHandler.getAll()
    res.json({ success: true, result: products })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'An error has ocurred getting all products'
    })
  }
})

router.get('/test', (req, res) => {
  try {
    const products = []
    for (let i = 0; i < 5; i++) {
      products.push({
        title: faker.commerce.product(),
        price: faker.commerce.price(1, 1000, 2),
        thumbnail: faker.image.imageUrl(64, 64, 'product', true)
      })
    }
    res.json({ success: true, result: products })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      error: 'An error has ocurred getting the products'
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await productsHandler.getById(id)
    if (product) {
      res.json({ success: true, result: product })
    } else {
      res.status(404).json({ success: false, error: 'Product not found' })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'An error has ocurred getting the product'
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const { title, price, thumbnail } = req.body

    if (!title || !price || !thumbnail) {
      return res.status(400).json({
        success: false,
        error:
          'Wrong body format: title, price and thumbnail fields are required'
      })
    }
    if (typeof title !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Wrong body format: title must be a string'
      })
    }
    if (typeof price !== 'number') {
      return res.status(400).json({
        success: false,
        error: 'Wrong body format: price must be a number'
      })
    }
    if (typeof thumbnail !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Wrong body format: thumbnail must be a string'
      })
    }

    const newProduct = { title, price, thumbnail }
    await productsHandler.save(newProduct)
    return res.json({ success: true, result: newProduct })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'An error has ocurred saving the product'
    })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const {
      params: { id },
      body: { title, price, thumbnail }
    } = req

    if (!title || !price || !thumbnail) {
      return res.status(400).json({
        success: false,
        error:
          'Wrong body format: title, price and thumbnail fields are required'
      })
    }
    if (typeof title !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Wrong body format: title must be a string'
      })
    }
    if (typeof price !== 'number') {
      return res.status(400).json({
        success: false,
        error: 'Wrong body format: price must be a number'
      })
    }
    if (typeof thumbnail !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Wrong body format: thumbnail must be a string'
      })
    }

    const productUpdated = { id, title, price, thumbnail }
    const updateByIdResult = await productsHandler.updateById(productUpdated)

    if (updateByIdResult === -1) {
      return res.status(404).json({
        success: false,
        error: `Product with id: ${id} does not exist`
      })
    } else {
      return res.json({ success: true, result: productUpdated })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'An error has ocurred updating the product'
    })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleteByIdResult = await productsHandler.deleteById(id)

    if (deleteByIdResult === -1) {
      return res.status(404).json({
        success: false,
        error: `Product with id: ${id} does not exist`
      })
    } else {
      return res.json({
        success: true,
        result: `Product with id: ${id} deleted`
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'An error has ocurred deleting the product'
    })
  }
})

module.exports = router
