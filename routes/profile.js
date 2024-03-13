module.exports = db => {
  const express = require('express')
  const router = express.Router()
  const profileController = require('../controllers/profileController')(db)
  const auth = require('../middlewares/auth')

  /**
   * @openapi
   * /profile:
   *   get:
   *     tags:
   *       - Profile
   *     summary: Détails de l'utilisateur connecté
   *     description: Retourne les détails de l'utilisateur connecté
   *     responses:
   *       200:
   *         description: Les détails de l'utilisateur au format JSON
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: string
   *                   description: L'identifiant de l'utilisateur
   *                 email:
   *                   type: string
   *                   description: L'adresse e-mail de l'utilisateur
   *                 role:
   *                   type: string
   *                   description: Le rôle de l'utilisateur
   *                 bakeryName:
   *                   type: string
   *                   description: Le nom de la boulangerie de l'utilisateur
   *       401:
   *         description: Token absent
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   description: Le message d'erreur
   *                   example: Unauthorized access
   *       403:
   *         description: Token invalide
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   description: Le message d'erreur
   *                   example: Forbidden access
   */
  router.get('/', auth, profileController.getProfile)

  /**
   * @openapi
   * /profile/products:
   *   get:
   *     tags:
   *       - Profile
   *     summary: Liste tous les produits de l'utilisateur connecté
   *     description: Retourne la liste des produits de l'utilisateur connecté
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
   *                     example: 65cf462667ad658ed0e392c3
   *                   name:
   *                     type: string
   *                     description: Le nom du produit
   *                     example: Baguette rustique
   *                   price:
   *                     type: number
   *                     description: Le prix du produit
   *                     example: 1.92
   *                   status:
   *                     type: string
   *                     description: Le statut du produit
   *                     example: En vente
   */
  router.get('/products', auth, profileController.getProducts)

  return router
}
