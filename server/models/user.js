const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    login: {
      type: String,
      required: true,
      min: 6,
      max: 255
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 255
    },
  })
  module.exports = model('user', userSchema)
