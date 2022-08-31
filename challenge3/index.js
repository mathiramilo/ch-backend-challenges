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
    res.status(204).send('An error has ocurred getting the products')
  }
})

/* Get a random product */
app.get('/randomProduct', async (req, res) => {
  try {
    const randomProduct = await container.getRandom()
    res.send(randomProduct)
  } catch (err) {
    console.log(err.message)
    res.status(204).send('An error has ocurred getting a random product')
  }
})

const server = app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`)
})

server.on('error', err => {
  console.log(err.message)
})
