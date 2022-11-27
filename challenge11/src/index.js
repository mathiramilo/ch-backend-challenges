const path = require('path')

const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const { Server: HttpServer } = require('http')
const { Server: SocketServer } = require('socket.io')

const dbConfig = require('./db/db.config')

const logger = require('./middlewares/logger')
const errorMiddleware = require('./middlewares/error')

const apiRoutes = require('./routes/api/apiRoutes')
const webRoutes = require('./routes/web/webRoutes')

const MongoContainer = require('./models/containers/mongo.container')
const ProductsDAO = require('./models/daos/products.dao')
const MessagesDAO = require('./models/daos/messages.dao')

const productsDAO = new ProductsDAO()
const messagesDAO = new MessagesDAO()

const PORT = process.env.PORT || 8080

const app = express()
const http = new HttpServer(app)
const io = new SocketServer(http)

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('src/public'))
app.use(cookieParser())
app.use(
  session({
    secret: 'ch-backend-challenges',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
    store: MongoStore.create({
      mongoUrl: dbConfig.mongodb.uri,
      collectionName: 'users'
    })
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(logger)

// Routes
app.use(webRoutes)
app.use('/api', apiRoutes)
app.get('*', (req, res) => {
  res.status(404).sendFile(path.resolve(__dirname + '/public/pages/404.html'))
})
app.use(errorMiddleware)

// Http server init & config
const server = http.listen(PORT, () => {
  MongoContainer.connect().then(() => {
    console.log(`Server is up and running on port ${PORT}`)
    console.log('Connected to database')
  })
})

server.on('error', error => {
  console.error(`Error: ${error}`)
})

// Socket Events
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
