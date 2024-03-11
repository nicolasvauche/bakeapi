module.exports = db => {
  const express = require('express')
  const router = express.Router()
  const userController = require('../controllers/userController')(db)

  /**
   * @openapi
   * /users:
   *   post:
   *     tags:
   *       - Users
   *     summary: Ajoute un nouvel utilisateur
   *     description: Ajoute un nouvel utilisateur
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
   *                 example: test@test.tld
   *               password:
   *                 type: string
   *                 description: Le lot de passe de l'utilisateur
   *                 example: XXXXXXXX
   *               bakeryName:
   *                 type: string
   *                 description: Le nom de la boulangerie
   *                 example: Ma Boulangerie
   *     responses:
   *       201:
   *         description: Utilisateur ajouté avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: string
   *                   description: L'identifiant du produit
   *                   example: 65cf462667ad658ed0e392c3
   *                 email:
   *                   type: string
   *                   description: L'adresse e-mail de l'utilisateur
   *                   example: test@test.tld
   *                 password:
   *                   type: string
   *                   description: Le lot de passe de l'utilisateur
   *                   example: XXXXXXXX
   *                 bakeryName:
   *                   type: string
   *                   description: Le nom de la boulangerie
   *                   example: Ma Boulangerie
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
  router.post('/', userController.addUser)

  return router
}
