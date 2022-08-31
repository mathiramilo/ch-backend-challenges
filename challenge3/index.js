const express = require('express')
const Container = require('./classes/Container')

const PORT = process.env.PORT || 8080

const app = express()
const container = new Container('products')

/* Get all products */
app.get('/products', async (req, res) => {
  try {
    const products = await container.getAll()
    res.send(products)
  } catch (err) {
    console.log(err.message)
  }
})

/* Get a random product */
app.get('/randomProduct', async (req, res) => {
  try {
    const randomProduct = await container.getRandom()
    res.send(randomProduct)
  } catch (err) {
    console.log(err.message)
  }
})

const server = app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`)
})

server.on('error', err => {
  console.log(err.message)
})
