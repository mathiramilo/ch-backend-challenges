const readlineSync = require('readline-sync')
const colors = require('colors')

const Container = require('./classes/Container')

main()

async function main() {
  // 1. Ask the user for the name of the file
  firstMenu()
  const fileName = readlineSync.question(
    'Enter the name of the file you want to work with: '
  )

  console.log()
  console.log(`${fileName}.txt SELECTED`.magenta)

  const container = createFsHandler(fileName)

  let option = 'initial'

  while (option !== '0') {
    switch (option) {
      case '1':
        // Save product
        console.log()
        console.log('SAVE A PRODUCT'.blue)
        console.log()

        const title = readlineSync.question('Enter a title: ')
        const price = readlineSync.question('Enter a price: ')
        const thumbnail = readlineSync.question('Enter a image url: ')

        console.log()

        try {
          const productId = await container.save({
            title,
            price,
            thumbnail
          })
          console.log(`PRODUCT SAVED! ID: ${productId}`.green)
        } catch (err) {
          console.log('An error has ocurred saving the product'.red)
        }
        break
      case '2':
        // Get product
        console.log()
        console.log('GET PRODUCT'.blue)
        console.log()

        const getId = readlineSync.question('Enter the ID: ')
        const getProduct = await container.getById(getId)

        console.log()

        if (getProduct) {
          console.log(getProduct)
        } else {
          console.log(`There is no product with ID = ${getId}`.red)
        }
        break
      case '3':
        // Get all products
        console.log()
        console.log('ALL PRODUCTS'.blue)
        console.log()
        const allProducts = await container.getAll()
        console.log(allProducts)
        break
      case '4':
        // Delete product
        console.log()
        console.log('DELETE PRODUCT'.blue)
        console.log()

        const deleteId = readlineSync.question('Enter the ID: ')

        console.log()

        try {
          await container.deleteById(deleteId)
        } catch (err) {
          console.log('An error has ocurred deleting the product'.red)
        }
        break
      case '5':
        // Delete all products
        try {
          console.log()
          await container.deleteAll()
          console.log('ALL PRODUCTS HAS BEEN DELETED!'.green)
        } catch (err) {
          console.log('An error has ocurred deleting all products'.red)
        }
        break
      case '0':
        // Exit
        console.log('Exiting...'.black)
        return
      case 'initial':
        break
      default:
        // Invalid option
        console.log()
        console.log('Please enter a valid option'.yellow)
        break
    }

    menu()
    option = readlineSync.question('Enter an option: ')
  }
}

function createFsHandler(fileName) {
  return new Container(fileName)
}

function firstMenu() {
  console.log()
  console.log('FS CRUD SYSTEM'.bgWhite.black)
  console.log()
}

function menu() {
  console.log()
  console.log('FS CRUD SYSTEM'.bgWhite.black)
  console.log()
  console.log('1. Save a product')
  console.log('2. Get a product')
  console.log('3. Get all products')
  console.log('4. Delete a product')
  console.log('5. Delete all products')
  console.log('0. Exit')
  console.log()
}
