const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type Product {
    _id: ID!
    title: String!
    price: Float!
    thumbnail: String!
  }

  input ProductInput {
    title: String!
    price: Float!
    thumbnail: String!
  }

  type DeleteProductResponse {
    acknowledged: Boolean
    deletedCount: Int
  }

  type UpdateProductResponse {
    acknowledged: Boolean
    modifiedCount: Int
  }

  type Message {
    _id: ID!
    date: String!
    email: String!
    text: String!
  }

  input MessageInput {
    email: String!
    text: String!
  }

  type User {
    _id: ID!
    email: String!
    password: String!
  }

  input UserInput {
    email: String!
    password: String!
  }

  type UserResponse {
    user: User
    token: String!
  }

  type Query {
    getProducts: [Product]
    getProduct(id: ID!): Product
    getMessages: [Message]
  }

  type Mutation {
    addProduct(input: ProductInput): Product
    updateProduct(id: ID!, input: ProductInput): UpdateProductResponse
    deleteProduct(id: ID!): DeleteProductResponse
    addMessage(input: MessageInput): Message
    createUser(input: UserInput): UserResponse
  }
`)

module.exports = schema
