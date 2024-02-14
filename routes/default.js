const express = require('express')
const router = express.Router()
const defaultController = require('../controllers/defaultController')

router.get('/', defaultController.index)
router.get('/contact', defaultController.contact)

module.exports = router
