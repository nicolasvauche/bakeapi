const express = require('express')
const connectDB = require('./services/mongodb')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swagger')

const app = express()
const defaultRoutes = require('./routes/default')
const helloRoutes = require('./routes/hello')
const productRoutes = require('./routes/products')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())

connectDB().then(db => {
  app.locals.db = db
  app.use('/api', defaultRoutes)
  app.use('/api/hello', helloRoutes)
  app.use('/api/products', productRoutes(app.locals.db))
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

module.exports = app