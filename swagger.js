const swaggerJsdoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BakeAPI',
      version: '1.0.0',
      description: 'Mon API de gestion de Boulangerie'
    },
    servers: [
      {
        url: 'http://localhost:3000/api'
      }
    ]
  },
  apis: ['./routes/*.js', './controllers/*.js']
}

const swaggerSpec = swaggerJsdoc(options)

module.exports = swaggerSpec
