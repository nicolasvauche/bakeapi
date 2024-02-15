const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productsController')

/**
 * @openapi
 * /products:
 *   get:
 *     tags:
 *       - Products
 *     description: Retourne la liste des produits
 *     responses:
 *       200:
 *         description: La liste des produits au format JSON
 */
router.get('/', productsController.getAllProducts)

module.exports = router
