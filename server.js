require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')

const app = express()
let port = process.env.APP_PORT || 3000

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.get('/contact', (req, res) => {
  res.send('Contactez-nous!')
})

app.get('/test/:name', (req, res) => {
  res.send(`Bonjour ${req.params.name}`)
})

app.post('/test', (req, res) => {
  res.send(`Bonjour ${req.body.name}`)
})

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
