/* 

  Container {
    fileName: String

    save: (Product) => Number
    getById: (Number) => Product
    getAll: () => Product[]
    deleteById: (Number) => void
    deleteAll: () => void
  }

  Product {
    id: String
    title: String
    price: Number
    thumbnail: String
  }

*/

const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const colors = require('colors')

class Container {
  constructor(fileName) {
    this.fileName = fileName
  }

  save = async product => {
    try {
      product.id = uuidv4()

      const products = await this.getAll()
      products.push(product)

      await fs.promises.writeFile(
        `products/${this.fileName}.txt`,
        JSON.stringify(products)
      )
      return product.id
    } catch (err) {
      console.log(err.message)
    }
  }

  getById = async productId => {
    try {
      const products = await this.getAll()
      const product = products.find(prod => prod.id === productId)

      if (product) return product
      return null
    } catch (err) {
      return null
    }
  }

  getAll = async () => {
    try {
      const content = await fs.promises.readFile(
        `products/${this.fileName}.txt`,
        'utf-8'
      )
      const products = JSON.parse(content || '[]')
      return products
    } catch (err) {
      return []
    }
  }

  deleteById = async productId => {
    try {
      const allProducts = await this.getAll()
      const productToDelete = allProducts.find(prod => prod.id === productId)

      if (productToDelete) {
        const newProducts = allProducts.filter(prod => prod.id !== productId)

        await fs.promises.writeFile(
          `products/${this.fileName}.txt`,
          JSON.stringify(newProducts)
        )

        console.log(`PRODUCT DELETED! ID: ${deleteId}`.green)
      } else {
        throw new Error(`There is no product with ID = ${productId}`)
      }
    } catch (err) {
      console.log(err.message.red)
    }
  }

  deleteAll = async () => {
    try {
      await fs.promises.writeFile(`products/${this.fileName}.txt`, '')
    } catch (err) {
      console.log(err.message)
    }
  }
}

module.exports = Container
