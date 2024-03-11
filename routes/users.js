module.exports = db => {
  const express = require('express')
  const router = express.Router()
  const userController = require('../controllers/userController')(db)

  /**
   * @openapi
   * /users:
   *   get:
   *     tags:
   *       - Users
   *     summary: Liste tous les utilisateurs
   *     description: Retourne la liste des utilisateurs
   *     responses:
   *       200:
   *         description: La liste des utilisateurs au format JSON
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   _id:
   *                     type: string
   *                     description: L'identifiant de l'utilisateur
   *                   email:
   *                     type: string
   *                     description: L'adresse e-mail de l'utilisateur
   *                   role:
   *                     type: string
   *                     description: Le rôle de l'utilisateur
   *                   bakeryName:
   *                     type: string
   *                     description: Le nom de la boulangerie de l'utilisateur
   *             examples:
   *               userList:
   *                 summary: Exemple de liste d'utilisateurs
   *                 value: [
   *                   {
   *                     "_id": "65cf462667ad658ed0e392c3",
   *                     "email": "admin@test.tld",
   *                     "role": "ROLE_ADMIN",
   *                     "bakeryName": ""
   *                   },
   *                   {
   *                     "_id": "54bf662436trd658er3e342a",
   *                     "email": "user@test.tld",
   *                     "role": "ROLE_USER",
   *                     "bakeryName": "Ma Boulangerie Test"
   *                   }
   *                 ]
   */
  router.get('/', userController.getAllUsers)

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
   *                 role:
   *                     type: string
   *                     description: Le rôle de l'utilisateur
   *                     example: ROLE_USER
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
