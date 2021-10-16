const express = require('express')
const { PORT } = require('../config')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const appFile = require('./app')


const app = express()

app.use(express.static('public', {
    etag: true,
    lastModified: true,
    setHeaders: (res, path) => {
      const hashRegExp = new RegExp('\\.[0-9a-f]{8}\\.');
  
      if (path.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      } else if (hashRegExp.test(path)) {
        res.setHeader('Cache-Control', 'max-age=31536000');
      }
    },
  }));
app.disable('view cache');

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