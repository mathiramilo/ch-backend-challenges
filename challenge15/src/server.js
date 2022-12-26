// Imports
const os = require('os')
const cluster = require('cluster')
const { Server: HttpServer } = require('http')
const { Server: SocketServer } = require('socket.io')
const app = require('./app')
const config = require('./config')
const logger = require('./utils/logger')
const MongoContainer = require('./models/containers/mongo.container')
const ProductsDAO = require('./models/daos/products.dao')
const MessagesDAO = require('./models/daos/messages.dao')

// DAOs initialization
const productsDAO = new ProductsDAO()
const messagesDAO = new MessagesDAO()

if (config.MODE === 'cluster' && cluster.isPrimary) {
  const cpus = os.cpus().length
  for (let i = 0; i < cpus; i++) {
    cluster.fork()
  }
} else {
  // Servers initialization
  const http = new HttpServer(app)
  const io = new SocketServer(http)

  // Http server init & config
  const server = http.listen(config.PORT, () => {
    MongoContainer.connect().then(() => {
      logger.info(`Server is up and running on port ${config.PORT}`)
      logger.info('Connected to database')
    })
  })

  server.on('error', error => {
    logger.error(`Error: ${error}`)
  })

  // Socket server init & events
  io.on('connection', async socket => {
    logger.info(`New client connection - ID: ${socket.id}`)

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
}
