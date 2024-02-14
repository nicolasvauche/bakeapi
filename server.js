require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swagger')

const app = express()
let port = process.env.APP_PORT || 3000

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())

const defaultRoutes = require('./routes/default')
const helloRoutes = require('./routes/hello')

app.use('/api', defaultRoutes)
app.use('/api/hello', helloRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const startServer = port => {
  const server = app
    .listen(port, () => {
      console.log(`Server is listening on http://localhost:${port}`)
    })
    .on('error', err => {
      if (err.code === 'EADDRINUSE') {
        console.error(
          `Port ${port} is already in use, trying port ${parseInt(port) + 1}…`
        )
        startServer(parseInt(port) + 1)
      } else {
        console.error(err)
        process.exit(1)
      }
    })
}

startServer(port)
