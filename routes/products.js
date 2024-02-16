module.exports = db => {
  const express = require('express')
  const router = express.Router()
  const productController = require('../controllers/productController')(db)

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
  router.get('/', productController.getAllProducts)

  router.delete('/:id', productController.deleteProduct)
  
  return router
}
