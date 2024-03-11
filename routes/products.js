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
   *     summary: Liste tous les produits
   *     description: Retourne la liste des produits
   *     responses:
   *       200:
   *         description: La liste des produits au format JSON
   */
  router.get('/', productController.getAllProducts)

  router.get('/:id', productController.getProduct)

  /**
   * @openapi
   * /products:
   *   post:
   *     tags:
   *       - Products
   *     summary: Ajoute un nouveau produit
   *     description: Ajoute un nouveau produit
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: Le nom du produit
   *                 example: Baguette rustique
   *               price:
   *                 type: number
   *                 description: Le prix du produit
   *                 example: 1.92
   *               status:
   *                 type: string
   *                 description: Le statut du produit
   *                 example: En vente || Invendu
   *     responses:
   *       201:
   *         description: Produit ajouté avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: string
   *                   description: L'identifiant du produit
   *                   example: 65cf462667ad658ed0e392c3
   *                 name:
   *                   type: string
   *                   description: Le nom du produit
   *                   example: Baguette rustique
   *                 price:
   *                   type: number
   *                   description: Le prix du produit
   *                   example: 1.92
   *                 status:
   *                   type: string
   *                   description: Le statut du produit
   *                   example: En vente
   *       500:
   *         description: Erreur serveur
   */
  router.post('/', productController.addProduct)

  /**
   * @openapi
   * /products/{id}:
   *   put:
   *     tags:
   *       - Products
   *     summary: Met à jour un produit existant par son ID
   *     description: Met à jour les informations d'un produit existant dans la base de données.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID du produit à mettre à jour
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: Le nom du produit
   *                 example: Pain au chocolat
   *               price:
   *                 type: number
   *                 description: Le prix du produit
   *                 example: 1.27
   *               status:
   *                 type: string
   *                 description: Le statut du produit
   *                 example: En vente || Invendu
   *     responses:
   *       200:
   *         description: Produit mis à jour avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: string
   *                   description: L'identifiant du produit
   *                   example: 65cf462667ad658ed0e392c3
   *                 name:
   *                   type: string
   *                   description: Le nom du produit
   *                   example: Pain au chocolat
   *                 price:
   *                   type: number
   *                   description: Le prix du produit
   *                   example: 1.27
   *                 status:
   *                   type: string
   *                   description: Le statut du produit
   *                   example: Invendu
   *       404:
   *         description: Produit non trouvé
   *       500:
   *         description: Erreur serveur
   */
  router.put('/:id', productController.editProduct) // Nouvelle route pour la mise à jour d'un produit

  /**
   * @openapi
   * /products/{id}:
   *   delete:
   *     tags:
   *       - Products
   *     summary: Supprime un produit par son ID
   *     description: Supprime un produit par son ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID du produit à supprimer
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Produit {id} supprimé avec succès
   *       404:
   *         description: Produit non trouvé
   *       500:
   *         description: Erreur serveur
   */
  router.delete('/:id', productController.deleteProduct)

  return router
}
