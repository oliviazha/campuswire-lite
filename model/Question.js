const { Schema, model } = require('mongoose')

const questionSchema = new Schema({
  name: String,
  questionText: { type: String, required: true },
  answer: { type: String },
  author: { type: String, required: true },
})

module.exports = model('Question', questionSchema)
