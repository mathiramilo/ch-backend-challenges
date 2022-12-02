// Imports
const app = require('./app')
const { Server: HttpServer } = require('http')
const { Server: SocketServer } = require('socket.io')
const config = require('./config')
const MongoContainer = require('./models/containers/mongo.container')
const ProductsDAO = require('./models/daos/products.dao')
const MessagesDAO = require('./models/daos/messages.dao')

// DAOs initialization
const productsDAO = new ProductsDAO()
const messagesDAO = new MessagesDAO()

// Servers initialization
const http = new HttpServer(app)
const io = new SocketServer(http)

// Http server init & config
const server = http.listen(config.PORT, () => {
  MongoContainer.connect().then(() => {
    console.log(`Server is up and running on port ${config.PORT}`)
    console.log('Connected to database')
  })
})

server.on('error', error => {
  console.error(`Error: ${error}`)
})

// Socket server init & events
io.on('connection', async socket => {
  console.log('New client connection - ID:', socket.id)

  // Getting all products
  const products = await productsDAO.getAll()
  socket.emit('products', { products })

  // New Product
  socket.on('new-product', async data => {
    const products = await productsDAO.getAll()
    io.emit('products', { products })
  })

  // Getting all messages
  const messages = await messagesDAO.getAll()
  socket.emit('messages', { messages })

  // New Message
  socket.on('new-message', async data => {
    const messages = await messagesDAO.getAll()
    io.emit('messages', { messages })
  })
})
