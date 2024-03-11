module.exports = db => {
  const express = require('express')
  const router = express.Router()
  const userController = require('../controllers/userController')(db)

  router.post('/', userController.addUser)

  return router
}
