module.exports = db => {
  const express = require('express')
  const router = express.Router()
  const productController = require('../controllers/productController')(db)
  const auth = require('../middlewares/auth')

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
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   _id:
   *                     type: string
   *                     description: L'identifiant du produit
   *                   name:
   *                     type: string
   *                     description: Le nom du produit
   *                   price:
   *                     type: number
   *                     description: Le prix du produit
   *                   status:
   *                     type: string
   *                     description: Le statut du produit
   *             examples:
   *               productList:
   *                 summary: Exemple de liste de produits
   *                 value: [
   *                   {
   *                     "_id": "65cf462667ad658ed0e392c3",
   *                     "name": "Baguette rustique",
   *                     "price": 1.92,
   *                     "status": "En vente"
   *                   },
   *                   {
   *                     "_id": "54bf662436trd658er3e342a",
   *                     "name": "Croissant au beurre",
   *                     "price": 0.69,
   *                     "status": "Invendu"
   *                   }
   *                 ]
   */
  router.get('/', productController.getAllProducts)

  /**
   * @openapi
   * /products/{id}:
   *   get:
   *     tags:
   *       - Products
   *     summary: Détails d'un produit
   *     description: Retourne les détails d'un produit
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID du produit à rechercher
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Les détails d'un produit au format JSON
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
   *       404:
   *         description: Produit non trouvé
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   description: Le message d'erreur
   *                   example: Product not found
   */
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
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   description: Le message d'erreur
   */
  router.post('/', auth, productController.addProduct)

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
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   description: Le message d'erreur
   *                   example: Product not found
   *       500:
   *         description: Erreur serveur
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   description: Le message d'erreur
   */
  router.put('/:id', auth, productController.editProduct)

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
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: Le message de succès après suppression
   *                   example: Product {id} was successfully deleted
   *       404:
   *         description: Produit non trouvé
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   description: Le message d'erreur
   *                   example: Product not found
   *       500:
   *         description: Erreur serveur
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   description: Le message d'erreur
   */
  router.delete('/:id', auth, productController.deleteProduct)

  return router
}
