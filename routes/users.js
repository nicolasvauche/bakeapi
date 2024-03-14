module.exports = db => {
  const express = require('express')
  const router = express.Router()
  const userController = require('../controllers/userController')(db)
  const auth = require('../middlewares/auth')
  const admin = require('../middlewares/admin')
  const sanitize = require('../middlewares/sanitize')
  const validateFields = require('../middlewares/validate')

  /**
   * @openapi
   * /users:
   *   get:
   *     security:
   *       - BearerAuth: []
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
  router.get('/', auth, admin, userController.getAllUsers)

  /**
   * @openapi
   * /users/{id}:
   *   get:
   *     security:
   *       - BearerAuth: []
   *     tags:
   *       - Users
   *     summary: Détails d'un utilisateur
   *     description: Retourne les détails d'un utilisateur
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID de l'utilisateur à rechercher
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Les détails d'un utilisateur au format JSON
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
   *       404:
   *         description: Utilisateur non trouvé
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   description: Le message d'erreur
   *                   example: User not found
   */
  router.get('/:id', auth, admin, userController.getUser)

  /**
   * @openapi
   * /users:
   *   post:
   *     security:
   *       - BearerAuth: []
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
  router.post(
    '/',
    auth,
    admin,
    sanitize,
    validateFields,
    userController.addUser
  )

  /**
   * @openapi
   * /users/{id}:
   *   put:
   *     security:
   *       - BearerAuth: []
   *     tags:
   *       - Users
   *     summary: Met à jour un utilisateur existant par son ID
   *     description: Met à jour les informations d'un utilisateur existant dans la base de données.
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
   *       404:
   *         description: Utilisateur non trouvé
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   description: Le message d'erreur
   *                   example: User not found
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
  router.put(
    '/:id',
    auth,
    admin,
    sanitize,
    validateFields,
    userController.editUser
  )

  /**
   * @openapi
   * /users/{id}:
   *   delete:
   *     security:
   *       - BearerAuth: []
   *     tags:
   *       - Users
   *     summary: Supprime un utilisateur par son ID
   *     description: Supprime un utilisateur par son ID
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
   *       404:
   *         description: Utilisateur non trouvé
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   description: Le message d'erreur
   *                   example: User not found
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
  router.delete('/:id', auth, admin, userController.deleteUser)

  return router
}
