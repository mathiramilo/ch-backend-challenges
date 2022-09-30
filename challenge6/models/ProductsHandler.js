const fs = require('fs')
const colors = require('colors')

class Container {
  constructor(fileName) {
    this.fileName = fileName
  }

  save = async product => {
    try {
      const products = await this.getAll()
      products.push(product)

      await fs.promises.writeFile(
        `data/${this.fileName}`,
        JSON.stringify(products)
      )
    } catch (err) {
      console.log(err.message.red)
    }
  }

  updateById = async product => {
    try {
      const { id, title, price, thumbnail } = product
      const products = await this.getAll()
      const productIndex = products.findIndex(prod => prod.id === id)

      if (productIndex < 0) return -1

      const newProduct = {
        ...products[productIndex],
        title,
        price,
        thumbnail
      }
      products[productIndex] = newProduct
      await fs.promises.writeFile(
        `data/${this.fileName}`,
        JSON.stringify(products)
      )
    } catch (err) {
      console.log(err.message.red)
    }
  }

  getById = async productId => {
    try {
      const products = await this.getAll()
      const product = products.find(prod => prod.id === productId)

      if (product) return product
      return null
    } catch (err) {
      console.log(err.message.red)
      return null
    }
  }

  getRandom = async () => {
    try {
      const products = await this.getAll()
      const randomIndex = Math.floor(Math.random() * products.length)

      const randomProduct = products[randomIndex]

      if (randomProduct) return randomProduct
      return null
    } catch (err) {
      console.log(err.message.red)
      return null
    }
  }

  getAll = async () => {
    try {
      const content = await fs.promises.readFile(
        `data/${this.fileName}`,
        'utf-8'
      )
      const products = JSON.parse(content || '[]')
      return products
    } catch (err) {
      console.log(err.message.red)
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
          `data/${this.fileName}`,
          JSON.stringify(newProducts)
        )
      } else {
        return -1
      }
    } catch (err) {
      console.log(err.message.red)
    }
  }

  deleteAll = async () => {
    try {
      await fs.promises.writeFile(`data/${this.fileName}`, '[]')
    } catch (err) {
      console.log(err.message.red)
    }
  }
}

module.exports = Container
