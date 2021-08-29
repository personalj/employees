const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const cors = require('cors');

const keys = require('./keys')
const app = express()

app.use(cors());

mongoose.connect(keys.mongoUri, () => {
  console.log('connected')
})

app.use(bodyParser.json())


module.exports = app
