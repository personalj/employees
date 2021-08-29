const { Schema, model } = require('mongoose')

const EmployeeItemSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    dateOfBirth: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: true
    },
    salary: {
      type: Number,
      required: true
    },
  })
  module.exports = model('employees', EmployeeItemSchema)
