const { Schema } = require('mongoose')

const messageSchema = new Schema({
  email: { type: String, required: true },
  date: { type: Date, required: true, default: new Date().toLocaleString() },
  text: { type: String, required: true }
})

module.exports = messageSchema
