const express = require('express')
const router = express.Router()
const helloController = require('../controllers/helloController')

router.get('/:name', helloController.helloGet)
router.post('/', helloController.helloPost)

module.exports = router
