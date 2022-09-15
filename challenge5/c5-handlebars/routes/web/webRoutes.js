const express = require('express')
const Container = require('../../models/Container')

const container = new Container('products.json')

const router = express.Router()

// Web Routes
router.get('/', (req, res) => {
  res.render('index')
})

router.get('/products', async (req, res) => {
  try {
    const products = await container.getAll()
    res.render('products', {
      products,
      existProducts: products.length > 0 ? true : false
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'An error has ocurred getting all products'
    })
  }
})

module.exports = router
