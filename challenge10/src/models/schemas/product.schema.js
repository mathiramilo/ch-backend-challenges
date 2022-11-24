const { Schema } = require('mongoose')

const productSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true }
})

module.exports = productSchema
