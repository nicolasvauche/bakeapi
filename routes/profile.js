module.exports = db => {
  const express = require('express')
  const router = express.Router()
  const profileController = require('../controllers/profileController')(db)
  const auth = require('../middlewares/auth')
  const sanitize = require('../middlewares/sanitize')

  /**
   * @openapi
   * /profile:
   *   get:
   *     security:
   *       - BearerAuth: []
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
   * /profile:
   *   put:
   *     security:
   *       - BearerAuth: []
   *     tags:
   *       - Profile
   *     summary: Met à jour un utilisateur connecté
   *     description: Met à jour les informations d'un utilisateur connecté dans la base de données.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID de l'utilisateur à mettre à jour
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 description: L'adresse e-mail de l'utilisateur
   *                 example: test@test.com
   *               password:
   *                 type: string
   *                 description: Le mot de passe de l'utilisateur
   *                 example: XXXXXXXX
   *               bakeryName:
   *                 type: string
   *                 description: Le nom de la boulangerie de l'utilisateur
   *                 example: Ma Boulangerie Test
   *     responses:
   *       200:
   *         description: Utilisateur mis à jour avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: string
   *                   description: L'identifiant de l'utilisateur
   *                   example: 65cf462667ad658ed0e392c3
   *                 email:
   *                   type: string
   *                   description: L'adresse e-mail de l'utilisateur
   *                   example: test@test.com
   *                 bakeryName:
   *                   type: string
   *                   description: Le nom de la boulangerie de l'utilisateur
   *                   example: Ma Boulangerie Test
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
  router.put('/', auth, sanitize, profileController.editProfile)

  /**
   * @openapi
   * /profile:
   *   delete:
   *     security:
   *       - BearerAuth: []
   *     tags:
   *       - Profile
   *     summary: Supprime un utilisateur connecté par son ID
   *     description: Supprime un utilisateur connecté par son ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID de l'utilisateur à supprimer
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Utilisateur {id} supprimé avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: Le message de succès après suppression
   *                   example: User {id} was successfully deleted
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
  router.delete('/:id', auth, profileController.deleteProfile)

  /**
   * @openapi
   * /profile/products:
   *   get:
   *     security:
   *       - BearerAuth: []
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
