const express = require('express')
const { PORT } = require('../config')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const appFile = require('./app')


const app = express()

dotenv.config()

app.use(bodyParser.json());

app.use(cors())
const employees = require('./routes/api/employees')
const authRoutes = require('./routes/auth.routes')

app.use(express.json())
app.use('/api/employees', employees)
app.use('/api/users', authRoutes)

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})