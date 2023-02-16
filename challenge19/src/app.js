// Imports
const express = require('express')
const { graphqlHTTP } = require('express-graphql')

const schema = require('./gql/schema')
const { getProducts, getProduct, getMessages } = require('./resolvers/Query')
const { addProduct, updateProduct, deleteProduct, addMessage, createUser } = require('./resolvers/Mutation')

const loggerMiddleware = require('./middlewares/logger')
const errorMiddleware = require('./middlewares/error')

const webRoutes = require('./routes/web/webRoutes')

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('src/public'))
app.use(loggerMiddleware)

// GraphQL
const rootValue = {
  getProducts,
  getProduct,
  getMessages,
  addProduct,
  updateProduct,
  deleteProduct,
  addMessage,
  createUser
}

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
  })
)

// Routes
app.use(webRoutes)
app.use(errorMiddleware)

module.exports = app
